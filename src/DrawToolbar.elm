module DrawToolbar exposing (drawToolBar)

import Model exposing (..)

import ViewVariables

import Dict exposing (Dict)
import Array exposing (Array)

import Browser
import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)
import Svg exposing (Svg)
import Svg.Attributes

{-builtInToSvg : Int -> BuiltInSpec -> Svg msg
builtInToSvg counter builtInSpec =
    let 
        (name, nameList) = builtInSpec
    in
    SvgAssets.drawBuiltIn (BuiltIn []
                          name) counter Dict.empty Array.empty

allBuiltInFunctions : Int -> Int -> Int -> BuiltInList -> List (Svg msg)
allBuiltInFunctions counter twidth theight funcList =
    case funcList of
        [] -> []
        (f::fs) -> (builtInToSvg counter f) :: (allBuiltInFunctions (counter + 1) twidth theight fs)


toolBarSvg twidth theight =
    (allBuiltInFunctions 0 twidth theight builtInFunctionList)

drawToolBar : Int -> Int -> Html Msg
drawToolBar twidth theight =
    div [css [
          width (px (toFloat twidth))
         ,height (px (toFloat theight))
         ,display (inlineBlock)
         ]
        ]
        [] -- todo fix toolbar

-}
        
