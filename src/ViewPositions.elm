module ViewPositions exposing (getViewStructures)

import LineRouting exposing (LineRouting, getLineRouting, getMaxLine, getMinLine)
import Model exposing (..)
import ModelHelpers exposing (idToPosition, IdToPos)
import ViewVariables
import Utils
import ViewStructure exposing (mouseToSvgCoordinates, ViewStructure, getViewStructure, maybeMovedInfo
                              ,MovedBlockInfo)

import Dict exposing (Dict)
import Debug exposing (log)


selectedFunc mouseState func svgWindowWidth svgWindowHeight mouseOffset =
    let view = (getViewStructure func mouseState svgWindowWidth svgWindowHeight
                    0 0 Nothing False)
        mouseCoordinates = (mouseToSvgCoordinates mouseState svgWindowWidth
                                svgWindowHeight 0 0)
        xpos = (Tuple.first mouseCoordinates)-(Tuple.first mouseOffset)
        ypos = (Tuple.second mouseCoordinates)-(Tuple.second mouseOffset)
        oldPos = view.headerPos
        newPos = {oldPos | xpos = xpos, ypos = ypos}
    in
        {view | headerPos = newPos}

           
            
getSelected mouseState svgWindowWidth svgWindowHeight =    
    case mouseState.mouseSelection of
        FunctionSelected func mouseOffset ->
            Just (selectedFunc mouseState func svgWindowWidth svgWindowHeight mouseOffset)
        _ -> Nothing


getCurrentMoveInfo maybeMoved rest xpos testStructure =
    (case maybeMoved of
         Nothing -> Nothing
         Just moveI ->
             (case rest of
                  [] -> Just moveI
                  _ -> (if (Tuple.first moveI.movedPos) <= xpos + testStructure.funcWidth
                        then Just moveI else Nothing)))
             
recursivePosition : Int -> Int -> Maybe ViewStructure -> Maybe MovedBlockInfo ->
                    MouseState -> Int -> Int -> Onion -> List ViewStructure
recursivePosition xpos ypos maybeSelected maybeMoved mouseState svgWindowWidth svgWindowHeight onion =
    case onion of
        [] ->
            case maybeSelected of
                Nothing -> []
                Just selected -> [selected]
        (func::rest) ->
            let -- first compute structure without move info to see how wide it is
                testStructure =
                    (getViewStructure func mouseState svgWindowWidth svgWindowHeight xpos ypos Nothing False)
                currentMoveInfo = getCurrentMoveInfo maybeMoved rest xpos testStructure
                    
                -- re-compute structure with moveinfo when needed
                newStructure =
                    (case currentMoveInfo of
                         Nothing -> testStructure
                         Just moveInfo ->
                             (getViewStructure func mouseState svgWindowWidth svgWindowHeight xpos ypos currentMoveInfo False))
                isSelected = case maybeSelected of
                                 Nothing -> False
                                 Just selected -> selected.headerPos.xpos <= xpos + newStructure.funcWidth
                newMoveInfo =
                    (case currentMoveInfo of
                         Nothing -> maybeMoved
                         Just moveInfo -> Nothing)
                newW = if isSelected then
                           (case maybeSelected of
                                Just selected -> selected.funcWidth
                                Nothing -> 0) -- should not happen
                       else newStructure.funcWidth
                newx = xpos + newW + ViewVariables.functionXSpacing
                newy = ypos
                newMaybeSelected = if isSelected then Nothing else maybeSelected
                recurList = if isSelected then onion else rest
                recurrance =
                    (recursivePosition newx newy newMaybeSelected newMoveInfo mouseState
                         svgWindowWidth svgWindowHeight recurList)
            in
                if isSelected
                then
                    case maybeSelected of
                        Just selected -> selected :: recurrance
                        Nothing -> recurrance -- should not happen!
                else newStructure :: recurrance


getViewStructures onion mouseState svgWindowWidth svgWindowHeight xoffset yoffset usedMoveInfo =
    let selected = (getSelected mouseState svgWindowWidth svgWindowHeight)
        moved = if usedMoveInfo
                then Nothing
                else (maybeMovedInfo mouseState svgWindowWidth svgWindowHeight)
    in
        recursivePosition (ViewVariables.funcInitialX+xoffset) (ViewVariables.funcInitialY+yoffset)
             selected moved mouseState svgWindowWidth svgWindowHeight onion
