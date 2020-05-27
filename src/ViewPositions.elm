module ViewPositions exposing (getViewStructures)

import LineRouting exposing (LineRouting, getLineRouting, getMaxLine, getMinLine)
import Model exposing (..)
import ModelHelpers exposing (idToPosition, IdToPos)
import ViewVariables
import Utils
import ViewStructure exposing (mouseToSvgCoordinates, ViewStructure, getViewStructure)

import Dict exposing (Dict)
import Debug exposing (log)


selectedFunc viewStructure =
    let oldPos = viewStructure.headerPos
        mouseCoordinates = (mouseToSvgCoordinates viewStructure.mouseState viewStructure.svgWidth
                                viewStructure.svgHeight 0 0)
        newPos = {oldPos | xpos = (Tuple.first mouseCoordinates)-(viewStructure.funcWidth//2),
                      ypos = (Tuple.second mouseCoordinates)-ViewVariables.functionHeaderHeight//2}
    in
        {viewStructure | headerPos = newPos}

getById : List ViewStructure -> Id -> Maybe ViewStructure
getById onion id =
    case onion of
        [] -> Nothing
        (f::rest) ->
            if f.id == id
            then
                Just f
            else getById rest id

            
getSelected viewStructures =
    case viewStructures of
        (viewStructure::rest) ->
            case viewStructure.mouseState.mouseSelection of
                FunctionSelected funcId ->
                    Maybe.map
                        selectedFunc
                        (getById viewStructures funcId)
                _ -> Nothing
        [] -> Nothing

setHeaderPos structure xpos ypos =
    let oldPos = structure.headerPos
        newPos = {oldPos | xpos = xpos, ypos = ypos}
    in
        {structure | headerPos = newPos}
            
recursivePosition viewStructures xpos ypos maybeSelected skipId =
    case viewStructures of
        [] ->
            case maybeSelected of
                Nothing -> []
                Just selected -> [selected]
        (structure::rest) ->
            if structure.id == skipId
            then (recursivePosition rest xpos ypos maybeSelected skipId)
            else
                let recur =
                        (\arg -> (recursivePosition arg
                                      (xpos+structure.funcWidth+ViewVariables.functionXSpacing) ypos maybeSelected skipId))
                in
                (case maybeSelected of
                    Nothing -> (setHeaderPos structure xpos ypos) :: (recur rest)
                    Just selected ->
                        if selected.headerPos.xpos <= xpos + structure.funcWidth
                        then
                            selected ::
                                (recursivePosition viewStructures
                                     (xpos+structure.funcWidth+ViewVariables.functionXSpacing) ypos Nothing skipId)
                        else (setHeaderPos structure xpos ypos) :: (recur rest))

                    

            
getFunctionViewStructure mouseState svgWindowWidth svgWindowHeight func =
    (getViewStructure func mouseState svgWindowWidth svgWindowHeight
         0 0 False)
            
positionStructures viewStructures =
    let selected = (getSelected viewStructures)
        skipId = Maybe.withDefault -1 (Maybe.map .id selected)
    in
        (recursivePosition viewStructures ViewVariables.funcInitialX ViewVariables.funcInitialY
             selected skipId)

getViewStructures onion mouseState svgWindowWidth svgWindowHeight =
    positionStructures (List.map (getFunctionViewStructure mouseState svgWindowWidth svgWindowHeight) onion)
