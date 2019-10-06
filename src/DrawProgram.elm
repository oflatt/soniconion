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


              

-- function for drawing play
drawPlay: Play -> Int -> Dict Id Int -> (Svg msg)
drawPlay play counter idToPos =
    SvgAssets.functionNameshape "play" (counter * SvgAssets.blockSpacing) (Finite []) idToPos [play.input]

-- function for drawing Expression objects
drawExpression: Expr -> Int -> Dict Id Int -> (Svg msg)
drawExpression expr counter idToPos =
  case expr of
    BuiltInE builtIn -> SvgAssets.drawBuiltIn builtIn counter idToPos
    PlayE play -> drawPlay play counter idToPos


-- function for draw call objects
drawCall: Call -> Int -> Dict Id Int -> (Svg msg)
drawCall call counter idToPos = 
  drawExpression call.expr counter idToPos

      
idToPosition func dict pos =
    case func of
        [] -> dict
        (e::es) -> idToPosition es
                   (Dict.insert e.id pos dict)
                   (pos + 1)

      
-- function for drawin function objects
drawFunc: Function -> Int -> Dict Id Int -> List (Svg msg)
drawFunc func counter idToPos = 
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter idToPos)::(drawFunc calls (counter + 1) idToPos)

-- function for drawing the onion
drawOnion: Onion -> List (Svg msg)
drawOnion onion = 
  case onion of
    [] -> []
    (func::funcs) -> (drawFunc func 0
                     (idToPosition func Dict.empty 0)) ++ (drawOnion funcs)

drawProgram : Model -> Int -> Int -> Html Msg
drawProgram model width height =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width(String.fromInt width) -- define the width of the svg
        , Svg.Attributes.height(String.fromInt height) -- define the height of the svg
        , Svg.Attributes.viewBox("0 0 " ++ SvgAssets.createViewboxDimensions SvgAssets.viewportWidth SvgAssets.viewportHeight) -- define the viewbox
        , display "inline-block"
        ]
         (drawOnion model.program))
