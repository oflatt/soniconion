port module Update exposing (update)

import ViewVariables
import ViewPositions
import Model exposing (..)
import OnionToJson exposing (onionToJson)
import Debug exposing (log)

import Url
import Url.Builder
import Browser
import Browser.Events
import Browser.Dom
import Browser.Navigation as Nav
import Json.Encode as Encode

import Dict exposing (Dict)


port testprint : Int -> Cmd msg

port runSound : Encode.Value -> Cmd msg

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
--mouse_scale_x mouse_x = (mouse_x // 5) 

mouse_scale_y : Int -> Int
mouse_scale_y mouse_y = (round ((toFloat mouse_y) * 1.65))
--mouse_scale_y mouse_y = (mouse_y // 5)


inputClickModel : Model -> Id -> Int -> (Model, Cmd Msg)
inputClickModel model id index =
    let oldMouse = model.mouseState
        newMouse =
            {oldMouse | mouseSelection = (InputSelected id index)}
    in
        ({model |
              mouseState = newMouse}
        ,Cmd.none)

outputClickModel : Model -> Id -> (Model, Cmd Msg)
outputClickModel model id =
    let oldMouse = model.mouseState
        newMouse =
            {oldMouse | mouseSelection = (OutputSelected id)}
    in
        ({model |
              mouseState = newMouse}
        ,Cmd.none)

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
                        placeBlockAtPos func blockId blockPos blockPositions call

    
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


modelMouseRelease model =
    case model.mouseState.mouseSelection of
        NoneSelected -> (model, Cmd.none)
        BlockSelected id ->
            modelBlockDropped model id
                            
        InputSelected id index -> (model, Cmd.none)
        OutputSelected id -> (model, Cmd.none)
        

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
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

        OutputClick id ->
            outputClickModel model id
                
        PlaySound ->
            (model
            ,runSound (onionToJson model.program))
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
                 testprint (2))
        MouseLeave pageName -> if pageName == model.highlightedButton
                               then ({model | highlightedButton = "none"}, Cmd.none)
                               else (model, Cmd.none)
        


