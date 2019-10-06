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

import Svg.Events

import Debug exposing (log)
              
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

--maphelp a = (log "" a)

-- function for draw call objects
drawCall: Call -> Int -> Model -> (Svg Msg)
drawCall call counter model = 
    if call.id == model.sel_id then
        (Svg.g [
            transform(("translate(" ++ (String.fromInt model.dx) ++ "," ++ (String.fromInt model.dy) ++ ")")),
            Svg.Events.onMouseDown (Move call.id)] [(drawExpression call.expr counter)])
    else
        (Svg.g [
            Svg.Events.onMouseDown (Move call.id)] [(drawExpression call.expr counter)])

-- function for drawin function objects
drawFunc: Function -> Int -> Model -> List (Svg Msg)
drawFunc func counter model = 
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter model)::(drawFunc calls (counter + 1) model)

-- function for drawing the onion
drawOnion: Onion -> Model -> List (Svg Msg)
drawOnion onion model = 
  case onion of
    [] -> []
    (func::funcs) -> (drawFunc func 0 model) ++ (drawOnion funcs model)

drawProgram : Model -> Int -> Int -> Html Msg
drawProgram model width height =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width(String.fromInt width) -- define the width of the svg
        , Svg.Attributes.height(String.fromInt height) -- define the height of the svg
        , Svg.Attributes.viewBox("0 0 " ++ SvgAssets.createViewboxDimensions SvgAssets.viewportWidth SvgAssets.viewportHeight) -- define the viewbox
        , display "inline-block"
        ]
         -- (mainShape ++ functionNameshape ++ methodNameShape ++ lineVertical ++ lineHorizontal))
         (drawOnion model.program model))

{-
import Svg.Events

drawProgram model =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width(String.fromInt model.windowWidth) -- define the width of the svg
        , Svg.Attributes.height(String.fromInt model.windowHeight) -- define the height of the svg
        , Svg.Attributes.viewBox("0 0 " ++ createViewboxDimensions model.windowWidth model.windowHeight) -- define the viewbox
        ]
        [ Svg.rect
              [ Svg.Attributes.x model.testx
              , Svg.Events.onMouseDown (Move)
              , Svg.Attributes.y model.testy
              , Svg.Attributes.width(String.fromInt (model.windowWidth // 20))
              , Svg.Attributes.height(String.fromInt (model.windowHeight // 20))
              , Svg.Attributes.rx "15"
              , Svg.Attributes.ry "15"
              ]
              []])
-}
