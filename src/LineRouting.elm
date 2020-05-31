module LineRouting exposing (CallLineRoute, LineRouting, getLineRouting, getOutputOrdering, OutputOrdering,
                                 InputInfo, getMaxLine, getMinLine)

import ModelHelpers exposing (IdToPos, idToPosition)
import Model exposing (Function, Call, Input(..), Id)
import Array exposing (Array)
import Dict exposing (Dict)
import Debug exposing (log)
import Maybe exposing (withDefault)

type alias CallLineRoute = Array (Maybe Int) -- the relative positions of the outside of the line to the middle in increments
type alias LineRouting = Dict Id CallLineRoute


-- this is an ordering of tuples representing inputs pointing to outputs
-- the order is from bottom to top of the function
-- ordered by which output they connect to
type alias InputInfo = {call: Call
                        ,index: Int
                        ,outputId: Id}
type alias OutputOrdering = List InputInfo

-- represents the maximum indentation attatched to this Id currently
type alias OutputBurden = Dict Id Int

updateCallLineRoute: InputInfo -> Int -> Maybe CallLineRoute -> Maybe CallLineRoute
updateCallLineRoute inputInfo thisRouting lineRoute =
    Just
    (Array.set inputInfo.index (Just thisRouting)
         (case lineRoute of
              Nothing -> Array.initialize (List.length inputInfo.call.inputs) (always Nothing)
              Just route -> route))

setLineRouting : LineRouting -> InputInfo -> Int -> Bool -> LineRouting
setLineRouting lineRouting inputInfo thisRouting isLeft =
    let correctRouting =
            if isLeft then (-thisRouting) else thisRouting
    in
        Dict.update inputInfo.call.id (updateCallLineRoute inputInfo correctRouting) lineRouting
    
updateOutputBurden burden otherBurden =
    case otherBurden of
        Just ob -> Just (max burden ob)
        Nothing -> Just (burden)

setOutputBurden : OutputBurden -> Id -> Int -> OutputBurden
setOutputBurden outputBurden id burden =
    Dict.update id (updateOutputBurden burden) outputBurden
    
getOutputBurden outputBurden id =
    case Dict.get id outputBurden of
        Nothing -> 0
        Just burden -> burden
                       
getCallOrderedInputs : Id -> Call -> OutputOrdering
getCallOrderedInputs funcId call =
    List.filterMap
        (\inputPair ->
             case (Tuple.first inputPair) of
                 Output outputId -> Just (InputInfo call (Tuple.second inputPair) outputId)
                 FunctionArg index -> Just (InputInfo call (Tuple.second inputPair) (-index-1)) -- use negative id to store burden
                 _ -> Nothing)
        (List.map2 Tuple.pair call.inputs (List.range 0 ((List.length call.inputs)-1)))

byOutput idToPos element =
    case Dict.get element.call.id idToPos of
        Just callPos ->
            (case Dict.get element.outputId idToPos of
                Just pos -> (-pos, -callPos)
                Nothing -> (99999+callPos, 0))-- positive position for function argument, doing -1 then -2 then -3...
        Nothing -> (1, 1) -- should not happen
            
getOutputOrdering : Function -> IdToPos -> OutputOrdering
getOutputOrdering func idToPos =
    List.sortBy (byOutput idToPos) (List.concatMap (getCallOrderedInputs func.id) func.calls)
        

findMaxBurden : Array Call -> OutputBurden -> Int -> Int -> Int
findMaxBurden fArray outputBurden currentIndex maxIndex =
    if currentIndex > maxIndex
    then 0
    else
        let callId =
                if currentIndex < 0 -- for function arguments
                then
                    currentIndex
                else
                    (Maybe.withDefault -100
                         (Maybe.map (\call -> call.id)
                              (Array.get currentIndex fArray)))
        in
            max (findMaxBurden fArray outputBurden (currentIndex+1) maxIndex)
                (Maybe.withDefault 0 (Dict.get callId outputBurden))
    

findThisRouting : InputInfo -> OutputBurden -> Array Call -> IdToPos -> Int
findThisRouting inputInfo outputBurden fArray idToPos =
    let cIndex = (case Dict.get inputInfo.call.id idToPos of
                      Just callIndex -> callIndex
                      Nothing -> 0)-- should never happen
        oIndex = (case Dict.get inputInfo.outputId idToPos of
                      Just outputIndex -> outputIndex
                      Nothing -> inputInfo.outputId)-- output is a function arg so the negative index stays
    in
        (findMaxBurden fArray outputBurden (oIndex+1) (cIndex-1))+1
                    
-- because of the ordering, we now assume that all outputBurdens between here
addLineRouting : InputInfo -> OutputBurden -> LineRouting -> Array Call -> IdToPos -> Bool -> (OutputBurden, LineRouting)
addLineRouting inputInfo outputBurden lineRouting fArray idToPos isLeft =
    let thisRouting = findThisRouting inputInfo outputBurden fArray idToPos
    in
        ((setOutputBurden outputBurden inputInfo.outputId thisRouting)
        ,(setLineRouting lineRouting inputInfo thisRouting isLeft))

existingBurdenOne inputInfo burden lineRouting isLeft =
    case getOutputBurden burden inputInfo.outputId of
        0 -> Nothing
        value -> Just (setLineRouting lineRouting inputInfo value isLeft)

isDirectlyAbove inputInfo idToPos =
    case Dict.get inputInfo.call.id idToPos of
        Just inputPos ->
            if inputInfo.outputId < 0 -- in the case that it is connected to func argument
            then
                (inputPos == 0)
            else
                (case Dict.get inputInfo.outputId idToPos of
                     Just outputPos -> (inputPos == (outputPos+1))
                     _ -> False)
        _ -> False
                 
existingBurden inputInfo burdenLeft burdenRight lineRouting idToPos =
    if isDirectlyAbove inputInfo idToPos
    then
        Just (setLineRouting lineRouting inputInfo 0 True)
    else
        case existingBurdenOne inputInfo burdenLeft lineRouting True of
            Just newRouting -> Just newRouting
            Nothing -> existingBurdenOne inputInfo burdenRight lineRouting False
        
buildLineRouting : Array Call -> OutputOrdering -> OutputBurden -> OutputBurden -> LineRouting -> IdToPos -> Bool -> LineRouting
buildLineRouting fArray ordering outputBurdenLeft outputBurdenRight lineRouting idToPos isLeft =
    (case ordering of
         [] -> lineRouting
         (inputInfo::rest) ->
             case existingBurden inputInfo outputBurdenLeft outputBurdenRight lineRouting idToPos of
                 Just newLineRouting -> (buildLineRouting fArray rest outputBurdenLeft outputBurdenRight newLineRouting idToPos isLeft) -- added to existing line
                 Nothing ->
                     (let currentBurden = (if isLeft then outputBurdenLeft else outputBurdenRight)
                          otherBurden = (if (not isLeft) then outputBurdenLeft else outputBurdenRight)
                          (newBurden, newRouting) = (addLineRouting inputInfo currentBurden lineRouting fArray idToPos isLeft)
                          newLeft = (if isLeft then newBurden else outputBurdenLeft)
                          newRight = (if (not isLeft) then newBurden else outputBurdenRight)
                      in
                          (buildLineRouting fArray rest newLeft newRight newRouting idToPos (not isLeft))))
        
getLineRouting : Function -> LineRouting
getLineRouting func =
    let idToPos = idToPosition func Dict.empty 0
        ordering = getOutputOrdering func idToPos
        funcArray = Array.fromList func.calls
    in
        buildLineRouting funcArray ordering Dict.empty Dict.empty Dict.empty idToPos True
    


maybeMax subroute =
    (withDefault 0 (List.maximum (List.map (withDefault 0) (Array.toList subroute))))

maybeMin subroute =
    (withDefault 0 (List.minimum (List.map (withDefault 0) (Array.toList subroute))))
        
getMaxLine routing =
    max 0
        (withDefault 0
             (List.maximum
                  (List.map maybeMax
                       (Dict.values routing))))

getMinLine routing =
    min 0
        (withDefault 0
             (List.minimum
                  (List.map maybeMin
                       (Dict.values routing))))
