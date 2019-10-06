module DrawProgram exposing (drawProgram)

import Browser
import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)
import Svg
import Svg.Attributes
import Svg.Events
import Model exposing (..)

createViewboxDimensions modelWidth modelHeight = 
    let
        width = String.fromInt (modelWidth // 5)
        height = String.fromInt (modelHeight // 5)
    in 
        width ++ " " ++ height

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
