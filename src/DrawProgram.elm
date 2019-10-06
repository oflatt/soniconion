module DrawProgram exposing (drawProgram)

import Browser
--import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)
import Svg
import Svg.Attributes
import Html exposing (Html)
import Svg exposing (..)
import Svg.Attributes exposing (..)
import Browser
import Browser
import Html exposing (Html, Attribute, div, input, text)
import Html.Events exposing (onInput)


shape1 =
 {- svg
    [ viewBox "0 0 400 400"
    , width "400"
    , height "400"
    ]-}
    [rect
        [ x "30"
        , y "50"
        , width "200"
        , height "80"
        , fill "green"
        , stroke "green"
        , strokeWidth "2"
        ]
        []
     , rect
       [ x "30"
        , y "30"
        , width "80"
        , height "30"
        , fill "green"
        , stroke "green"
        , strokeWidth "2"
        ]
        []
     , text_
        [ x "70"
        , y "40"
        , fill "white"
        , textAnchor "middle"
        , dominantBaseline "central"
        ]
        [ Svg.text "Main"
        ]
        ]
shape2 =
        {-svg
          [ viewBox "0 0 400 400"
          , width "400"
          , height "400"
          ]-}
          [ circle
            [ cx "50"
            , cy "280"
            , r "20"
            , fill "red"
            , stroke "red"
            , strokeWidth "3"
            ]
          []
          , rect
              [ x "30"
              , y "280"
              , width "200"
              , height "80"
              , fill "red"
              , stroke "red"
              , strokeWidth "2"
            ]
          []
        ]
shape3 =
    [ circle
        [ cx "50"
        , cy "165"
        , r "20"
        , fill "orange"
        , stroke "orange"
      , strokeWidth "3"
        ]
      []
      , rect
        [ x "30"
        , y "165"
        , width "200"
        , height "80"
        , fill "orange"
        , stroke "orange"
        , strokeWidth "2"
        ]
      []
    ]
createViewboxDimensions modelWidth modelHeight =
    let
        width = String.fromInt (400)
        height = String.fromInt (400)
    in
        width ++ " " ++ height

drawProgram model =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width(String.fromInt model.windowWidth) -- define the width of the svg
        , Svg.Attributes.height(String.fromInt model.windowHeight) -- define the height of the svg
        , Svg.Attributes.viewBox("0 0 " ++ createViewboxDimensions model.windowWidth model.windowHeight) -- define the viewbox
        ]
         (shape1++shape2++shape3))
