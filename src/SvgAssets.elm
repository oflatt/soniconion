module SvgAssets exposing (..)


import Model exposing (..)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)


import Svg exposing (..)
import Svg.Attributes exposing (..)

blockSpacing = 150
paddingSize = 20
viewportWidth = 600
viewportHeight = 600

mainShape =
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

-- shape for functionName objects
functionNameshape: Int -> (Svg msg)
functionNameshape yPos =
  Svg.node "g"
      [
       transform ("translate(" ++ "30," ++(String.fromInt (paddingSize + yPos) ++ ")"))
      ]
      {-svg
      [ viewBox "0 0 400 400"
      , width "400"
      , height "400"
      ]-}
      [ circle
            [ cx "20"
            , cy "20"
            , r "20"
            , fill "red"
            , stroke "red"
            , strokeWidth "3"
            ]
            []
      , rect
            [ x "0"
            , y "20"
            , width "200"
            , height "80"
            , fill "red"
            , stroke "red"
            , strokeWidth "2"
            ]
            []
      ]
      
methodNameShape =
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
createViewboxDimensions w h =
    let
        width = String.fromInt (w)
        height = String.fromInt (h)
    in
        width ++ " " ++ height
