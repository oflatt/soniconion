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
functionNameshape counter =
  Svg.node "functionNameshape" []
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
createViewboxDimensions modelWidth modelHeight =
    let
        width = String.fromInt (600)
        height = String.fromInt (600)
    in
        width ++ " " ++ height

-- function for drawing waves
drawWave: Wave -> Int -> (Svg msg)
drawWave wave counter =
  functionNameshape counter

-- function for drawing play
drawPlay: Play -> Int -> (Svg msg)
drawPlay play counter =
  functionNameshape counter

-- function for drawing Expression objects
drawExpression: Expr -> Int -> (Svg msg)
drawExpression expr counter =
  case expr of
    WaveE wave -> drawWave wave counter
    PlayE play -> drawPlay play counter


-- function for draw call objects
drawCall: Call -> Int -> (Svg msg)
drawCall call counter = 
  drawExpression call.expr counter

-- function for drawin function objects
drawFunc: Function -> Int -> List (Svg msg)
drawFunc func counter = 
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter)::(drawFunc calls (counter + 1))

-- function for drawing the onion
drawOnion: Onion -> List (Svg msg)
drawOnion onion = 
  case onion of
    [] -> []
    (func::funcs) -> (drawFunc func 0) ++ (drawOnion funcs)

drawProgram : Model -> Int -> Int -> Html Msg
drawProgram model width height =
    fromUnstyled
    (Svg.svg
        [ Svg.Attributes.width(String.fromInt width) -- define the width of the svg
        , Svg.Attributes.height(String.fromInt height) -- define the height of the svg
        , Svg.Attributes.viewBox("0 0 " ++ createViewboxDimensions width height) -- define the viewbox
        , display "inline-block"
        ]
         -- (mainShape ++ functionNameshape ++ methodNameShape ++ lineVertical ++ lineHorizontal))
         (drawOnion model.program))
