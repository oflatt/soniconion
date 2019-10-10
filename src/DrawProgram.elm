module DrawProgram exposing (drawProgram)

import Model exposing (..)
import SvgAssets


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


-- function for drawing play
drawPlay: Play -> Int -> Dict Id Int -> (Svg Msg)
drawPlay play counter idToPos =
    SvgAssets.functionNameshape "play" (counter * SvgAssets.blockSpacing) (Finite []) idToPos [play.input]

-- function for drawing Expression objects
drawExpression: Expr -> Int -> Dict Id Int -> (Svg Msg)
drawExpression expr counter idToPos =
  case expr of
    BuiltInE builtIn -> SvgAssets.drawBuiltIn builtIn counter idToPos
    PlayE play -> drawPlay play counter idToPos

-- function for draw call objects

drawCall: Call -> Int -> Dict Id Int -> MouseState -> (Svg Msg)
drawCall call counter idToPos mouseState =
    if (call.id == mouseState.selectedId) && mouseState.mousePressedp then
        (Svg.g [
            transform(("translate(" ++ (String.fromInt mouseState.mouseX) ++ "," ++ (String.fromInt mouseState.mouseY) ++ ")")),
            Svg.Events.onMouseDown (Clicked call.id)] [(drawExpression call.expr counter idToPos)])
    else
        (Svg.g [
            Svg.Events.onMouseDown (Clicked call.id)] [(drawExpression call.expr counter idToPos)])
  

      
idToPosition func dict pos =
    case func of
        [] -> dict
        (e::es) -> idToPosition es
                   (Dict.insert e.id pos dict)
                   (pos + 1)


-- function for drawin function objects
drawFunc: Function -> Int -> Dict Id Int -> MouseState -> List (Svg Msg)
drawFunc func counter idToPos mouseState = 
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter idToPos mouseState)::(drawFunc calls (counter + 1) idToPos mouseState)


-- function for drawing the onion
drawOnion: Onion -> MouseState -> List (Svg Msg)
drawOnion onion mouseState = 
  case onion of
    [] -> []
    (func::funcs) -> (drawFunc func 0
                          (idToPosition func Dict.empty 0) mouseState) ++ (drawOnion funcs mouseState)

drawProgram : Onion -> MouseState -> Int -> Int -> Html Msg
drawProgram program mouseState width height =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width(String.fromInt width) -- define the width of the svg
        , Svg.Attributes.height(String.fromInt height) -- define the height of the svg
        , Svg.Attributes.viewBox("0 0 " ++ SvgAssets.createViewboxDimensions SvgAssets.viewportWidth SvgAssets.viewportHeight) -- define the viewbox
        , display "inline-block"
        ]
         (drawOnion program mouseState))
