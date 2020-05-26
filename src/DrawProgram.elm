module DrawProgram exposing (drawProgram)
import DrawFunc exposing (drawFuncWithConnections)
import DrawToolbar
import Model exposing (..)
import ViewPositions
import ViewVariables
import SvgDraw
import Update exposing (nodeInputId, nodeOutputId)


import Browser

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)

import Dict exposing (Dict)
import Array exposing (Array)


import Svg exposing (..)
import Svg.Attributes exposing (..)
import Svg.Events


import Html.Events exposing (onInput)

import Debug exposing (log)


getFunctionViewStructure mouseState svgWindowWidth svgWindowHeight func =
    (ViewPositions.getViewStructure func mouseState svgWindowWidth svgWindowHeight
         0 0 False)


recursivePosition viewStructures xpos ypos =
    case viewStructures of
        [] -> []
        (structure::rest) ->
            let oldPos = structure.headerPos
                newPos = {oldPos | xpos = xpos, ypos = ypos}
            in
                {structure | headerPos = newPos} ::
                    (recursivePosition rest (xpos+structure.funcWidth+ViewVariables.functionXSpacing) ypos)

maxYOfStructures positioned =
    (Maybe.withDefault 0 (List.maximum (List.map (\structure -> structure.headerPos.ypos + structure.funcHeight) positioned)))
                        
positionStructures viewStructures =
    recursivePosition viewStructures (ViewVariables.toolbarWidth+ViewVariables.functionXSpacing) ViewVariables.functionYSpacing

-- function for drawing the onion
drawOnion: Onion -> MouseState -> Int -> Int -> (Int, List (Svg Msg)) -- funcs and max height
drawOnion onion mouseState svgWindowWidth svgWindowHeight =
    let viewStructures =
            List.map (getFunctionViewStructure mouseState svgWindowWidth svgWindowHeight) onion
        positioned =
            positionStructures viewStructures
    in
        ((maxYOfStructures positioned)
        ,(List.map drawFuncWithConnections positioned))
            


                     
drawProgram : Onion -> MouseState -> Int -> Int -> Html Msg
drawProgram program mouseState svgWindowWidth svgWindowHeight =
    let viewportWidth = (ViewVariables.viewportWidth svgWindowWidth svgWindowHeight)
        viewportHeight = (ViewVariables.viewportHeight)
        drawnOnion = (drawOnion program mouseState svgWindowWidth svgWindowHeight)
        drawnToolbar = (DrawToolbar.drawToolbar program mouseState svgWindowWidth svgWindowHeight)
        actualViewportHeight = Basics.max (Tuple.first drawnOnion) (Tuple.first drawnToolbar)
        actualWindowHeight = floor ((toFloat svgWindowHeight) * ((toFloat actualViewportHeight) / (toFloat viewportHeight)))
    in
        fromUnstyled
        (Svg.svg
             ((SvgDraw.svgClickEvents NoOp NoOp)
                  ++
                  [ Svg.Attributes.width(String.fromInt svgWindowWidth) -- define the width of the svg
                  , Svg.Attributes.height(String.fromInt actualWindowHeight) -- define the height of the svg
                  , Svg.Attributes.viewBox("0 0 " ++ (ViewPositions.createViewboxDimensions viewportWidth actualViewportHeight)) -- define the viewbox
                  , display "inline-block"
                  ])
             ((Tuple.second drawnToolbar) ::
                  (Tuple.second drawnOnion)))
