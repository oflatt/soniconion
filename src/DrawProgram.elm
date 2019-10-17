module DrawProgram exposing (drawProgram)
import Model exposing (..)
import ViewPositions exposing (BlockPositions)
import ViewVariables
import SvgDraw


import Browser

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)

import Dict exposing (Dict)
import Array exposing (Array)


import Svg exposing (..)
import Svg.Attributes exposing (..)
import Svg.Events


import Html.Events exposing (onInput)

import Debug exposing (log)

-- function for draw call objects

drawCall: Call -> Int -> Dict Id Int -> BlockPositions -> MouseState -> (Svg Msg)
drawCall call counter idToPos blockPositions mouseState =
    let isOutputHighlighted =
            case mouseState.mouseSelection of
                OutputSelected id -> (id == call.id)
                _ -> False
    in
        SvgDraw.drawBuiltIn call counter idToPos blockPositions isOutputHighlighted

      
idToPosition func dict pos =
    case func of
        [] -> dict
        (e::es) -> idToPosition es
                   (Dict.insert e.id pos dict)
                   (pos + 1)

drawOutputLine id blockPos inputCounter idToPos blockPositions inputEvent isLineHighlighted=
    case Dict.get id idToPos of
        Nothing -> SvgDraw.errorSvgNode
        Just otherBlockIndex ->
            case Array.get otherBlockIndex blockPositions of
                Nothing -> SvgDraw.errorSvgNode
                Just otherBlockPos ->
                    SvgDraw.drawConnector blockPos inputCounter otherBlockPos inputEvent isLineHighlighted
                       
drawInput input blockPos inputCounter idToPos blockPositions blockId mouseState =
    let inputEvent = (Svg.Events.onMouseDown (InputClick blockId inputCounter))
        isInputHighlighted =
            case mouseState.mouseSelection of
                InputSelected inputId inputIndex ->
                    (inputId == blockId) && (inputCounter == inputIndex)
                _ -> False
    in
        case input of
            Output id ->
                let isLineHighlighted =
                        case mouseState.mouseSelection of
                            InputSelected inputId inputIndex ->
                                (inputId == blockId) && (inputCounter == inputIndex)
                            OutputSelected outputId -> (outputId == id)
                            _ -> False
                    outputEvent =
                        (Svg.Events.onMouseDown (OutputClick id))
                in
                    Svg.node "g" []
                        [drawOutputLine id blockPos inputCounter idToPos blockPositions inputEvent isLineHighlighted
                        ,(SvgDraw.drawNode
                              ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                              (Tuple.second blockPos)
                              outputEvent
                              isInputHighlighted)]
            Const c -> SvgDraw.errorSvgNode
            Hole -> SvgDraw.drawNode
                    ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                    (Tuple.second blockPos)
                    inputEvent
                    isInputHighlighted
                       
drawInputLines inputs blockPos inputCounter idToPos blockPositions id mouseState =
    case inputs of
        [] -> []
        (input::rest) -> (drawInput input blockPos inputCounter idToPos blockPositions id mouseState) :: (drawInputLines rest blockPos (inputCounter + 1) idToPos blockPositions id mouseState)

    
drawCallLines call counter idToPos blockPositions mouseState =
    case Array.get counter blockPositions of
        Just blockPos ->
            drawInputLines call.inputs blockPos 0 idToPos blockPositions call.id mouseState
        Nothing ->
            [SvgDraw.errorSvgNode]

                       
drawFuncInputs func counter idToPos blockPositions mouseState =
    case func of
        [] -> []
        (call::calls) -> (drawCallLines call counter idToPos blockPositions mouseState) ++ (drawFuncInputs calls (counter+1) idToPos blockPositions mouseState)

-- function for drawing function records
drawFunc: Function -> Int -> Dict Id Int -> BlockPositions -> MouseState -> List (Svg Msg)
drawFunc func counter idToPos blockPositions mouseState =
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter idToPos blockPositions mouseState) :: (drawFunc calls (counter + 1) idToPos blockPositions mouseState)

drawFuncWithConnections: Function -> Dict Id Int -> BlockPositions -> MouseState -> Svg Msg
drawFuncWithConnections func idToPos blockPositions mouseState =
    Svg.g
        []
        [Svg.g [] (drawFuncInputs func 0 idToPos blockPositions mouseState)
        ,Svg.g [] (drawFunc func 0 idToPos blockPositions mouseState)]

-- function for drawing the onion
drawOnion: Onion -> MouseState -> Int -> Int -> List (Svg Msg)
drawOnion onion mouseState svgWindowWidth svgWindowHeight = 
  case onion of
    [] -> []
    (func::funcs) ->
        let blockPositions = ViewPositions.getBlockPositions func mouseState svgWindowWidth svgWindowHeight
        in
            (drawFuncWithConnections func
                 (idToPosition func Dict.empty 0)
                 blockPositions
                 mouseState) ::
            (drawOnion funcs mouseState svgWindowWidth svgWindowHeight)


                     
drawProgram : Onion -> MouseState -> Int -> Int -> Html Msg
drawProgram program mouseState svgWindowWidth svgWindowHeight =
    let viewportHeight = (ViewPositions.getViewportHeight svgWindowWidth svgWindowHeight)
    in
        fromUnstyled
        (Svg.svg
             [ Svg.Attributes.width(String.fromInt svgWindowWidth) -- define the width of the svg
             , Svg.Attributes.height(String.fromInt svgWindowHeight) -- define the height of the svg
             , Svg.Attributes.viewBox("0 0 " ++ (ViewPositions.createViewboxDimensions ViewVariables.viewportWidth viewportHeight)) -- define the viewbox
             , display "inline-block"
             ]
             (drawOnion program mouseState svgWindowWidth svgWindowHeight))
