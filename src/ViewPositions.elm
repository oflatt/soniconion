module ViewPositions exposing (..)


import Model exposing (..)
import ViewVariables

import Dict exposing (Dict)
import Array exposing (Array)
import List
import Debug exposing (log)

-- skip index of -1 if 
type alias MovedBlockInfo = {movedCall : Call
                             ,movedPos : (Int, Int)}

mouseToSvgCoordinates: MouseState -> Int -> Int -> Int -> Int -> (Int, Int)
mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight xoffset yoffset =
    ((mouseState.mouseX * ViewVariables.viewportWidth) // svgScreenWidth - xoffset
    ,((mouseState.mouseY - ViewVariables.svgYpos) * (getViewportHeight svgScreenWidth svgScreenHeight)) // svgScreenHeight - yoffset)

svgYposToIndex: Int -> Int
svgYposToIndex yPos =
    yPos // (ViewVariables.blockSpace)
    
getMovedInfo func mouseState mouseSvgCoordinates =
    case func of
        [] -> Nothing
        (call::calls) ->
            case mouseState.mouseSelection of
                BlockSelected id ->
                    if id == call.id
                    then
                        Just (MovedBlockInfo
                                  call
                                  ((Tuple.first mouseSvgCoordinates) - (ViewVariables.blockWidth // 2)
                                  ,(Tuple.second mouseSvgCoordinates) - (ViewVariables.blockHeight // 2))) -- center block on mouse
                    else getMovedInfo calls mouseState mouseSvgCoordinates
                _ -> getMovedInfo calls mouseState mouseSvgCoordinates

type alias BlockPos = (Int, Int)
type alias CallLineRoute = List (Maybe Int) -- the relative positions of the outside of the line to the middle, in increments
type alias LineRouting = List CallLineRoute
type alias BlockPositions = Dict Id BlockPos
type alias ViewStructure = {blockPositions : BlockPositions
                           ,lineRouting : LineRouting
                           ,sortedFunc : Function
                           ,funcxoffset : Int
                           ,funcyoffset : Int
                           ,mouseState : MouseState
                           ,isToolbar : Bool}

blockPositionsToPositionList func blockPositions =
    case func of
        [] -> Ok []
        (call::calls) ->
            case Dict.get call.id blockPositions of
                Nothing -> Err "block not in blockPositions"
                Just pos ->
                    case blockPositionsToPositionList calls blockPositions of
                        Err e -> Err e
                        Ok positions ->
                            Ok (pos :: positions)

-- gets extra space for the outputs of a call
countOutputs inputs =
    case inputs of
        [] -> 0
        (input::rest) ->
            case input of
                Output id -> 1 + (countOutputs rest)
                _ -> countOutputs rest
                           
callLinesSpace call =
    (countOutputs call.inputs) * ViewVariables.lineSpaceBeforeBlock

-- index is the index in the list but indexPos is where to draw (used for skipping positions)
getAllBlockPositions: Id -> Maybe MovedBlockInfo -> Function -> Int -> BlockPositions
getAllBlockPositions idToSkip maybeMoveInfo func currentY =
    let iterate = (\call calls ->
                       Dict.insert call.id (0, currentY+(callLinesSpace call))
                           (getAllBlockPositions idToSkip maybeMoveInfo calls
                                (currentY+ViewVariables.blockSpace+(callLinesSpace call))))
    in
        case func of
            [] -> Dict.empty
            (call::calls) ->
                if call.id == idToSkip
                then (getAllBlockPositions idToSkip maybeMoveInfo calls currentY)
                else
                    case maybeMoveInfo of
                        Just moveInfo ->
                            if currentY+ViewVariables.blockHeight > (Tuple.second moveInfo.movedPos)
                            then
                                (getAllBlockPositions idToSkip Nothing func -- continue with whole func
                                     (currentY+ViewVariables.blockSpace+(callLinesSpace moveInfo.movedCall)))
                            else
                                -- iterate normally
                                (iterate call calls)
                                    
                        Nothing -> (iterate call calls)



                      
getBlockPositions: Function -> MouseState -> Int -> Int -> Int -> Int -> BlockPositions
getBlockPositions func mouseState svgScreenWidth svgScreenHeight xoffset yoffset =
    let moveInfo = getMovedInfo func mouseState (mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight xoffset yoffset)
        idToSkip =
            case moveInfo of
                Just info -> info.movedCall.id
                Nothing -> -1
        positionsWithoutMoved = getAllBlockPositions idToSkip moveInfo func 0
    in
        case moveInfo of
            Just info -> Dict.insert info.movedCall.id info.movedPos positionsWithoutMoved
            Nothing -> positionsWithoutMoved

type alias IdToPos = Dict Id Int

idToPosAdd func dict currentPos =
    case func of
        [] -> dict
        (call::calls) -> Dict.insert call.id currentPos (idToPosAdd calls dict (currentPos + 1))

blockSorter blockPositions call =
    case Dict.get call.id blockPositions of
        Nothing -> -100 -- todo some sort of error handeling
        Just pos -> Tuple.second pos
                   

makeIdToPos : Function -> BlockPositions -> (Function, IdToPos)
makeIdToPos func blockPositions =
    let sorted = (List.sortBy (blockSorter blockPositions) func)
    in
        (sorted, idToPosAdd sorted Dict.empty 0)

updateConnectedArray : List Input -> IdToPos -> ConnectedArray -> Bool -> (Bool, ConnectedArray)
updateConnectedArray inputs indexToPos array isLeft =
    case inputs of
        [] -> (isLeft, array)
        (input::rest) ->
            case input of
                Output id ->
                    case Dict.get id indexToPos of
                        -- TODO throw error here
                        Nothing -> updateConnectedArray rest indexToPos array isLeft
                        Just pos ->
                            if isLeft
                            then
                                updateConnectedArray rest indexToPos
                                    ((Array.set pos 1 (Tuple.first array)), (Tuple.second array))
                                    False
                            else
                                updateConnectedArray
                                    rest indexToPos
                                    ((Tuple.first array), (Array.set pos 1 (Tuple.second array)))
                                    True
                _ -> updateConnectedArray rest indexToPos array isLeft
                     
type alias ConnectedArray = (Array Int, Array Int)
                     
-- returns an array with 1's representing that the output is connected
getOutputConnectedArrayHelper: Function -> IdToPos -> ConnectedArray -> Bool -> ConnectedArray
getOutputConnectedArrayHelper func indexToPos array isLeft =
    case func of
        [] -> array
        (call::calls) ->
            let update = (updateConnectedArray call.inputs indexToPos array isLeft)
            in
                getOutputConnectedArrayHelper calls indexToPos (Tuple.second update) (Tuple.first update)

getOutputConnectedArray : Function -> IdToPos -> ConnectedArray
getOutputConnectedArray func indexToPos =
    let oneArray = (Array.repeat (List.length func) 0)
    in
        getOutputConnectedArrayHelper func indexToPos (oneArray, oneArray) True

countOutputsBetween subConnectedArray startIndex endIndex =
    if endIndex <= (startIndex + 1)
    then
        0
    else
        case Array.get (startIndex+1) subConnectedArray of
            Nothing -> 0 -- TODO throw error
            Just connectedness ->
                connectedness + (countOutputsBetween subConnectedArray (startIndex+1) endIndex)
                
    
getOutputRouting id connectedArray idToPos isLeft thisCallId =
    case Dict.get id idToPos of
        Nothing -> 0 -- TODO throw error
        Just outputIndex ->
            case Dict.get thisCallId idToPos of
                Nothing -> 0 -- TODO throw error
                Just callIndex ->
                    if outputIndex == (callIndex-1)
                    then 0
                    else
                        let startingSign =
                                if isLeft
                                then -1
                                else 1
                            subConnectedArray =
                                if isLeft
                                then (Tuple.first connectedArray)
                                else (Tuple.second connectedArray)
                        in
                            startingSign + (startingSign * (countOutputsBetween subConnectedArray outputIndex callIndex))
    
getInputsRouting : List Input -> ConnectedArray -> IdToPos -> Bool -> Id -> (CallLineRoute, Bool)
getInputsRouting inputs connectedArray idToPos isLeft thisCallId =
    case inputs of
        [] -> ([], isLeft)
        (input::rest) ->
            case input of
                Output id ->
                    let
                        restAnswer = getInputsRouting rest connectedArray idToPos (not isLeft) thisCallId
                    in
                        ((Just (getOutputRouting id connectedArray idToPos isLeft thisCallId) ::
                             (Tuple.first restAnswer))
                        ,(Tuple.second restAnswer))
                        
                _ ->
                    let
                        restAnswer = getInputsRouting rest connectedArray idToPos isLeft thisCallId
                    in
                        (Nothing :: (Tuple.first restAnswer)
                        ,(Tuple.second restAnswer))

    
getLineRouting : Function -> ConnectedArray -> IdToPos -> Bool -> LineRouting
getLineRouting func connectedArray idToPos isLeft=
    case func of
        [] -> []
        (call::calls) ->
            let routing = (getInputsRouting call.inputs connectedArray idToPos isLeft call.id)
            in
             (Tuple.first routing) ::
                (getLineRouting calls connectedArray idToPos (Tuple.second routing))

getViewStructure func mouseState svgScreenWidth svgScreenHeight xoffset yoffset isToolbar =
    let blockPositions = (getBlockPositions func mouseState svgScreenWidth svgScreenHeight xoffset yoffset)
        madePos = makeIdToPos func blockPositions
        sortedFunc = (Tuple.first madePos)
        idToPos = (Tuple.second madePos)
        connectedArray = getOutputConnectedArray sortedFunc idToPos
        lineRouting = getLineRouting sortedFunc connectedArray idToPos True
    in
        (ViewStructure
             blockPositions
             lineRouting
             sortedFunc
             xoffset
             yoffset
             mouseState
             isToolbar)


createViewboxDimensions w h =
    let
        width = String.fromInt (w)
        height = String.fromInt (h)
    in
        width ++ " " ++ height

getViewportHeight windowWidth windowHeight =
    ViewVariables.viewportWidth * windowHeight // windowWidth
            
