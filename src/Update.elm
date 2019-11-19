port module Update exposing (update, fixInvalidInputs)
import Debug exposing (log)

import Url
import Url.Builder
import Browser
import Browser.Events
import Browser.Dom
import Browser.Navigation as Nav
import Dict exposing (Dict)


import ViewVariables
import ViewPositions
import Model exposing (..)
import Compiler.Compile exposing (compileOnion)


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

mouse_scale_x : Int -> Int
mouse_scale_x mouse_x = (round ((toFloat mouse_x) * 1.65))


mouse_scale_y : Int -> Int
mouse_scale_y mouse_y = (round ((toFloat mouse_y) * 1.65))

setInputInputs : List Input -> Int -> Input -> List Input
setInputInputs inputs index input =
    case inputs of
        [] -> [input]
        (thisinput::rest) ->
            if index == 0
            then input :: rest
            else
                thisinput :: setInputInputs rest (index - 1) input

setInputCall call id index input =
    if id == call.id
    then
        {call | inputs = setInputInputs call.inputs index input}
    else
        call
                        
setInputFunc func id index input =
    case func of
        [] -> []
        (call::calls) -> setInputCall call id index input :: setInputFunc calls id index input

setInputOnion : Onion -> Id -> Int -> Input -> Onion
setInputOnion onion id index input =
    case onion of
        [] -> []
        (func::funcs) -> fixInvalidInputs (setInputFunc func id index input) :: setInputOnion funcs id index input
    
                        
setInput : Model -> Id -> Int -> Input  -> (Model, Cmd Msg)
setInput model id index input =
    let oldMouse = model.mouseState
        newMouse =
            {oldMouse | mouseSelection = NoneSelected}
        newOnion = setInputOnion model.program id index input
    in
        ({model |
              mouseState = newMouse
              ,program = newOnion}
        ,Cmd.none)

inputClickModel : Model -> Id -> Int -> (Model, Cmd Msg)
inputClickModel model id index =
    let oldMouse = model.mouseState
    in
        case oldMouse.mouseSelection of
            OutputSelected outputId -> setInput model id index (Output outputId)
            _ ->
                let
                    newMouse =
                        {oldMouse | mouseSelection = (InputSelected id index)}
                in
                    ({model |
                          mouseState = newMouse}
                    ,Cmd.none)

outputClickModel : Model -> Id -> (Model, Cmd Msg)
outputClickModel model id =
    let oldMouse = model.mouseState
    in
        case oldMouse.mouseSelection of
            InputSelected inputId index -> setInput model inputId index (Output id)
            _ ->
                let
                    newMouse =
                        {oldMouse | mouseSelection = (OutputSelected id)}
                in
                    ({model |
                          mouseState = newMouse}
                    ,Cmd.none)

inputUpdateModel model id index str =
    setInput model id index (Text str)

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

idToPosition func dict pos =
    case func of
        [] -> dict
        (e::es) -> idToPosition es
                   (Dict.insert e.id pos dict)
                   (pos + 1)

fixInputs inputs idToPos currentIndex =
    case inputs of
        [] -> []
        (input::rest) ->
            case input of
                Output id ->
                    case Dict.get id idToPos of
                        Nothing -> (Hole) :: fixInputs rest idToPos currentIndex
                        Just index ->
                            if index >= currentIndex
                            then (Hole) :: fixInputs rest idToPos currentIndex
                            else input :: fixInputs rest idToPos currentIndex
                _ -> input :: fixInputs rest idToPos currentIndex
                       
fixCallInputs call idToPos currentIndex =
    {call | inputs = fixInputs call.inputs idToPos currentIndex}
                       
fixInvalidInputsHelper func idToPos currentIndex =
    case func of
        [] -> []
        (call::calls) ->
            (fixCallInputs call idToPos currentIndex) :: fixInvalidInputsHelper calls idToPos (currentIndex + 1)
 
fixInvalidInputs func =
    let idToPos = idToPosition func Dict.empty 0
    in
        fixInvalidInputsHelper func idToPos 0
                                

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
                             
                             
update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
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
        BlockClick id ->
            log (String.fromInt id)
                (let oldMouse = model.mouseState
                     newMouse = {oldMouse |
                                     mouseSelection = (BlockSelected id)}
                 in
                     ({model |
                           mouseState = newMouse}
                     ,Cmd.none))
        InputClick id index ->
            log (String.fromInt id)
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
        


