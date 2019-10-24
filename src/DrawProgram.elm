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

drawCall: Call -> Int ->  BlockPositions -> (Svg Msg)
drawCall call counter blockPositions =
    SvgDraw.drawBuiltIn call counter blockPositions

drawOutputLine id blockPos inputCounter blockPositions inputEvent isLineHighlighted isOutputHighlighted =
    case Dict.get id blockPositions of
        Nothing -> SvgDraw.errorSvgNode "Can't find line output"
        Just otherBlockPos ->
            Svg.g
                []
                [(SvgDraw.drawNode
                      (ViewVariables.outputNodeX + (Tuple.first otherBlockPos))
                      (ViewVariables.outputNodeY + (Tuple.second otherBlockPos))
                      (Svg.Events.onMouseDown (OutputClick id))
                      isOutputHighlighted)
                ,SvgDraw.drawConnector blockPos inputCounter otherBlockPos inputEvent isLineHighlighted]

                
drawInput input blockPos inputCounter blockPositions blockId mouseState =
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
                    isOutputHighlighted =
                        case mouseState.mouseSelection of
                            OutputSelected outputId -> (outputId == id)
                            _ -> False
                in
                    Svg.node "g" []
                        [(drawOutputLine id blockPos inputCounter blockPositions outputEvent isLineHighlighted isOutputHighlighted)
                        ,(SvgDraw.drawNode
                              ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                              ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                              inputEvent
                              isInputHighlighted)]
            Const c -> SvgDraw.drawConst
                       c
                       ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                       ((Tuple.second blockPos) + ViewVariables.nodeRadius)
            Hole -> SvgDraw.drawNode
                    ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                    ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                    inputEvent
                    isInputHighlighted
                       
drawInputLines inputs blockPos inputCounter blockPositions id mouseState base =
    case inputs of
        [] -> [base]
        (input::rest) -> (drawInput input blockPos inputCounter blockPositions id mouseState) :: (drawInputLines rest blockPos (inputCounter + 1) blockPositions id mouseState base)


drawCallInputs: Call -> BlockPositions -> MouseState -> (Svg Msg)
drawCallInputs call blockPositions mouseState =
    let isOutputHighlighted =
            case mouseState.mouseSelection of
                OutputSelected id -> id == call.id
                _ -> False
    in
        case Dict.get call.id blockPositions of
            Just blockPos ->
                Svg.g
                    []
                    (drawInputLines
                         call.inputs
                         blockPos
                         0
                         blockPositions
                         call.id
                         mouseState
                         (SvgDraw.drawNode
                              (ViewVariables.outputNodeX + (Tuple.first blockPos))
                              (ViewVariables.outputNodeY + (Tuple.second blockPos))
                              (Svg.Events.onMouseDown (OutputClick call.id))
                          isOutputHighlighted))
            Nothing ->
                SvgDraw.errorSvgNode "Call without a block position"


drawFuncInputs func blockPositions mouseState =
    case func of
        [] -> []
        (call::calls) ->  (drawCallInputs call blockPositions mouseState)
                          :: (drawFuncInputs calls blockPositions mouseState)

-- function for drawing function records
drawFunc: Function -> Int ->  BlockPositions -> MouseState -> List (Svg Msg)
drawFunc func counter blockPositions mouseState =
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter blockPositions) :: (drawFunc calls (counter + 1) blockPositions mouseState)

drawFuncWithConnections: Function ->  BlockPositions -> MouseState -> Svg Msg
drawFuncWithConnections func blockPositions mouseState =
    Svg.g
        []
        [Svg.g [] (drawFunc func 0 blockPositions mouseState)
        ,Svg.g [] (drawFuncInputs func blockPositions mouseState)]

-- function for drawing the onion
drawOnion: Onion -> MouseState -> Int -> Int -> List (Svg Msg)
drawOnion onion mouseState svgWindowWidth svgWindowHeight = 
  case onion of
    [] -> []
    (func::funcs) ->
        let blockPositions = ViewPositions.getBlockPositions func mouseState svgWindowWidth svgWindowHeight
        in
            (drawFuncWithConnections func
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
