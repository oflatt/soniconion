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

getOutputPos : Id -> ViewStructure -> Int -> Maybe (Int, Int)
getOutputPos outputId viewStructure outputIndex =
    if outputId == viewStructure.id
    then
        Maybe.map
            (\inputPos ->
                 ((Tuple.first inputPos)+((Tuple.second inputPos)//2)
                 ,(ViewVariables.functionHeaderHeight - ViewVariables.nodeRadius)))
            (Dict.get outputIndex viewStructure.headerPos.inputPositions)
    else
        Maybe.map
            (\otherPos ->
                 ((otherPos.xpos + (otherPos.width//2))
                 ,otherPos.ypos + ViewVariables.outputNodeY))
            (Dict.get outputId viewStructure.blockPositions)
        
-- outputIndex is used for the function header
drawOutputLine : Call -> BlockPosition -> Int -> ViewStructure -> List (Svg.Attribute Msg) -> Bool -> Id -> Int -> (Svg Msg)
drawOutputLine call blockPos inputCounter viewStructure events isLineHighlighted outputId outputIndex =
    Maybe.withDefault (SvgDraw.errorSvgNode "Can't find line output")
        (Maybe.map2
             (\otherBlockPos routing ->
                  SvgDraw.drawConnector call blockPos inputCounter otherBlockPos events isLineHighlighted routing viewStructure)
             (getOutputPos outputId viewStructure outputIndex)
             (getInputRouting call inputCounter viewStructure))    

drawHeaderOutput : Input -> ViewStructure -> Int -> Svg.Svg Msg
drawHeaderOutput input viewStructure inputCounter =
    let blockPos = viewStructure.headerPos
        nodePos =
            (case (Dict.get inputCounter blockPos.inputPositions) of
                 Just nodeP -> nodeP
                 Nothing -> (-100, -100)) -- something went wrong
        domId = (Update.headerNodeId viewStructure.id inputCounter)
        events = SvgDraw.headerEvents inputCounter viewStructure
        isInputHighlighted =
            case viewStructure.mouseState.mouseSelection of
                FunctionOutputSelected sid sindex -> sid == viewStructure.id && sindex == inputCounter
                _ -> False
    in
        case input of
            Text str -> (SvgDraw.svgTextInput
                             str (Tuple.first nodePos)
                             (ViewVariables.functionHeaderHeight-ViewVariables.inputHeight)
                             (Tuple.second nodePos) ViewVariables.inputHeight
                             (HeaderOutputHighlight viewStructure.id inputCounter)
                             (HeaderOutputUpdate viewStructure.id inputCounter)
                             ViewVariables.textInputColorVariable
                             events
                             domId)
            _ -> (SvgDraw.drawNodeWithEvent
                      0 nodePos (ViewVariables.functionHeaderHeight - ViewVariables.nodeRadius)
                      events (HeaderOutputHighlight viewStructure.id inputCounter) domId isInputHighlighted)
                         
            
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
                    outputEvents =
                        (SvgDraw.svgClickEvents (OutputClick id) NoOp)
                in
                    Svg.node "g" []
                        [(drawOutputLine call blockPos inputCounter viewStructure outputEvents isLineHighlighted id 0)
                        ,(nodeWithEvent ())]
            FunctionArg index ->
                let isLineHighlighted =
                        (case viewStructure.mouseState.mouseSelection of
                             InputSelected inputId inputIndex ->
                                 (inputId == call.id) && (inputCounter == inputIndex)
                             FunctionOutputSelected sid sindex ->
                                 (sid == viewStructure.id && sindex == index)
                             _ -> False)
                    outputEvents = SvgDraw.svgClickEvents (HeaderOutputClick viewStructure.id index) NoOp
                in
                    Svg.node "g" []
                        [(drawOutputLine call blockPos inputCounter viewStructure outputEvents isLineHighlighted viewStructure.id index)
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
            Hole -> (nodeWithEvent ()) -- TODO this should be hole case
 
                        
drawInputLines call inputs blockPos inputCounter viewStructure =
    case inputs of
        [] -> [SvgDraw.drawBlockNameInput call viewStructure blockPos
              ,SvgDraw.nodeEvent 0 (0, 0) 0 (OutputHighlight call.id) (nodeOutputId call.id)]
        (input::rest) ->
            (drawInput call input blockPos inputCounter viewStructure) ::
                (drawInputLines call rest blockPos (inputCounter + 1) viewStructure)

drawHeaderOutputs funcArgs viewStructure inputCounter =
    case funcArgs of
        [] -> []
        (input::rest) ->
            (drawHeaderOutput input viewStructure inputCounter) ::
                (drawHeaderOutputs rest viewStructure (inputCounter+1))
                    

drawCallInputs: Call -> ViewStructure -> (Svg Msg)
drawCallInputs call viewStructure =
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


                
drawCallEnding call viewStructure =
    case Dict.get call.id viewStructure.blockPositions of
        Just blockPos ->
            let isOutputHighlighted =
                    case viewStructure.mouseState.mouseSelection of
                        OutputSelected outputId -> (outputId == call.id)
                        _ -> False
                events =
                    if viewStructure.isToolbar
                    then (SvgDraw.svgClickEvents (SpawnBlock call.functionName) (SpawnBlock call.functionName))
                    else (SvgDraw.svgClickEvents (OutputClick call.id) (OutputRightClick call.id))
                        
            in
                (SvgDraw.drawNode
                     blockPos.xpos
                     (((blockPos.width//2)-ViewVariables.nodeRadius), ViewVariables.nodeRadius*2)
                     (ViewVariables.outputNodeY + blockPos.ypos)
                     events
                     isOutputHighlighted)
        Nothing ->
            SvgDraw.errorSvgNode "Call without a block position when drawing endings"

drawAllInputs func viewStructure =
    case func of
        [] -> []
        (call::calls) ->
            (drawCallInputs call viewStructure)
            :: (drawAllInputs calls viewStructure)
    
                
-- there should be one line routing list per frame
drawFuncInputs : Function -> ViewStructure -> (List (Svg Msg))
drawFuncInputs func viewStructure =
    (drawHeaderOutputs func.args viewStructure 0) ++ (drawAllInputs func.calls viewStructure)
        
drawFuncEndings func viewStructure =
    case func of
        [] -> []
        (call::calls) ->
            (drawCallEnding call viewStructure) :: (drawFuncEndings calls viewStructure)

drawFuncCalls : List Call -> ViewStructure -> Int -> List (Svg Msg)
drawFuncCalls func viewStructure counter =
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter viewStructure) :: (drawFuncCalls calls viewStructure (counter + 1))  

drawFuncHeader func viewStructure =
    SvgDraw.drawFuncHeader func viewStructure
                     
-- function for drawing function records
drawFunc: Function -> ViewStructure -> Int -> List (Svg Msg)
drawFunc func viewStructure counter =
  (drawFuncHeader func viewStructure) :: (drawFuncCalls func.calls viewStructure counter)


                     
drawFuncWithConnections: ViewStructure -> MouseState -> Svg Msg
drawFuncWithConnections viewStructure mouseState =
    Svg.g
        [SvgDraw.svgTranslate viewStructure.headerPos.xpos viewStructure.headerPos.ypos]
        [Svg.g [] (drawFunc viewStructure.sortedFunc viewStructure 0)
        ,Svg.g [] (drawFuncInputs viewStructure.sortedFunc viewStructure)
        ,Svg.g [] (drawFuncEndings viewStructure.sortedFunc.calls viewStructure)]
