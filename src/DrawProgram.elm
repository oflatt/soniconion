module DrawProgram exposing (drawProgram)

import Model exposing (..)
import SvgAssets


import Browser

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)


import Svg exposing (..)
import Svg.Attributes exposing (..)


import Html.Events exposing (onInput)


              
-- function for drawing builtIns
drawBuiltIn: BuiltIn -> Int -> (Svg msg)
drawBuiltIn builtIn counter =
    SvgAssets.functionNameshape (counter * SvgAssets.blockSpacing)

-- function for drawing play
drawPlay: Play -> Int -> (Svg msg)
drawPlay play counter =
  SvgAssets.functionNameshape (counter * 200)

-- function for drawing Expression objects
drawExpression: Expr -> Int -> (Svg msg)
drawExpression expr counter =
  case expr of
    BuiltInE builtIn -> drawBuiltIn builtIn counter
    PlayE play -> drawPlay play counter


-- function for draw call objects
drawCall: Call -> Int -> (Svg msg)
drawCall call counter = 
  drawExpression call.expr counter

-- function for drawin function objects
drawFunc: Function -> Int -> List (Svg msg)
drawFunc func counter = 
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter)::(drawFunc calls (counter + 1))

-- function for drawing the onion
drawOnion: Onion -> List (Svg msg)
drawOnion onion = 
  case onion of
    [] -> []
    (func::funcs) -> (drawFunc func 0) ++ (drawOnion funcs)

drawProgram : Model -> Int -> Int -> Html Msg
drawProgram model width height =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width(String.fromInt width) -- define the width of the svg
        , Svg.Attributes.height(String.fromInt height) -- define the height of the svg
        , Svg.Attributes.viewBox("0 0 " ++ SvgAssets.createViewboxDimensions width height) -- define the viewbox
        , display "inline-block"
        ]
         -- (mainShape ++ functionNameshape ++ methodNameShape ++ lineVertical ++ lineHorizontal))
         (drawOnion model.program))
