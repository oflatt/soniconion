module ViewPositions exposing (getViewStructures)

import LineRouting exposing (LineRouting, getLineRouting, getMaxLine, getMinLine)
import Model exposing (..)
import ModelHelpers exposing (idToPosition, IdToPos)
import ViewVariables
import Utils
import ViewStructure exposing (mouseToSvgCoordinates, ViewStructure, getViewStructure)

import Dict exposing (Dict)
import Debug exposing (log)


selectedFunc mouseState func svgWindowWidth svgWindowHeight=
    let view = (getViewStructure func mouseState svgWindowWidth svgWindowHeight
                    0 0 False)
        mouseCoordinates = (mouseToSvgCoordinates mouseState svgWindowWidth
                                svgWindowHeight 0 0)
        xpos = (Tuple.first mouseCoordinates)-(view.funcWidth//2)
        ypos = (Tuple.second mouseCoordinates)-ViewVariables.functionHeaderHeight//2
        oldPos = view.headerPos
        newPos = {oldPos | xpos = xpos, ypos = ypos}
    in
        {view | headerPos = newPos}

            
getById : List Function -> Id -> Maybe Function
getById onion id =
    case onion of
        [] -> Nothing
        (f::rest) ->
            if f.id == id
            then
                Just f
            else getById rest id

            
getSelected mouseState svgWindowWidth svgWindowHeight =    
    case mouseState.mouseSelection of
        FunctionSelected func ->
            Just (selectedFunc mouseState func svgWindowWidth svgWindowHeight)
        _ -> Nothing


recursivePosition : Int -> Int -> Maybe ViewStructure -> MouseState -> Int -> Int -> Onion -> List ViewStructure
recursivePosition xpos ypos maybeSelected mouseState svgWindowWidth svgWindowHeight onion =
    case onion of
        [] ->
            case maybeSelected of
                Nothing -> []
                Just selected -> [selected]
        (func::rest) ->
            let newStructure = (getViewStructure func mouseState svgWindowWidth svgWindowHeight xpos ypos False)
                isSelected = case maybeSelected of
                                 Nothing -> False
                                 Just selected -> selected.headerPos.xpos <= xpos + newStructure.funcWidth
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
                    (recursivePosition newx newy newMaybeSelected mouseState
                         svgWindowWidth svgWindowHeight recurList)
            in
                if isSelected
                then
                    case maybeSelected of
                        Just selected -> selected :: recurrance
                        Nothing -> recurrance -- should not happen!
                else newStructure :: recurrance
                                   

            

getViewStructures onion mouseState svgWindowWidth svgWindowHeight =
    let selected = (getSelected mouseState svgWindowWidth svgWindowHeight)
    in
        recursivePosition ViewVariables.funcInitialX ViewVariables.funcInitialY
             selected mouseState svgWindowWidth svgWindowHeight onion
