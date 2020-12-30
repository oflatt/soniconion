module DrawFunc exposing (drawFuncWithConnections)
import Model exposing (..)
import ModelHelpers exposing (isStandInInfinite)
import ViewStructure exposing (BlockPositions, BlockPosition, ViewStructure, InputPosition)
import ViewVariables
import SvgDraw exposing (blockMouseOffset, drawCall)


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

drawBlock block counter viewStructure =
    case block of
       CallBlock call -> drawCall call counter viewStructure
       StaffBlock staff -> drawCall (Call staff.id [] "placeholder" staff.outputText) counter viewStructure

getInputRouting : Block -> Int -> ViewStructure -> Maybe Int
getInputRouting block inputCounter viewStructure =
    Maybe.withDefault Nothing
        ((Dict.get (getId block) viewStructure.lineRouting)
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
drawOutputLine : Block -> BlockPosition -> Int -> ViewStructure -> List (Svg.Attribute Msg) -> Bool -> Id -> Int
               -> Maybe (Svg Msg)
drawOutputLine block blockPos inputCounter viewStructure events isLineHighlighted outputId outputIndex =
    (Maybe.map2
         (\otherBlockPos routing ->
              SvgDraw.drawConnector block blockPos inputCounter otherBlockPos events
              isLineHighlighted routing viewStructure (funcLineYOffset viewStructure outputIndex))
         (getOutputPos outputId viewStructure outputIndex)
         (getInputRouting block inputCounter viewStructure))


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
                         

inputHighlightedP viewStructure block inputCounter =
    case viewStructure.mouseState.mouseSelection of
        InputSelected inputId inputIndex ->
            (inputId == (getId block)) && (inputCounter == inputIndex)
        _ -> False
                 
drawInput : Block -> Input -> BlockPosition -> Int -> ViewStructure  -> Svg.Svg Msg
drawInput block input blockPos inputCounter viewStructure =
    let nodeEvents = SvgDraw.nodeEvents block viewStructure inputCounter
        highlightEvent = (InputHighlight (getId block) inputCounter)
        inputStringId = nodeInputId (getId block) inputCounter
        isInputHighlighted = inputHighlightedP viewStructure block inputCounter
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
                                (inputId == (getId block)) && (inputCounter == inputIndex)
                            OutputSelected outputId -> (outputId == id)
                            _ -> False
                    outputEvents =
                        (SvgDraw.svgClickEvents (OutputClick id) NoOp)
                in
                    Svg.node "g" []
                        (case (drawOutputLine block blockPos inputCounter viewStructure
                                   outputEvents isLineHighlighted id 0) of
                             Just line -> [line, (nodeWithEvent False)]
                             Nothing -> [(nodeWithEvent False)])
            FunctionArg index ->
                let isLineHighlighted =
                        (case viewStructure.mouseState.mouseSelection of
                             InputSelected inputId inputIndex ->
                                 (inputId == (getId block)) && (inputCounter == inputIndex)
                             FunctionOutputSelected sid sindex ->
                                 (sid == viewStructure.id && sindex == index)
                             _ -> False)
                    outputEvents = SvgDraw.svgClickEvents (HeaderOutputClick viewStructure.id index) NoOp
                in
                    Svg.node "g" []
                        (case (drawOutputLine block blockPos inputCounter viewStructure
                                   outputEvents isLineHighlighted viewStructure.id index) of
                             Just line -> [line, (nodeWithEvent False)]
                             Nothing -> [(nodeWithEvent False)])
            Text str ->
                (SvgDraw.drawTextInput
                     block
                     str
                     nodeEvents
                     blockPos.xpos
                     nodePosition
                     (blockPos.ypos + ViewVariables.nodeRadius)
                     inputCounter
                     inputStringId
                     viewStructure)
            Hole ->
                if isStandInInfinite block input inputCounter
                then (nodeWithEvent True)
                else (nodeWithEvent False)
 
                        
drawInputLines block inputs blockPos inputCounter viewStructure =
    case inputs of
        [] -> [SvgDraw.drawBlockNameInput block viewStructure blockPos
              ,SvgDraw.nodeEvent blockPos.xpos (0, 0) (blockPos.ypos+ViewVariables.outputNodeY)
                  (OutputHighlight (getId block)) (nodeOutputId (getId block)) viewStructure True]
        (input::rest) ->
            (drawInput block input blockPos inputCounter viewStructure) ::
                (drawInputLines block rest blockPos (inputCounter + 1) viewStructure)

drawHeaderOutputs funcArgs viewStructure inputCounter =
    case funcArgs of
        [] -> [drawHeaderFinalOutput viewStructure inputCounter]
        (input::rest) ->
            (drawHeaderOutput input viewStructure inputCounter) ::
                (drawHeaderOutputs rest viewStructure (inputCounter+1))
                    

drawBlockInputs: Block -> ViewStructure -> (Svg Msg)
drawBlockInputs block viewStructure =
    case Dict.get (getId block) viewStructure.blockPositions of
        Just blockPos ->
            Svg.g
                []
                (drawInputLines
                     block
                     (getInputs block)
                     blockPos
                     0
                     viewStructure)
        Nothing ->
            SvgDraw.errorSvgNode "Block without a block position"


                
drawBlockEnding block viewStructure =
    case Dict.get (getId block) viewStructure.blockPositions of
        Just blockPos ->
            let isOutputHighlighted =
                    case viewStructure.mouseState.mouseSelection of
                        OutputSelected outputId -> (outputId == (getId block))
                        _ -> False
                events =
                    if viewStructure.isToolbar
                    then (SvgDraw.svgClickEvents (SpawnBlock block (blockMouseOffset block viewStructure))
                              (SpawnBlock block (blockMouseOffset block viewStructure)))
                    else (SvgDraw.svgClickEvents (OutputClick (getId block)) (OutputRightClick (getId block)))
                        
            in
                (SvgDraw.drawNode
                     blockPos.xpos
                     (((blockPos.width//2)-ViewVariables.nodeRadius), ViewVariables.nodeRadius*2)
                     (ViewVariables.outputNodeY + blockPos.ypos)
                     events
                     isOutputHighlighted
                     False)
        Nothing ->
            SvgDraw.errorSvgNode "Block without a block position when drawing endings"

drawAllInputs func viewStructure =
    case func of
        [] -> []
        (block::blocks) ->
            let blockToDraw =
                    (case viewStructure.mouseState.mouseSelection of
                         BlockSelected funcId movedBlock _ ->
                             (if funcId /= viewStructure.id && (getId movedBlock) == (getId block) then
                                  let newInputs = List.map (\_ -> Hole) (getInputs block)
                                  in
                                      (setInputs block newInputs)
                              else
                                  block)
                         _ -> block)
            in
                (drawBlockInputs blockToDraw viewStructure) :: (drawAllInputs blocks viewStructure)
    
                
-- there should be one line routing list per frame
drawFuncInputs : Function -> ViewStructure -> (List (Svg Msg))
drawFuncInputs func viewStructure =
    (SvgDraw.drawHeaderNameInput func viewStructure) ::
        ((drawHeaderOutputs func.args viewStructure 0) ++ (drawAllInputs func.blocks viewStructure))
        
drawFuncEndings func viewStructure =
    case func of
        [] -> []
        (block::blocks) ->
            (drawBlockEnding block viewStructure) :: (drawFuncEndings blocks viewStructure)

drawFuncBlocks : List Block -> ViewStructure -> Int -> List (Svg Msg)
drawFuncBlocks func viewStructure counter =
  case func of
    [] -> []
    (block::blocks) -> (drawBlock block counter viewStructure) :: (drawFuncBlocks blocks viewStructure (counter + 1))  

drawFuncHeader func viewStructure =
    SvgDraw.drawFuncHeader func viewStructure
                     
-- function for drawing function records
drawFunc: Function -> ViewStructure -> Int -> List (Svg Msg)
drawFunc func viewStructure counter =
  (drawFuncHeader func viewStructure) :: (drawFuncBlocks func.blocks viewStructure counter)


                     
drawFuncWithConnections: ViewStructure -> Svg Msg
drawFuncWithConnections viewStructure =
    Svg.g
        [SvgDraw.svgTranslate viewStructure.headerPos.xpos viewStructure.headerPos.ypos]
        [Svg.g [] (drawFunc viewStructure.sortedFunc viewStructure 0)
        ,Svg.g [] (drawFuncInputs viewStructure.sortedFunc viewStructure)
        ,Svg.g [] (drawFuncEndings viewStructure.sortedFunc.blocks viewStructure)]
