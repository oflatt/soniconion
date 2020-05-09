module ViewPositions exposing (..)


import LineRouting exposing (LineRouting, getLineRouting)
import Model exposing (..)
import ModelHelpers exposing (idToPosition, IdToPos)
import ViewVariables

import Dict exposing (Dict)
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
                     
type alias InputPosition = (Int, Int)
                     
type alias BlockPosition = {xpos: Int
                           ,ypos: Int
                           ,inputPositions: Dict Int InputPosition}
    
type alias BlockPositions = Dict Id BlockPosition
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
countOutputsBefore : (List Input) -> Int -> Int
countOutputsBefore inputs threshhold =
    if (threshhold == 0)
    then 0
    else
        (case inputs of
             [] -> 0
             (input::rest) ->
                 (case input of
                      Output id -> 1 + (countOutputsBefore rest (threshhold-1))
                      _ -> countOutputsBefore rest (threshhold-1)))

countOutputs inputs =
    (countOutputsBefore inputs (List.length inputs))
                           
callLinesSpace call =
    (countOutputs call.inputs) * ViewVariables.lineSpaceBeforeBlock

getInputWidth input =
    case input of
        Text str -> ViewVariables.numCharactersToInputWidth (String.length str)
        _ -> ViewVariables.nodeRadius*2
        
inputPositionList inputs counter currentX =
    case inputs of
        [] -> []
        (input::rest) ->
            let width = getInputWidth input
            in
                (counter, (currentX, width)) :: (inputPositionList rest (counter+1) (currentX+width+ViewVariables.inputSpacing))
        
makeInputPositions call xpos =
    Dict.fromList (inputPositionList call.inputs 0 (ViewVariables.inputPadding + xpos))

makeBlockPosition xpos ypos call =
    (BlockPosition xpos ypos (makeInputPositions call xpos))
        
-- index is the index in the list but indexPos is where to draw (used for skipping positions)
getAllBlockPositions: Id -> Maybe MovedBlockInfo -> Function -> Int -> BlockPositions
getAllBlockPositions idToSkip maybeMoveInfo func currentY =
    let iterate = (\call calls ->
                       Dict.insert call.id (makeBlockPosition 0 (currentY+(callLinesSpace call)) call)
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
            Just info -> (Dict.insert
                              info.movedCall.id
                              (makeBlockPosition (Tuple.first info.movedPos) (Tuple.second info.movedPos) info.movedCall)
                              positionsWithoutMoved)
            Nothing -> positionsWithoutMoved

makeSortedFunc func blockPositions =
    List.sortBy (blockSorter blockPositions) func

blockSorter blockPositions call =
    case Dict.get call.id blockPositions of
        Nothing -> -100 -- todo some sort of error handeling
        Just pos -> pos.ypos
                   

                    
getViewStructure func mouseState svgScreenWidth svgScreenHeight xoffset yoffset isToolbar =
    let blockPositions = (getBlockPositions func mouseState svgScreenWidth svgScreenHeight xoffset yoffset)
        sortedFunc = makeSortedFunc func blockPositions
        lineRouting = getLineRouting sortedFunc
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
            
