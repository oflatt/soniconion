module LineRouting exposing (CallLineRoute, LineRouting, getLineRouting)

import ModelHelpers exposing (IdToPos, idToPosition)
import Model exposing (Function, Call, Input(..), Id)
import Array exposing (Array)
import Dict exposing (Dict)

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

setLineRouting : LineRouting -> InputInfo -> Int -> LineRouting
setLineRouting lineRouting inputInfo thisRouting =
    Dict.update inputInfo.call.id (updateCallLineRoute inputInfo thisRouting) lineRouting
    
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
                       
getCallOrderedInputs : Call -> OutputOrdering
getCallOrderedInputs call =
    List.filterMap
        (\inputPair ->
             case (Tuple.first inputPair) of
                 Output outputId -> Just (InputInfo call (Tuple.second inputPair) outputId)
                 _ -> Nothing)
        (List.map2 Tuple.pair call.inputs (List.range 0 ((List.length call.inputs)-1)))

byOutput idToPos element =
    case Dict.get element.outputId idToPos of
        Just pos -> -pos
        Nothing -> 100 -- todo throw error
    
            
getOutputOrdering : Function -> IdToPos -> OutputOrdering
getOutputOrdering func idToPos =
    List.sortBy (byOutput idToPos) (List.concatMap getCallOrderedInputs func)
        


        
countOutputsBetween subOutputConnectedDict startIndex endIndex =
    if endIndex <= (startIndex + 1)
    then
        0
    else
        case Array.get (startIndex+1) subOutputConnectedDict of
            Nothing -> 0 -- TODO throw error
            Just connectedness ->
                connectedness + (countOutputsBetween subOutputConnectedDict (startIndex+1) endIndex)    

findMaxBurden : Array Call -> OutputBurden -> Int -> Int -> Int
findMaxBurden fArray outputBurden currentIndex maxIndex =
    if currentIndex >= maxIndex
    then 0
    else
        let callId =
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
                           Nothing -> 0)-- should never happen
    in
        if oIndex == (1 + cIndex)
        then 0
        else
            max (findMaxBurden fArray outputBurden (oIndex+1) (cIndex-1)) 1
                    
-- because of the ordering, we now assume that all outputBurdens between here
addLineRouting : InputInfo -> OutputBurden -> LineRouting -> Array Call -> IdToPos -> (OutputBurden, LineRouting)
addLineRouting inputInfo outputBurden lineRouting fArray idToPos =
    let thisRouting = findThisRouting inputInfo outputBurden fArray idToPos
    in
        ((setOutputBurden outputBurden inputInfo.outputId thisRouting)
        ,(setLineRouting lineRouting inputInfo thisRouting))
                    
buildLineRouting : Array Call -> OutputOrdering -> OutputBurden -> LineRouting -> IdToPos-> LineRouting
buildLineRouting fArray ordering outputBurden lineRouting idToPos =
    case ordering of
        [] -> lineRouting
        (inputInfo::rest) ->
            let (newBurden, newRouting) = (addLineRouting inputInfo outputBurden lineRouting fArray idToPos)
            in (buildLineRouting fArray rest newBurden newRouting idToPos)
              
                    
                        
getLineRouting : Function -> LineRouting
getLineRouting func =
    let idToPos = idToPosition func Dict.empty 0
        ordering = getOutputOrdering func idToPos
        funcArray = Array.fromList func
    in
        buildLineRouting funcArray ordering Dict.empty Dict.empty idToPos
    
