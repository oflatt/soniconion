module DrawProgram exposing (drawProgram)
import DrawFunc exposing (drawFuncWithConnections)
import DrawToolbar
import Model exposing (..)
import ViewPositions exposing (BlockPositions, CallLineRoute, BlockPos, ViewStructure)
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


-- function for drawing the onion
drawOnion: Onion -> MouseState -> Int -> Int -> List (Svg Msg)
drawOnion onion mouseState svgWindowWidth svgWindowHeight = 
  case onion of
    [] -> []
    (func::funcs) ->
        let viewStructure =
                (ViewPositions.getViewStructure func mouseState svgWindowWidth svgWindowHeight
                     (ViewVariables.functionXSpacing + (ViewVariables.toolbarWidth svgWindowWidth))
                     0 False)
        in
            (drawFuncWithConnections
                 viewStructure
                 mouseState) ::
            (drawOnion funcs mouseState svgWindowWidth svgWindowHeight)


                     
drawProgram : Onion -> MouseState -> Int -> Int -> Html Msg
drawProgram program mouseState svgWindowWidth svgWindowHeight =
    let elementHeight = svgWindowHeight * 2 -- TODO detect how big to make it
        viewportHeight = (ViewPositions.getViewportHeight svgWindowWidth elementHeight)
    in
        fromUnstyled
        (Svg.svg
             [ Svg.Attributes.width(String.fromInt svgWindowWidth) -- define the width of the svg
             , Svg.Attributes.height(String.fromInt elementHeight) -- define the height of the svg
             , Svg.Attributes.viewBox("0 0 " ++ (ViewPositions.createViewboxDimensions ViewVariables.viewportWidth viewportHeight)) -- define the viewbox
             , display "inline-block"
             ]
             ((DrawToolbar.drawToolbar program mouseState svgWindowWidth svgWindowHeight) ::
                  (drawOnion program mouseState svgWindowWidth svgWindowHeight)))
