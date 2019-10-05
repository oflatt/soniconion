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


drawProgram model =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width "120"
        , Svg.Attributes.height "120"
        , Svg.Attributes.viewBox "0 0 120 120"
        ]
        [ Svg.rect
              [ Svg.Attributes.x "10"
              , Svg.Attributes.y "10"
              , Svg.Attributes.width "100"
              , Svg.Attributes.height "100"
              , Svg.Attributes.rx "15"
              , Svg.Attributes.ry "15"
              ]
              []])
