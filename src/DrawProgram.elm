module DrawProgram exposing (drawProgram)
import Model exposing (..)
import ViewPositions exposing (BlockPositions, CallLineRoute, BlockPos, ViewStructure)
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

drawOutputLine : Id -> BlockPos -> Int -> BlockPositions -> Svg.Attribute Msg -> Bool -> Bool -> Maybe Int -> (Svg Msg)
drawOutputLine id blockPos inputCounter blockPositions inputEvent isLineHighlighted isOutputHighlighted routing =
    case Dict.get id blockPositions of
        Nothing -> SvgDraw.errorSvgNode "Can't find line output"
        Just otherBlockPos ->
            Svg.g
                []
                [(SvgDraw.drawNode
                      (ViewVariables.outputNodeX + (Tuple.first otherBlockPos))
                      (ViewVariables.outputNodeY + (Tuple.second otherBlockPos))
                      (Svg.Events.onMouseDown (OutputClick id))
                      isOutputHighlighted
                      id
                      inputCounter)
                ,SvgDraw.drawConnector blockPos inputCounter otherBlockPos inputEvent isLineHighlighted routing]

                
drawInput input blockPos inputCounter blockPositions blockId mouseState routing =
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
                        [(drawOutputLine id blockPos inputCounter blockPositions outputEvent isLineHighlighted isOutputHighlighted routing)
                        ,(SvgDraw.drawNode
                              ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                              ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                              inputEvent
                              isInputHighlighted
                              blockId
                              inputCounter)]
            Text str ->
                (SvgDraw.drawTextInput
                     str
                     ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                     ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                     blockId
                     inputCounter)
            Hole -> SvgDraw.drawNode
                    ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                    ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                    inputEvent
                    isInputHighlighted
                    blockId
                    inputCounter

                        
drawInputLines inputs blockPos inputCounter blockPositions id mouseState lineRouting =
    case inputs of
        [] -> []
        (input::rest) ->
            case lineRouting of
                [] -> [SvgDraw.errorSvgNode "not enough routings for call"]
                (routing::restRouting) ->
                    (drawInput input blockPos inputCounter blockPositions id mouseState routing) ::
                        (drawInputLines rest blockPos (inputCounter + 1) blockPositions id mouseState restRouting)


drawCallInputs: Call -> BlockPositions -> MouseState -> CallLineRoute -> (Svg Msg)
drawCallInputs call blockPositions mouseState routingList =
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
                         routingList)
            Nothing ->
                SvgDraw.errorSvgNode "Call without a block position"

-- there should be one line routing list per frame
drawFuncInputs func blockPositions mouseState lineRouting=
    case func of
        [] -> []
        (call::calls) ->
            case lineRouting of
                [] -> [SvgDraw.errorSvgNode "lineRouting not big enough"]
                (routing::restRouting) ->
                    (drawCallInputs call blockPositions mouseState routing)
                    :: (drawFuncInputs calls blockPositions mouseState restRouting)

-- function for drawing function records
drawFunc: Function -> Int ->  BlockPositions -> MouseState -> List (Svg Msg)
drawFunc func counter blockPositions mouseState =
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter blockPositions) :: (drawFunc calls (counter + 1) blockPositions mouseState)

drawFuncWithConnections: ViewStructure -> MouseState -> Svg Msg
drawFuncWithConnections viewStructure mouseState =
    Svg.g
        []
        [Svg.g [] (drawFunc viewStructure.sortedFunc 0 viewStructure.blockPositions mouseState)
        ,Svg.g [] (drawFuncInputs viewStructure.sortedFunc viewStructure.blockPositions mouseState viewStructure.lineRouting)]

-- function for drawing the onion
drawOnion: Onion -> MouseState -> Int -> Int -> List (Svg Msg)
drawOnion onion mouseState svgWindowWidth svgWindowHeight = 
  case onion of
    [] -> []
    (func::funcs) ->
        let viewStructure = ViewPositions.getViewStructure func mouseState svgWindowWidth svgWindowHeight
        in
            (drawFuncWithConnections
                 viewStructure
                 mouseState) ::
            (drawOnion funcs mouseState svgWindowWidth svgWindowHeight)


                     
drawProgram : Onion -> MouseState -> Int -> Int -> Html Msg
drawProgram program mouseState svgWindowWidth svgWindowHeight =
    let elementHeight = svgWindowHeight * 2 -- TODO detect how big to make it
        viewportHeight = (ViewPositions.getViewportHeight svgWindowWidth elementHeight)
    in
        fromUnstyled
        (Svg.svg
             [ Svg.Attributes.width(String.fromInt svgWindowWidth) -- define the width of the svg
             , Svg.Attributes.height(String.fromInt elementHeight) -- define the height of the svg
             , Svg.Attributes.viewBox("0 0 " ++ (ViewPositions.createViewboxDimensions ViewVariables.viewportWidth viewportHeight)) -- define the viewbox
             , display "inline-block"
             ]
             (drawOnion program mouseState svgWindowWidth svgWindowHeight))
