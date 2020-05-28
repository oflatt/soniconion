module ViewPositions exposing (getViewStructures)

import LineRouting exposing (LineRouting, getLineRouting, getMaxLine, getMinLine)
import Model exposing (..)
import ModelHelpers exposing (idToPosition, IdToPos)
import ViewVariables
import Utils
import ViewStructure exposing (mouseToSvgCoordinates, ViewStructure, getViewStructure)

import Dict exposing (Dict)
import Debug exposing (log)


selectedFunc mouseState svgWindowWidth svgWindowHeight func =
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

            
getSelected functions mouseState svgWindowWidth svgWindowHeight =    
    case mouseState.mouseSelection of
        FunctionSelected funcId ->
            Maybe.map
                (selectedFunc mouseState svgWindowWidth svgWindowHeight)
                (getById functions funcId)
        _ -> Nothing


recursivePosition : Int -> Int -> Maybe ViewStructure -> Id -> MouseState -> Int -> Int -> Onion -> List ViewStructure
recursivePosition xpos ypos maybeSelected skipId mouseState svgWindowWidth svgWindowHeight onion =
    case onion of
        [] ->
            case maybeSelected of
                Nothing -> []
                Just selected -> [selected]
        (func::rest) ->
            if func.id == skipId
            then (recursivePosition xpos ypos maybeSelected skipId mouseState svgWindowWidth svgWindowHeight rest)
            else
                let newStructure = (getViewStructure func mouseState svgWindowWidth svgWindowHeight xpos ypos False)
                    recur =
                        (\_ ->
                             newStructure ::
                             (recursivePosition (xpos+newStructure.funcWidth+ViewVariables.functionXSpacing)
                                  ypos maybeSelected skipId mouseState svgWindowWidth svgWindowHeight rest))
                    
                in
                    (case maybeSelected of
                         Nothing -> (recur ())
                         Just selected ->
                             (if selected.headerPos.xpos <= xpos + newStructure.funcWidth
                              then
                                  selected ::
                                  (recursivePosition (xpos+selected.funcWidth+ViewVariables.functionXSpacing) ypos
                                       Nothing skipId mouseState svgWindowWidth svgWindowHeight onion)
                              else (recur ())))

                    

            

getViewStructures onion mouseState svgWindowWidth svgWindowHeight =
    let selected = (getSelected onion mouseState svgWindowWidth svgWindowHeight)
        skipId = Maybe.withDefault -1 (Maybe.map .id selected)
    in
        recursivePosition ViewVariables.funcInitialX ViewVariables.funcInitialY
             selected skipId  mouseState svgWindowWidth svgWindowHeight onion
