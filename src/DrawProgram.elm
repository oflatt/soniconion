module DrawProgram exposing (drawProgram)
import Model exposing (..)
import SvgAssets exposing (BlockPositions)
import ViewVariables


import Browser

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)

import Dict exposing (Dict)


import Svg exposing (..)
import Svg.Attributes exposing (..)


import Html.Events exposing (onInput)

import Svg.Events

import Debug exposing (log)



-- function for drawing Expression objects
drawExpression: Expr -> Int -> Dict Id Int -> BlockPositions -> (Svg Msg)
drawExpression expr counter idToPos blockPositions =
  case expr of
    BuiltInE builtIn -> SvgAssets.drawBuiltIn builtIn counter idToPos blockPositions


-- function for draw call objects

drawCall: Call -> Int -> Dict Id Int -> BlockPositions -> (Svg Msg)
drawCall call counter idToPos blockPositions =
    (Svg.g
         [Svg.Events.onMouseDown (Clicked call.id)]
         [(drawExpression call.expr counter idToPos blockPositions)])

      
idToPosition func dict pos =
    case func of
        [] -> dict
        (e::es) -> idToPosition es
                   (Dict.insert e.id pos dict)
                   (pos + 1)


-- function for drawin function objects
drawFunc: Function -> Int -> Dict Id Int -> BlockPositions -> List (Svg Msg)
drawFunc func counter idToPos blockPositions =
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter idToPos blockPositions) :: (drawFunc calls (counter + 1) idToPos blockPositions)


-- function for drawing the onion
drawOnion: Onion -> MouseState -> Int -> Int -> List (Svg Msg)
drawOnion onion mouseState svgWindowWidth svgWindowHeight = 
  case onion of
    [] -> []
    (func::funcs) ->
        let blockPositions = SvgAssets.getBlockPositions func mouseState svgWindowWidth svgWindowHeight
        in
            (drawFunc func 0
                 (idToPosition func Dict.empty 0)
                 blockPositions) ++
            (drawOnion funcs mouseState svgWindowWidth svgWindowHeight)


                     
drawProgram : Onion -> MouseState -> Int -> Int -> Html Msg
drawProgram program mouseState svgWindowWidth svgWindowHeight =
    let viewportHeight = (SvgAssets.getViewportHeight svgWindowWidth svgWindowHeight)
    in
        fromUnstyled
        (Svg.svg
             [ Svg.Attributes.width(String.fromInt svgWindowWidth) -- define the width of the svg
             , Svg.Attributes.height(String.fromInt svgWindowHeight) -- define the height of the svg
             , Svg.Attributes.viewBox("0 0 " ++ (SvgAssets.createViewboxDimensions ViewVariables.viewportWidth viewportHeight)) -- define the viewbox
             , display "inline-block"
             ]
             (drawOnion program mouseState svgWindowWidth svgWindowHeight))
