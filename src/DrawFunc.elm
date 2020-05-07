module DrawFunc exposing (drawFuncWithConnections)
import Model exposing (..)
import ViewPositions exposing (BlockPositions, CallLineRoute, BlockPosition, ViewStructure)
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

drawCall: Call -> Int ->  ViewStructure -> (Svg Msg)
drawCall call counter viewStructure =
    SvgDraw.drawBuiltIn call counter viewStructure

drawOutputLine : Call -> BlockPosition -> Int -> ViewStructure -> Svg.Attribute Msg -> Bool -> Maybe Int -> Id -> (Svg Msg)
drawOutputLine call blockPos inputCounter viewStructure inputEvent isLineHighlighted routing outputId =
    case Dict.get outputId viewStructure.blockPositions of
        Nothing -> SvgDraw.errorSvgNode "Can't find line output"
        Just otherBlockPos ->
            SvgDraw.drawConnector call blockPos inputCounter otherBlockPos inputEvent isLineHighlighted routing


drawInput : Call -> Input -> BlockPosition -> Int -> ViewStructure -> Maybe Int -> Svg.Svg Msg
drawInput call input blockPos inputCounter viewStructure routing =
    let nodeEvents =
            if viewStructure.isToolbar
            then
                []
            else
                [(SvgDraw.svgLeftClick (InputClick call.id inputCounter))
                ,(SvgDraw.svgRightClick (InputRightClick call.id inputCounter))]
        highlightEvent = (InputHighlight call.id inputCounter)
        inputStringId = nodeInputId call.id inputCounter
        isInputHighlighted =
            case viewStructure.mouseState.mouseSelection of
                InputSelected inputId inputIndex ->
                    (inputId == call.id) && (inputCounter == inputIndex)
                _ -> False
        nodePosition: ViewPositions.InputPosition
        nodePosition =
            case (Dict.get inputCounter blockPos.inputPositions) of
                Just nodePos -> nodePos
                Nothing -> (-100, -100) -- something went wrong
        nodeWithEvent =
            (\_ ->
                 (SvgDraw.drawNodeWithEvent
                      nodePosition
                      (blockPos.ypos + ViewVariables.nodeRadius)
                      nodeEvents
                      highlightEvent
                      inputStringId
                      isInputHighlighted))
    in
        case input of
            Output id ->
                let isLineHighlighted =
                        case viewStructure.mouseState.mouseSelection of
                            InputSelected inputId inputIndex ->
                                (inputId == call.id) && (inputCounter == inputIndex)
                            OutputSelected outputId -> (outputId == id)
                            _ -> False
                    outputEvent =
                        (Svg.Events.onMouseDown (OutputClick id))
                in
                    Svg.node "g" []
                        [(drawOutputLine call blockPos inputCounter viewStructure outputEvent isLineHighlighted routing id)
                        ,(nodeWithEvent ())]
            Text str ->
                (SvgDraw.drawTextInput
                     call
                     str
                     nodeEvents
                     nodePosition
                     (blockPos.ypos + ViewVariables.nodeRadius)
                     inputCounter
                     inputStringId)
            Hole -> (nodeWithEvent ())
                    
                        
drawInputLines call inputs blockPos inputCounter viewStructure lineRouting =
    case inputs of
        [] -> [SvgDraw.nodeEvent (0, 0) 0 (OutputHighlight call.id) (nodeOutputId call.id)]
        (input::rest) ->
            case lineRouting of
                [] -> [SvgDraw.errorSvgNode "not enough routings for call"]
                (routing::restRouting) ->
                    (drawInput call input blockPos inputCounter viewStructure routing) ::
                        (drawInputLines call rest blockPos (inputCounter + 1) viewStructure restRouting)


drawCallInputs: Call -> ViewStructure -> MouseState -> CallLineRoute -> (Svg Msg)
drawCallInputs call viewStructure mouseState routingList =
    case Dict.get call.id viewStructure.blockPositions of
        Just blockPos ->
            Svg.g
                []
                (drawInputLines
                     call
                     call.inputs
                     blockPos
                     0
                     viewStructure
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
                     ((ViewVariables.outputNodeX + blockPos.xpos-ViewVariables.nodeRadius), ViewVariables.nodeRadius*2)
                     (ViewVariables.outputNodeY + blockPos.ypos)
                     [(SvgDraw.svgLeftClick (OutputClick call.id))
                     ,(SvgDraw.svgRightClick (OutputRightClick call.id))]
                     isOutputHighlighted)
        Nothing ->
            SvgDraw.errorSvgNode "Call without a block position when drawing endings"
                
-- there should be one line routing list per frame
drawFuncInputs func viewStructure mouseState lineRouting =
    case func of
        [] -> []
        (call::calls) ->
            case lineRouting of
                [] -> [SvgDraw.errorSvgNode "lineRouting not big enough"]
                (routing::restRouting) ->
                    (drawCallInputs call viewStructure mouseState routing)
                    :: (drawFuncInputs calls viewStructure mouseState restRouting)

drawFuncEndings func blockPositions mouseState =
    case func of
        [] -> []
        (call::calls) ->
            (drawCallEnding call blockPositions mouseState) :: (drawFuncEndings calls blockPositions mouseState)
                        
-- function for drawing function records
drawFunc: Function -> ViewStructure -> Int -> List (Svg Msg)
drawFunc func viewStructure counter =
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter viewStructure) :: (drawFunc calls viewStructure (counter + 1))

drawFuncWithConnections: ViewStructure -> MouseState -> Svg Msg
drawFuncWithConnections viewStructure mouseState =
    Svg.g
        [SvgDraw.svgTranslate viewStructure.funcxoffset viewStructure.funcyoffset]
        [Svg.g [] (drawFunc viewStructure.sortedFunc viewStructure 0)
        ,Svg.g [] (drawFuncInputs viewStructure.sortedFunc viewStructure mouseState viewStructure.lineRouting)
        ,Svg.g [] (drawFuncEndings viewStructure.sortedFunc viewStructure.blockPositions mouseState)]
