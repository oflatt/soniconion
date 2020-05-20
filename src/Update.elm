port module Update exposing (update, nodeInputId, nodeOutputId, scrollChange, nodeNameId, headerNodeId)
import Debug exposing (log)

import Task
import Maybe exposing (withDefault)
import Url
import Url.Builder
import Browser
import Browser.Events
import Browser.Dom
import Browser.Navigation as Nav
import Dict exposing (Dict)
import Keyboard.Event exposing (KeyboardEvent, decodeKeyboardEvent)

import Browser.Dom as Dom
import ViewVariables
import ViewPositions

import Json.Decode as Decode
import Model exposing (..)
import BuiltIn exposing (constructCall)
import Compiler.Compile exposing (compileOnion)
import ModelHelpers exposing (updateInput, fixInvalidInputs, idToPosition, updateInputOn
                             ,updateInputAtIndex, updateFunc)



port evalJavascript : String -> Cmd msg

                      
port scrollChange : (Decode.Value ->  msg) -> Sub msg
                      
                      

-- UPDATE

changeUrl : Model -> Url.Url -> PageName -> (Model, Cmd Msg)
changeUrl model newurl newPage =
    
    ( { model | currentPage = newPage
         ,url = newurl}
       , Nav.pushUrl model.urlkey (Url.toString newurl)
       )

changeByName model pageName =
    let newurl =
            case (Url.fromString
                      (String.append
                           model.indexurl
                           (Url.Builder.absolute
                                [pageName] []))) of
                Nothing ->
                    model.url
                Just url -> url

    in changeUrl model newurl pageName

nodeInputId callid inputindex =
    "i" ++ (String.fromInt callid) ++ "-" ++ (String.fromInt inputindex)
nodeOutputId callid =
    "o" ++ (String.fromInt callid)
nodeNameId callid =
    "n" ++ (String.fromInt callid)

headerNodeId functionid index =
    "h" ++ (String.fromInt functionid) ++ "-" ++ (String.fromInt index)
        
mouse_scale_x : Int -> Int
mouse_scale_x mouse_x = (round ((toFloat mouse_x) * 1.65))


mouse_scale_y : Int -> Int
mouse_scale_y mouse_y = (round ((toFloat mouse_y) * 1.65))

connectFuncArg model id index funcId argIndex =
    ((updateFunc
          (updateInputOn model id index (Just funcId)
               (\input -> (FunctionArg argIndex)))
          funcId
          (\func ->
               let newArgs = (updateInputAtIndex func.args argIndex (\input -> Output id))
               in
                   {func | args = newArgs}))
    ,Cmd.none)
                        
inputRightClickModel : Model -> Id -> Int -> (Model, Cmd Msg)
inputRightClickModel model id index =
    case model.mouseState.mouseSelection of
        OutputSelected outputId -> ((updateInput model id index (\input -> (Output outputId))), Cmd.none)
        FunctionOutputSelected funcId argIndex -> connectFuncArg model id index funcId argIndex
        _ -> (model, Cmd.none)
                        
inputClickModel : Model -> Id -> Int -> (Model, Cmd Msg)
inputClickModel model id index =
    inputHighlightModel model id index

headerOutputClickModel model id index =
    headerHighlightModel model id index
        
blockNameClickModel : Model -> Id -> (Model, Cmd Msg)
blockNameClickModel model id =
    blockNameHighlightModel model id

focusInputCommand domId =
    (Dom.focus domId |> Task.attempt SilentDomError)
        

headerHighlightModel : Model -> Id -> Int -> (Model, Cmd Msg)
headerHighlightModel model id index =
    let oldMouse = model.mouseState
    in
        let newMouse = {oldMouse | mouseSelection = FunctionOutputSelected id index}
        in
            ({model | mouseState = newMouse}
            ,focusInputCommand (headerNodeId id index))
        
inputHighlightModel : Model -> Id -> Int -> (Model, Cmd Msg)
inputHighlightModel model id index =
    let oldMouse = model.mouseState
    in
        let
            newMouse =
                {oldMouse | mouseSelection = (InputSelected id index)}
        in
            ({model |
                  mouseState = newMouse}
            ,focusInputCommand (nodeInputId id index))

blockNameHighlightModel : Model -> Id -> (Model, Cmd Msg)
blockNameHighlightModel model id =
    let oldMouse = model.mouseState
    in
        let
            newMouse =
                {oldMouse | mouseSelection = (NameSelected id)}
        in
            ({model |
                  mouseState = newMouse}
            ,focusInputCommand (nodeNameId id))
            
outputRightClickModel : Model -> Id -> (Model, Cmd Msg)
outputRightClickModel model id =
    let oldMouse = model.mouseState
    in
        case oldMouse.mouseSelection of
            InputSelected inputId index -> (updateInput model inputId index (\i -> (Output id)), Cmd.none)
            _ -> (model, Cmd.none)

            
outputClickModel : Model -> Id -> (Model, Cmd Msg)
outputClickModel model id =
    outputHighlightModel model id

outputHighlightModel : Model -> Id -> (Model, Cmd Msg)
outputHighlightModel model id =
    let oldMouse = model.mouseState
    in
        let
            newMouse =
                {oldMouse | mouseSelection = (OutputSelected id)}
        in
            ({model |
                  mouseState = newMouse}
            ,(Dom.focus (nodeOutputId id) |> Task.attempt SilentDomError))


            
inputUpdateModel model id index str =
    case str of
        "" -> (updateInput model id index (\i -> Hole), focusInputCommand (nodeInputId id index))
        _  -> (updateInput model id index (\i -> (Text str)), Cmd.none) 

blockNameUpdateModel model id str =
    ModelHelpers.updateCall model id (\call -> {call | functionName = str}) 
              
modelNoneSelected model =
    let oldMouse = model.mouseState
        newMouse =
            {oldMouse | mouseSelection = NoneSelected}
    in
        ({model |
              mouseState = newMouse}
        ,Cmd.none)

finishBlockAtPos func blockId =
    case func of
        [] -> []
        (currentCall::calls) ->
            if currentCall.id == blockId
            then
                calls
            else
                currentCall :: finishBlockAtPos calls blockId
        
placeBlockAtPos func blockId blockPos blockPositions call =
    case func of
        [] -> [call]
        (currentCall::calls) ->
            if currentCall.id == blockId
            then
                placeBlockAtPos calls blockId blockPos blockPositions call
            else
                case Dict.get currentCall.id blockPositions of
                    Nothing -> log "No block in placeBlockAtPos" func
                    Just currentBlockPos ->
                        if blockPos.ypos < currentBlockPos.ypos
                        then
                            call :: (finishBlockAtPos func blockId)
                        else
                            currentCall :: (placeBlockAtPos calls blockId blockPos blockPositions call)
                                
funcBlockDropped func blockId oldMouse windowWidth windowHeight =
    let viewStructure =
            (ViewPositions.getViewStructure func oldMouse
                 (ViewVariables.toSvgWindowWidth windowWidth)
                 (ViewVariables.toSvgWindowHeight windowHeight)
                 (ViewVariables.functionXSpacing + (ViewVariables.toolbarWidth
                                                        (ViewVariables.toSvgWindowWidth windowWidth)
                                                        (ViewVariables.toSvgWindowHeight windowHeight)))
                 0 False)
    in
        fixInvalidInputs viewStructure.sortedFunc

    
-- todo handle multiple functions
programBlockDropped : Onion -> Id -> MouseState -> Int -> Int -> Onion
programBlockDropped program blockId oldMouse windowWidth windowHeight=
    case program of
        [f] -> [funcBlockDropped f blockId oldMouse windowWidth windowHeight]
        _ -> program
        
        
modelBlockDropped model id =
    let oldMouse = model.mouseState
        newMouse =
            {oldMouse | mouseSelection = NoneSelected}
    in
        ({model |
              mouseState = newMouse
              ,program =
                  (programBlockDropped model.program id oldMouse
                       model.windowWidth model.windowHeight)}
        ,Cmd.none)

modelWithError : Model -> String -> Model
modelWithError model errorString =
    {model |
         errorBoxMaybe = Just (ErrorBox errorString)}
        
modelMouseRelease model =
    case model.mouseState.mouseSelection of
        BlockSelected id ->
            modelBlockDropped model id
        _ -> (model, Cmd.none)
                            
        

playSoundResult : Model -> (Model, Cmd Msg)
playSoundResult model =
    case (compileOnion model.program) of
        Err e ->
            ((modelWithError model e), Cmd.none)
        Ok s -> (model, (evalJavascript s))


updateWithChar: Char -> Input -> Input
updateWithChar char input =
    case input of
        Text str -> Text str
        _ -> Text (String.fromChar char)

                
keyboardUpdateInput: Model -> KeyboardEvent -> Id -> Int -> (Model, Cmd Msg)
keyboardUpdateInput model keyevent id index =
    case String.uncons (withDefault "" keyevent.key) of
        Just (char, "") ->
            if Char.isAlphaNum char
            then
                (updateInput model id index (updateWithChar char),
                     focusInputCommand (nodeInputId id index))
            else (model, Cmd.none)
        _ -> (model, Cmd.none)


-- this will handle typing into outputs
keyboardUpdateOutput model keyevent id =
    (model, Cmd.none)
                
                
keyboardUpdate : Model -> KeyboardEvent -> (Model, Cmd Msg)
keyboardUpdate model keyevent =
    case model.mouseState.mouseSelection of
        InputSelected id index -> keyboardUpdateInput model keyevent id index
        OutputSelected id -> keyboardUpdateOutput model keyevent id
        _ -> (model, Cmd.none)

spawnBlockFunc func call =
    {func | calls=(call::func.calls)}
             
spawnBlockProgram : Onion -> Call -> Onion
spawnBlockProgram onion call =
    case onion of
        [] -> [(makeMain 0 [call])]
        (func::funcs) -> (spawnBlockFunc func call) :: funcs

spawnBlockModel : Model -> String -> (Model, Cmd Msg)
spawnBlockModel model name =
    let oldMouse = model.mouseState
        newCall = constructCall model.idCounter name
        newMouse = {oldMouse | mouseSelection = (BlockSelected newCall.id)}
    in
        ({model |
              idCounter = newCall.id+1
              ,mouseState = newMouse
              ,program = spawnBlockProgram model.program newCall}
        ,Cmd.none)
                
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        NoOp -> (model, Cmd.none)
        SilentDomError dom_error->
            (model, Cmd.none)
        SetError errorString ->
            (modelWithError model errorString, Cmd.none)
        MouseRelease ->
            modelMouseRelease model
        MouseMoved pos ->
            let oldMouse = model.mouseState
                newMouse =
                    {oldMouse |
                         mouseX = pos.x,
                         mouseY = pos.y}
            in
                ({model |
                      mouseState = newMouse}
                , Cmd.none)
        ScrollChange pos ->
            let oldMouse = model.mouseState
                newMouse =
                    {oldMouse |
                         scrollX = pos.xpos,
                         scrollY = pos.ypos}
            in
                ({model |
                      mouseState = newMouse}
                ,Cmd.none)
            
        KeyboardInput keyevent ->
            keyboardUpdate model keyevent
        BlockClick id ->
            (let oldMouse = model.mouseState
                 newMouse = {oldMouse |
                                 mouseSelection = (BlockSelected id)}
             in
                 ({model |
                       mouseState = newMouse}
                 ,Cmd.none))

        HeaderOutputHighlight id index ->
            headerHighlightModel model id index

        HeaderOutputUpdate id index str ->
            (model, Cmd.none)

        HeaderOutputClick id index ->
            headerOutputClickModel model id index
                
        HeaderOutputRightClick id index ->
            (model, Cmd.none)
                
        InputHighlight id index ->
            (inputHighlightModel model id index)

        OutputHighlight id->
            outputHighlightModel model id
                    
        InputClick id index ->
            inputClickModel model id index

        InputUpdate id index str ->
            inputUpdateModel model id index str

        OutputClick id ->
            outputClickModel model id

        InputRightClick id index ->
            (inputRightClickModel model id index)

        OutputRightClick id ->
            (outputRightClickModel model id)

        BlockNameClick id ->
            blockNameClickModel model id

        BlockNameHighlight id ->
            blockNameHighlightModel model id

        BlockNameUpdate id str ->
            blockNameUpdateModel model id str
                
        SpawnBlock name ->
            spawnBlockModel model name
                
        PlaySound ->
            playSoundResult model
        WindowResize newWidth newHeight ->
            ({model |
                  windowWidth = newWidth,
                  windowHeight = newHeight},
                 Cmd.none)
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    (changeByName model (urlToPageName url))

                Browser.External href ->
                    ( model, Nav.load href )

        PageChange pageName ->
            let result = (changeByName model pageName)
            in result


        UrlChanged url ->
            ((Tuple.first (changeByName model (urlToPageName url))),
            Cmd.none)

        MouseOver pageName ->
            ({model | highlightedButton = pageName},
                 Cmd.none)
        MouseLeave pageName -> if pageName == model.highlightedButton
                               then ({model | highlightedButton = "none"}, Cmd.none)
                               else (model, Cmd.none)
        


