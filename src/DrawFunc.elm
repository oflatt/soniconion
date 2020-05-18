module DrawFunc exposing (drawFuncWithConnections)
import Model exposing (..)
import ViewPositions exposing (BlockPositions, BlockPosition, ViewStructure)
import LineRouting exposing (CallLineRoute)
import ViewVariables
import SvgDraw
import Update exposing (nodeInputId, nodeOutputId)

import Browser

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)

import Dict exposing (Dict)
import Array exposing (Array)
import Maybe exposing (andThen)


import Svg exposing (..)
import Svg.Attributes exposing (..)
import Svg.Events


import Html.Events exposing (onInput)

import Debug exposing (log)

-- function for draw call objects

drawCall: Call -> Int ->  ViewStructure -> (Svg Msg)
drawCall call counter viewStructure =
    SvgDraw.drawBuiltIn call counter viewStructure

getInputRouting : Call -> Int -> ViewStructure -> Maybe Int
getInputRouting call inputCounter viewStructure =
    Maybe.withDefault Nothing
        ((Dict.get call.id viewStructure.lineRouting)
        |> andThen (Array.get inputCounter))
        
drawOutputLine : Call -> BlockPosition -> Int -> ViewStructure -> Svg.Attribute Msg -> Bool -> Id -> (Svg Msg)
drawOutputLine call blockPos inputCounter viewStructure inputEvent isLineHighlighted outputId =
    Maybe.withDefault (SvgDraw.errorSvgNode "Can't find line output")
        (Maybe.map2
             (\otherBlockPos routing ->
                  SvgDraw.drawConnector call blockPos inputCounter otherBlockPos inputEvent isLineHighlighted routing viewStructure)
             (Dict.get outputId viewStructure.blockPositions)
             (getInputRouting call inputCounter viewStructure))    


drawInput : Call -> Input -> BlockPosition -> Int -> ViewStructure  -> Svg.Svg Msg
drawInput call input blockPos inputCounter viewStructure =
    let nodeEvents = SvgDraw.nodeEvents call viewStructure inputCounter
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
                      blockPos.xpos
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
                        [(drawOutputLine call blockPos inputCounter viewStructure outputEvent isLineHighlighted id)
                        ,(nodeWithEvent ())]
            Text str ->
                (SvgDraw.drawTextInput
                     call
                     str
                     nodeEvents
                     blockPos.xpos
                     nodePosition
                     (blockPos.ypos + ViewVariables.nodeRadius)
                     inputCounter
                     inputStringId)
            Hole -> (nodeWithEvent ())
                    
                        
drawInputLines call inputs blockPos inputCounter viewStructure =
    case inputs of
        [] -> [SvgDraw.drawBlockNameInput call viewStructure blockPos
              ,SvgDraw.nodeEvent 0 (0, 0) 0 (OutputHighlight call.id) (nodeOutputId call.id)]
        (input::rest) ->
            (drawInput call input blockPos inputCounter viewStructure) ::
                (drawInputLines call rest blockPos (inputCounter + 1) viewStructure)


drawCallInputs: Call -> ViewStructure -> MouseState -> (Svg Msg)
drawCallInputs call viewStructure mouseState =
    case Dict.get call.id viewStructure.blockPositions of
        Just blockPos ->
            Svg.g
                []
                (drawInputLines
                     call
                     call.inputs
                     blockPos
                     0
                     viewStructure)
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
                     blockPos.xpos
                     (((blockPos.width//2)-ViewVariables.nodeRadius), ViewVariables.nodeRadius*2)
                     (ViewVariables.outputNodeY + blockPos.ypos)
                     (SvgDraw.svgClickEvents (OutputClick call.id) (OutputRightClick call.id))
                     isOutputHighlighted)
        Nothing ->
            SvgDraw.errorSvgNode "Call without a block position when drawing endings"
                
-- there should be one line routing list per frame
drawFuncInputs func viewStructure mouseState=
    case func of
        [] -> []
        (call::calls) ->
            (drawCallInputs call viewStructure mouseState)
            :: (drawFuncInputs calls viewStructure mouseState)

drawFuncEndings func blockPositions mouseState =
    case func of
        [] -> []
        (call::calls) ->
            (drawCallEnding call blockPositions mouseState) :: (drawFuncEndings calls blockPositions mouseState)

drawFuncCalls : List Call -> ViewStructure -> Int -> List (Svg Msg)
drawFuncCalls func viewStructure counter =
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter viewStructure) :: (drawFuncCalls calls viewStructure (counter + 1))  
                
-- function for drawing function records
drawFunc: Function -> ViewStructure -> Int -> List (Svg Msg)
drawFunc func viewStructure counter =
  drawFuncCalls func.calls viewStructure counter


                     
drawFuncWithConnections: ViewStructure -> MouseState -> Svg Msg
drawFuncWithConnections viewStructure mouseState =
    Svg.g
        [SvgDraw.svgTranslate viewStructure.funcxoffset viewStructure.funcyoffset]
        [Svg.g [] (drawFunc viewStructure.sortedFunc viewStructure 0)
        ,Svg.g [] (drawFuncInputs viewStructure.sortedFunc.calls viewStructure mouseState)
        ,Svg.g [] (drawFuncEndings viewStructure.sortedFunc.calls viewStructure.blockPositions mouseState)]
