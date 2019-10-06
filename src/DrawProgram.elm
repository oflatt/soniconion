module DrawProgram exposing (drawProgram)

import Browser

import Model exposing (..)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)
import Svg
import Svg.Attributes

import Svg exposing (..)
import Svg.Attributes exposing (..)
import Browser
import Browser

import Html.Events exposing (onInput)

--- Sam import
import Svg.Events

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
        , Svg.Events.onMouseDown (Move)
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
lineVertical=
  [line
    [x1  "260"
    , y1  "400"
    , x2  "260"
    , y2  "460"
    , stroke  "blue"
    , strokeWidth  "5"
    , strokeLinecap  "round"
    ]
  []
  ]
lineHorizontal =
  [line
    [x1  "200"
    , y1  "400"
    , x2  "240"
    , y2  "400"
    , stroke  "purple"
    , strokeWidth  "5"
    , strokeLinecap  "round"
    ]
    []
    ]
createViewboxDimensions modelWidth modelHeight =
    let
        width = String.fromInt (600)
        height = String.fromInt (600)
    in
        width ++ " " ++ height

drawProgram : Model -> Int -> Int -> Html Msg
drawProgram model width height =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width(String.fromInt width) -- define the width of the svg
        , Svg.Attributes.height(String.fromInt height) -- define the height of the svg
        , Svg.Attributes.viewBox("0 0 " ++ createViewboxDimensions width height) -- define the viewbox
        , display "inline-block"
        ]
         (shape1++shape2++shape3++lineVertical++lineHorizontal))

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
