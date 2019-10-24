module ViewPositions exposing (createViewboxDimensions, BlockPositions, BlockPos, getBlockPositions, getViewportHeight, getOutputConnectedArray, makeIdToPos, getViewStructure)


import Model exposing (..)
import ViewVariables exposing (blockHeight, blockSpacing)

import Dict exposing (Dict)
import Array exposing (Array)

-- skip index of -1 if 
type alias MovedBlockInfo = {skipIndex : Int,
                             movedIndex : Int,
                             movedPos : (Int, Int)}
noMovedBlock: MovedBlockInfo
noMovedBlock = (MovedBlockInfo -1 -1 (-1, -1))

mouseToSvgCoordinates: MouseState -> Int -> Int -> (Int, Int)
mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight =
    ((mouseState.mouseX * ViewVariables.viewportWidth) // svgScreenWidth
    ,((mouseState.mouseY - ViewVariables.svgYpos) * (getViewportHeight svgScreenWidth svgScreenHeight)) // svgScreenHeight)

svgYposToIndex: Int -> Int
svgYposToIndex yPos =
    yPos // (blockHeight + blockSpacing)
    
getMovedInfo func mouseState index mouseSvgCoordinates =
    case func of
        [] -> noMovedBlock
        (call::calls) ->
            case mouseState.mouseSelection of
                BlockSelected id ->
                    if id == call.id
                    then
                        (MovedBlockInfo (svgYposToIndex (Tuple.second mouseSvgCoordinates))
                             index
                             ((Tuple.first mouseSvgCoordinates) - (ViewVariables.blockWidth // 2)
                             ,(Tuple.second mouseSvgCoordinates) - (ViewVariables.blockHeight // 2))) -- center block on mouse
                    else getMovedInfo calls mouseState (index + 1) mouseSvgCoordinates
                _ -> getMovedInfo calls mouseState (index + 1) mouseSvgCoordinates

type alias BlockPos = (Int, Int)
type alias LineRoute = Int -- the relative positions of the outside of the line to the middle, in increments
type alias BlockPositions = Dict Id BlockPos
type alias ViewStructure = {blockPositions : BlockPositions
                           ,lineRouting : (List (List LineRoute))}

indexToBlockPos indexPos =
    (100, indexPos * (ViewVariables.blockHeight + ViewVariables.blockSpacing))

-- index is the index in the list but indexPos is where to draw (used for skipping positions)
getAllBlockPositions: MovedBlockInfo -> Function -> MouseState -> Int -> Int -> BlockPositions
getAllBlockPositions moveInfo func mouseState index indexPos =
    case func of
        [] -> Dict.empty
        (call::calls) ->
            if indexPos == moveInfo.skipIndex && index == moveInfo.movedIndex
            then
                Dict.insert call.id moveInfo.movedPos (getAllBlockPositions moveInfo calls mouseState (index + 1) (indexPos + 1))
            else if indexPos == moveInfo.skipIndex
                 then
                     (getAllBlockPositions moveInfo func mouseState index (indexPos + 1))
                 else
                     if index == moveInfo.movedIndex
                         then
                             Dict.insert call.id moveInfo.movedPos (getAllBlockPositions moveInfo calls mouseState (index + 1) indexPos)
                     else
                         Dict.insert call.id (indexToBlockPos indexPos) (getAllBlockPositions moveInfo calls mouseState (index + 1) (indexPos + 1)) 
                      
getBlockPositions: Function -> MouseState -> Int -> Int -> BlockPositions
getBlockPositions func mouseState svgScreenWidth svgScreenHeight =
    let moveInfo = getMovedInfo func mouseState 0 (mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight)
    in
        getAllBlockPositions moveInfo func mouseState 0 0

type alias IdToPos = Dict Id Int
            
makeIdToPos func dict currentPos =
    case func of
        [] -> dict
        (call::calls) -> Dict.insert call.id currentPos (makeIdToPos calls dict (currentPos + 1))

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

-- relative offset of inputs for each call
type alias LineRouting = List (List Int)

countOutputsBetween subConnectedArray startIndex endIndex =
    if endIndex <= (startIndex + 1)
    then
        0
    else
        case Array.get (startIndex+1) subConnectedArray of
            Nothing -> 0 -- TODO throw error
            Just connectedness ->
                connectedness + (countOutputsBetween subConnectedArray (startIndex+1) endIndex)
                
    
getOutputRouting id connectedArray idToPos isLeft callIndex =
    case Dict.get id idToPos of
        Nothing -> 0 -- TODO throw error
        Just outputIndex ->
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
    
getInputsRouting : List Input -> ConnectedArray -> IdToPos -> Bool -> Int -> ((List Int), Bool)
getInputsRouting inputs connectedArray idToPos isLeft callIndex =
    case inputs of
        [] -> ([], isLeft)
        (input::rest) ->
            case input of
                Output id ->
                    let
                        restAnswer = getInputsRouting rest connectedArray idToPos (not isLeft) callIndex
                    in
                        ((getOutputRouting id connectedArray idToPos isLeft callIndex ::
                             (Tuple.first restAnswer))
                        ,(Tuple.second restAnswer))
                        
                _ ->
                    getInputsRouting rest connectedArray idToPos isLeft callIndex
    
getLineRouting : Function -> ConnectedArray -> IdToPos -> Bool -> Int -> LineRouting
getLineRouting func connectedArray idToPos isLeft iter =
    case func of
        [] -> []
        (call::calls) ->
            let routing = (getInputsRouting call.inputs connectedArray idToPos isLeft iter)
            in
             (Tuple.first routing) ::
                (getLineRouting calls connectedArray idToPos (Tuple.second routing) (iter + 1))

getViewStructure func mouseState svgScreenWidth svgScreenHeight =
    let idToPos = makeIdToPos func Dict.empty 0
        connectedArray = getOutputConnectedArray func idToPos
        lineRouting = getLineRouting func connectedArray idToPos True 0
    in
        (ViewStructure
             (getBlockPositions func mouseState svgScreenWidth svgScreenHeight)
             lineRouting)


createViewboxDimensions w h =
    let
        width = String.fromInt (w)
        height = String.fromInt (h)
    in
        width ++ " " ++ height

getViewportHeight windowWidth windowHeight =
    ViewVariables.viewportWidth * windowHeight // windowWidth
            
