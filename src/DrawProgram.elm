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
              
-- function for drawing builtIns
--drawBuiltIn: BuiltIn -> Int -> (Svg Msg)
--drawBuiltIn builtIn counter =
    --SvgAssets.functionNameshape "asdf" (counter * SvgAssets.blockSpacing)

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

drawCall: Call -> Int -> Dict Id Int -> Model -> (Svg Msg)
drawCall call counter idToPos model =
    if call.id == model.sel_id then
        (Svg.g [
            transform(("translate(" ++ (String.fromInt model.dx) ++ "," ++ (String.fromInt model.dy) ++ ")")),
            Svg.Events.onMouseDown (Move call.id)] [(drawExpression call.expr counter idToPos)])
    else
        (Svg.g [
            Svg.Events.onMouseDown (Move call.id)] [(drawExpression call.expr counter idToPos)])
  

      
idToPosition func dict pos =
    case func of
        [] -> dict
        (e::es) -> idToPosition es
                   (Dict.insert e.id pos dict)
                   (pos + 1)

      
-- function for drawin function objects
drawFunc: Function -> Int -> Dict Id Int -> Model -> List (Svg Msg)
drawFunc func counter idToPos model = 
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter idToPos model)::(drawFunc calls (counter + 1) idToPos model)


-- function for drawing the onion
drawOnion: Onion -> Model -> List (Svg Msg)
drawOnion onion model = 
  case onion of
    [] -> []

    (func::funcs) -> (drawFunc func 0
                          (idToPosition func Dict.empty 0) model) ++ (drawOnion funcs model)

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
