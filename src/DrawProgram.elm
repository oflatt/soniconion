module DrawProgram exposing (drawProgram)
import Model exposing (..)
import ViewPositions exposing (BlockPositions, CallLineRoute, BlockPos, ViewStructure)
import ViewVariables
import SvgDraw
import Update exposing (nodeInputId, nodeOutputId)

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

drawOutputLine : Id -> BlockPos -> Int -> BlockPositions -> Svg.Attribute Msg -> Bool -> Maybe Int -> (Svg Msg)
drawOutputLine id blockPos inputCounter blockPositions inputEvent isLineHighlighted routing =
    case Dict.get id blockPositions of
        Nothing -> SvgDraw.errorSvgNode "Can't find line output"
        Just otherBlockPos ->
            SvgDraw.drawConnector blockPos inputCounter otherBlockPos inputEvent isLineHighlighted routing

                
drawInput input blockPos inputCounter blockPositions blockId mouseState routing =
    let inputEvent = (InputClick blockId inputCounter)
        highlightEvent = (InputHighlight blockId inputCounter)
        inputStringId = nodeInputId blockId inputCounter
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
                        [(drawOutputLine id blockPos inputCounter blockPositions outputEvent isLineHighlighted routing)
                        ,(SvgDraw.drawNodeWithEvent
                              ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                              ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                              inputEvent
                              highlightEvent
                              inputStringId
                              isInputHighlighted)]
            Text str ->
                (SvgDraw.drawTextInput
                     str
                     ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                     ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                     blockId
                     inputCounter)
            Hole -> SvgDraw.drawNodeWithEvent
                    ((Tuple.first blockPos) + ViewVariables.indexToNodeX inputCounter)
                    ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                    inputEvent
                    highlightEvent
                    inputStringId
                    isInputHighlighted
                    
                        
drawInputLines inputs blockPos inputCounter blockPositions id mouseState lineRouting =
    case inputs of
        [] -> [SvgDraw.nodeEvent 0 0 (OutputHighlight id) (nodeOutputId id)]
        (input::rest) ->
            case lineRouting of
                [] -> [SvgDraw.errorSvgNode "not enough routings for call"]
                (routing::restRouting) ->
                    (drawInput input blockPos inputCounter blockPositions id mouseState routing) ::
                        (drawInputLines rest blockPos (inputCounter + 1) blockPositions id mouseState restRouting)


drawCallInputs: Call -> BlockPositions -> MouseState -> CallLineRoute -> (Svg Msg)
drawCallInputs call blockPositions mouseState routingList =
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
                            
drawCallEnding call blockPositions mouseState =
    case Dict.get call.id blockPositions of
        Just blockPos ->
            let isOutputHighlighted =
                    case mouseState.mouseSelection of
                        OutputSelected outputId -> (outputId == call.id)
                        _ -> False
            in
                (SvgDraw.drawNode
                     (ViewVariables.outputNodeX + (Tuple.first blockPos))
                     (ViewVariables.outputNodeY + (Tuple.second blockPos))
                     (OutputClick call.id)
                     isOutputHighlighted)
        Nothing ->
            SvgDraw.errorSvgNode "Call without a block position when drawing endings"
                
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

drawFuncEndings func blockPositions mouseState =
    case func of
        [] -> []
        (call::calls) ->
            (drawCallEnding call blockPositions mouseState) :: (drawFuncEndings calls blockPositions mouseState)
                        
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
        ,Svg.g [] (drawFuncInputs viewStructure.sortedFunc viewStructure.blockPositions mouseState viewStructure.lineRouting)
        ,Svg.g [] (drawFuncEndings viewStructure.sortedFunc viewStructure.blockPositions mouseState)]

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
