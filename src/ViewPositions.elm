module ViewPositions exposing (createViewboxDimensions, BlockPositions, BlockPos, getBlockPositions, getViewportHeight)


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
            if mouseState.mousePressedp && (mouseState.selectedId == call.id)
            then
                (MovedBlockInfo (svgYposToIndex (Tuple.second mouseSvgCoordinates))
                     index
                     ((Tuple.first mouseSvgCoordinates) - (ViewVariables.blockWidth // 2)
                     ,(Tuple.second mouseSvgCoordinates) - (ViewVariables.blockHeight // 2))) -- center block on mouse
            else
                getMovedInfo calls mouseState (index + 1) mouseSvgCoordinates

type alias BlockPos = (Int, Int)
type alias BlockPositions = Array BlockPos

indexToBlockPos indexPos =
    (100, indexPos * (ViewVariables.blockHeight + ViewVariables.blockSpacing))

-- index is the index in the list but indexPos is where to draw (used for skipping positions)
getAllBlockPositions: MovedBlockInfo -> Function -> MouseState -> Int -> Int -> List BlockPos
getAllBlockPositions moveInfo func mouseState index indexPos =
    case func of
        [] -> []
        (call::calls) ->
            if indexPos == moveInfo.skipIndex && index == moveInfo.movedIndex
            then
                moveInfo.movedPos :: (getAllBlockPositions moveInfo calls mouseState (index + 1) (indexPos + 1))
            else if indexPos == moveInfo.skipIndex
                 then
                     (getAllBlockPositions moveInfo func mouseState index (indexPos + 1))
                 else
                     if index == moveInfo.movedIndex
                         then
                             moveInfo.movedPos :: (getAllBlockPositions moveInfo calls mouseState (index + 1) indexPos)
                     else
                         (indexToBlockPos indexPos) :: (getAllBlockPositions moveInfo calls mouseState (index + 1) (indexPos + 1))
                      
getBlockPositions: Function -> MouseState -> Int -> Int -> BlockPositions
getBlockPositions func mouseState svgScreenWidth svgScreenHeight =
    let moveInfo = getMovedInfo func mouseState 0 (mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight)
    in
        Array.fromList (getAllBlockPositions moveInfo func mouseState 0 0)
        
            


createViewboxDimensions w h =
    let
        width = String.fromInt (w)
        height = String.fromInt (h)
    in
        width ++ " " ++ height

getViewportHeight windowWidth windowHeight =
    ViewVariables.viewportWidth * windowHeight // windowWidth
            
