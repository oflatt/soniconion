module DrawToolbar exposing (drawToolBar)

import Model exposing (..)
import SvgAssets

import Dict exposing (Dict)

import Browser
import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)
import Svg exposing (Svg)
import Svg.Attributes

builtInToSvg : Int -> BuiltInSpec -> Svg msg
builtInToSvg yPos builtInSpec =
    let 
        (name, nameList) = builtInSpec
    in
    SvgAssets.drawBuiltIn (BuiltIn []
                          name) yPos Dict.empty

allBuiltInFunctions : Int -> Int -> Int -> BuiltInList -> List (Svg msg)
allBuiltInFunctions offset twidth theight funcList =
    case funcList of
        [] -> []
        (f::fs) -> (builtInToSvg offset f) :: (allBuiltInFunctions (offset + SvgAssets.blockSpacing) twidth theight fs)


toolBarSvg model twidth theight =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width(String.fromInt twidth) -- define the width of the svg
        , Svg.Attributes.height(String.fromInt theight) -- define the height of the svg
        , Svg.Attributes.viewBox("0 0 " ++
                                     SvgAssets.createViewboxDimensions (Basics.round (SvgAssets.viewportWidth / 2)) SvgAssets.viewportHeight) -- define the viewbox
        ]
         -- (mainShape ++ functionNameshape ++ methodNameShape ++ lineVertical ++ lineHorizontal))
         (allBuiltInFunctions SvgAssets.paddingSize twidth theight builtInFunctionList))

drawToolBar : Model -> Int -> Int -> Html Msg
drawToolBar model twidth theight =
    div [css [
          width (px (toFloat twidth))
         ,height (px (toFloat theight))
         ,display (inlineBlock)
         ]
        ]
        [toolBarSvg model twidth theight]
        
