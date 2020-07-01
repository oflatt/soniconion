module DrawFunc exposing (drawFuncWithConnections)
import Model exposing (..)
import ModelHelpers exposing (isStandInInfinite)
import ViewStructure exposing (BlockPositions, BlockPosition, ViewStructure, InputPosition)
import LineRouting exposing (CallLineRoute)
import ViewVariables
import SvgDraw exposing (blockMouseOffset)


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

funcLineYOffset viewStructure outputIndex =
    1 + (ViewStructure.countOutputsBefore viewStructure.sortedFunc.args outputIndex)
                
-- outputIndex is used for the function header
drawOutputLine : Call -> BlockPosition -> Int -> ViewStructure -> List (Svg.Attribute Msg) -> Bool -> Id -> Int
               -> Maybe (Svg Msg)
drawOutputLine call blockPos inputCounter viewStructure events isLineHighlighted outputId outputIndex =
    (Maybe.map2
         (\otherBlockPos routing ->
              SvgDraw.drawConnector call blockPos inputCounter otherBlockPos events
              isLineHighlighted routing viewStructure (funcLineYOffset viewStructure outputIndex))
         (getOutputPos outputId viewStructure outputIndex)
         (getInputRouting call inputCounter viewStructure))


drawHeaderFinalOutput viewStructure inputCounter =
    let blockPos = viewStructure.headerPos
        nodePos =
            (case (Dict.get inputCounter blockPos.inputPositions) of
                 Just nodeP -> nodeP
                 Nothing -> (-100, -100)) -- something went wrong
        domId = (headerNodeId viewStructure.id inputCounter)
        events = SvgDraw.headerEventsFinal inputCounter viewStructure
        isInputHighlighted = False
    in
        (SvgDraw.drawNodeWithEvent 0 nodePos (ViewVariables.functionHeaderHeight - ViewVariables.nodeRadius)
             events (HeaderAddOutput viewStructure.id inputCounter) domId isInputHighlighted viewStructure True)
        
drawHeaderOutput : Input -> ViewStructure -> Int -> Svg.Svg Msg
drawHeaderOutput input viewStructure inputCounter =
    let blockPos = viewStructure.headerPos
        nodePos =
            (case (Dict.get inputCounter blockPos.inputPositions) of
                 Just nodeP -> nodeP
                 Nothing -> (-100, -100)) -- something went wrong
        domId = (headerNodeId viewStructure.id inputCounter)
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
                             domId
                             viewStructure)
            _ -> (SvgDraw.drawNodeWithEvent
                      0 nodePos (ViewVariables.functionHeaderHeight - ViewVariables.nodeRadius)
                      events (HeaderOutputHighlight viewStructure.id inputCounter) domId isInputHighlighted
                      viewStructure False)
                         

inputHighlightedP viewStructure call inputCounter =
    case viewStructure.mouseState.mouseSelection of
        InputSelected inputId inputIndex ->
            (inputId == call.id) && (inputCounter == inputIndex)
        _ -> False
                 
drawInput : Call -> Input -> BlockPosition -> Int -> ViewStructure  -> Svg.Svg Msg
drawInput call input blockPos inputCounter viewStructure =
    let nodeEvents = SvgDraw.nodeEvents call viewStructure inputCounter
        highlightEvent = (InputHighlight call.id inputCounter)
        inputStringId = nodeInputId call.id inputCounter
        isInputHighlighted = inputHighlightedP viewStructure call inputCounter
        nodePosition: InputPosition
        nodePosition = Maybe.withDefault (0, 0) (Dict.get inputCounter blockPos.inputPositions)
        nodeWithEvent =
            (\isHollow ->
                 (SvgDraw.drawNodeWithEvent
                      blockPos.xpos
                      nodePosition
                      (blockPos.ypos + ViewVariables.nodeRadius)
                      nodeEvents
                      highlightEvent
                      inputStringId
                      isInputHighlighted
                      viewStructure
                      isHollow))
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
                        (case (drawOutputLine call blockPos inputCounter viewStructure
                                   outputEvents isLineHighlighted id 0) of
                             Just line -> [line, (nodeWithEvent False)]
                             Nothing -> [(nodeWithEvent False)])
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
                        (case (drawOutputLine call blockPos inputCounter viewStructure
                                   outputEvents isLineHighlighted viewStructure.id index) of
                             Just line -> [line, (nodeWithEvent False)]
                             Nothing -> [(nodeWithEvent False)])
            Text str ->
                (SvgDraw.drawTextInput
                     call
                     str
                     nodeEvents
                     blockPos.xpos
                     nodePosition
                     (blockPos.ypos + ViewVariables.nodeRadius)
                     inputCounter
                     inputStringId
                     viewStructure)
            Hole ->
                if isStandInInfinite call input inputCounter
                then (nodeWithEvent True)
                else (nodeWithEvent False)
 
                        
drawInputLines call inputs blockPos inputCounter viewStructure =
    case inputs of
        [] -> [SvgDraw.drawBlockNameInput call viewStructure blockPos
              ,SvgDraw.nodeEvent blockPos.xpos (0, 0) (blockPos.ypos+ViewVariables.outputNodeY)
                  (OutputHighlight call.id) (nodeOutputId call.id) viewStructure True]
        (input::rest) ->
            (drawInput call input blockPos inputCounter viewStructure) ::
                (drawInputLines call rest blockPos (inputCounter + 1) viewStructure)

drawHeaderOutputs funcArgs viewStructure inputCounter =
    case funcArgs of
        [] -> [drawHeaderFinalOutput viewStructure inputCounter]
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
                    then (SvgDraw.svgClickEvents (SpawnBlock call.functionName (blockMouseOffset call viewStructure))
                              (SpawnBlock call.functionName (blockMouseOffset call viewStructure)))
                    else (SvgDraw.svgClickEvents (OutputClick call.id) (OutputRightClick call.id))
                        
            in
                (SvgDraw.drawNode
                     blockPos.xpos
                     (((blockPos.width//2)-ViewVariables.nodeRadius), ViewVariables.nodeRadius*2)
                     (ViewVariables.outputNodeY + blockPos.ypos)
                     events
                     isOutputHighlighted
                     False)
        Nothing ->
            SvgDraw.errorSvgNode "Call without a block position when drawing endings"

drawAllInputs func viewStructure =
    case func of
        [] -> []
        (call::calls) ->
            let callToDraw =
                    (case viewStructure.mouseState.mouseSelection of
                         BlockSelected funcId movedCall _ ->
                             (if funcId /= viewStructure.id && movedCall.id == call.id then
                                  let newInputs = List.map (\_ -> Hole) call.inputs
                                  in
                                      {call | inputs=newInputs}
                              else
                                  call)
                         _ -> call)
            in
                (drawCallInputs callToDraw viewStructure) :: (drawAllInputs calls viewStructure)
    
                
-- there should be one line routing list per frame
drawFuncInputs : Function -> ViewStructure -> (List (Svg Msg))
drawFuncInputs func viewStructure =
    (SvgDraw.drawHeaderNameInput func viewStructure) ::
        ((drawHeaderOutputs func.args viewStructure 0) ++ (drawAllInputs func.calls viewStructure))
        
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


                     
drawFuncWithConnections: ViewStructure -> Svg Msg
drawFuncWithConnections viewStructure =
    Svg.g
        [SvgDraw.svgTranslate viewStructure.headerPos.xpos viewStructure.headerPos.ypos]
        [Svg.g [] (drawFunc viewStructure.sortedFunc viewStructure 0)
        ,Svg.g [] (drawFuncInputs viewStructure.sortedFunc viewStructure)
        ,Svg.g [] (drawFuncEndings viewStructure.sortedFunc.calls viewStructure)]
