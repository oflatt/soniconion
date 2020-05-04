port module Update exposing (update, nodeInputId, nodeOutputId)
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

import Model exposing (..)
import Compiler.Compile exposing (compileOnion)
import ModelHelpers exposing (updateInput, fixInvalidInputs, idToPosition)


-- just need a port for javascript
port evalJavascript : String -> Cmd msg

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
    (String.fromInt callid) ++ "-" ++ (String.fromInt inputindex)
nodeOutputId callid =
    "o" ++ (String.fromInt callid)
        
mouse_scale_x : Int -> Int
mouse_scale_x mouse_x = (round ((toFloat mouse_x) * 1.65))


mouse_scale_y : Int -> Int
mouse_scale_y mouse_y = (round ((toFloat mouse_y) * 1.65))

inputClickModel : Model -> Id -> Int -> (Model, Cmd Msg)
inputClickModel model id index =
    let oldMouse = model.mouseState
    in
        case oldMouse.mouseSelection of
            OutputSelected outputId -> (updateInput model id index (\input -> (Output outputId)), Cmd.none)
            _ ->
                let
                    newMouse =
                        {oldMouse | mouseSelection = (InputSelected id index)}
                in
                    ({model |
                          mouseState = newMouse}
                    ,Cmd.none)

focusInputCommand id index =
    (Dom.focus (nodeInputId id index) |> Task.attempt SilentDomError)


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
            ,focusInputCommand id index)
            
            
outputClickModel : Model -> Id -> (Model, Cmd Msg)
outputClickModel model id =
    let oldMouse = model.mouseState
    in
        case oldMouse.mouseSelection of
            InputSelected inputId index -> (updateInput model inputId index (\i -> (Output id)), Cmd.none)
            _ ->
                let
                    newMouse =
                        {oldMouse | mouseSelection = (OutputSelected id)}
                in
                    ({model |
                          mouseState = newMouse}
                    ,Cmd.none)

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
        "" -> (updateInput model id index (\i -> Hole), focusInputCommand id index)
        _  -> (updateInput model id index (\i -> (Text str)), Cmd.none)
    

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
                        if (Tuple.second blockPos) < (Tuple.second currentBlockPos)
                        then
                            call :: (finishBlockAtPos func blockId)
                        else
                            currentCall :: (placeBlockAtPos calls blockId blockPos blockPositions call)
                                
funcBlockDropped func blockId oldMouse windowWidth windowHeight =
    let blockPositions =
            (ViewPositions.getBlockPositions func oldMouse
                 (ViewVariables.programWidth windowWidth)
                 (ViewVariables.programHeight windowHeight))
    in
        case Dict.get blockId blockPositions of
            Nothing -> log "No block in funcBlockDropped" func
            Just blockPos ->
                case getCallById blockId func of
                    Nothing -> log "No block in func in funcBlockDropped" func
                    Just call ->
                        fixInvalidInputs (placeBlockAtPos func blockId blockPos blockPositions call)

    
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
              ,program = programBlockDropped model.program id oldMouse model.windowWidth model.windowHeight}
        ,Cmd.none)

modelWithError : Model -> String -> Model
modelWithError model errorString =
    {model |
         errorBoxMaybe = Just (ErrorBox errorString)}
        
modelMouseRelease model =
    case model.mouseState.mouseSelection of
        NoneSelected -> (model, Cmd.none)
        BlockSelected id ->
            modelBlockDropped model id
                            
        InputSelected id index -> (model, Cmd.none)
        OutputSelected id -> (model, Cmd.none)

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
                focusInputCommand id index)
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
                
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        SilentDomError dom_error->
            log "domerror"
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
        


