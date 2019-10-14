module SvgDraw exposing (drawBuiltIn, errorSvgNode, drawConnector)

import Model exposing (..)
import ViewVariables exposing (blockHeight, blockSpacing)


import ViewPositions exposing (BlockPositions)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)

import Dict exposing (Dict)
import Array exposing (Array)

import Svg exposing (..)
import Svg.Attributes exposing (..)

errorSvgNode = Svg.node "g"
               [
               ]
               [
                rect
                    [x "0"
                    ,y "0"
                    ,width "100"
                    ,height "100"
                    ,fill "red"
                    ,stroke "red"
                    ]
                    []
               ]

-- function for drawing builtIns
drawBuiltIn: Call -> Int -> Dict Id Int -> BlockPositions -> (Svg msg)
drawBuiltIn builtIn index idToPos blockPositions =
    let get = Dict.get builtIn.waveType builtInFunctions
    in
        case get of
            Just names ->
                functionNameshape builtIn.waveType index names idToPos builtIn.inputs blockPositions
            Nothing ->
                functionNameshape builtIn.waveType index (Finite []) idToPos builtIn.inputs blockPositions

mainShape =
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

drawDots : Int -> Int -> Int -> List (Svg msg)
drawDots num xpos ypos =
    if num <= 0
    then []
    else
        (circle [r (String.fromInt ViewVariables.nodeRadius)
                , cx (String.fromInt xpos)
                , cy (String.fromInt ypos)
                , fill "black"] []) :: (drawDots (num - 1) (xpos + ViewVariables.nodeSpacing) ypos)
            
        
drawNames l = []
        
getArgCircles argList ypos inputs =
    case argList of
        Infinite minArgCount -> drawDots ((Basics.max (List.length inputs) minArgCount) + 1) ViewVariables.nodeSpacing ypos
        Finite l -> (drawNames l) ++ (drawDots (List.length l) ViewVariables.nodeSpacing ypos)

                    
-- shape for functionName objects
functionNameshape: String -> Int -> ArgList -> Dict Id Int -> List Input -> BlockPositions -> (Svg msg)
functionNameshape name index argList idToPos inputs blockPositions =
    case Array.get index blockPositions of
        Just blockPos ->
            Svg.node "g"
                [
                 transform ("translate(" ++ (String.fromInt (Tuple.first blockPos)) ++ "," ++ (String.fromInt  (Tuple.second blockPos)) ++ ")")
                ]
                (
                 [
                  rect
                      [ x "0"
                      , y (String.fromInt ViewVariables.nodeRadius)
                      , width (String.fromInt (ViewVariables.blockWidth))
                      , height (String.fromInt (blockHeight-ViewVariables.nodeRadius)) -- room for dots
                      , fill ViewVariables.blockColor
                      , stroke ViewVariables.blockColor
                      , rx (String.fromInt ViewVariables.nodeRadius)
                      , ry (String.fromInt ViewVariables.nodeRadius)
                      ]
                      []
                 , text_
                      [ x (String.fromInt (ViewVariables.blockWidth // 2))
                      , y (String.fromInt (ViewVariables.blockHeight // 2))
                      , fill "white"
                      , fontSize (String.fromInt ViewVariables.blockSpacing)
                      , textAnchor "middle"
                      , dominantBaseline "central"
                      ]
                      [ Svg.text name
                      ]
                 ] ++ (getArgCircles argList ViewVariables.nodeRadius inputs))
        Nothing ->
            errorSvgNode


                
drawConnector blockPos inputCounter otherBlockPos =
    taxiLine (Tuple.first otherBlockPos) (Tuple.second otherBlockPos) (ViewVariables.nodeSpacing * (inputCounter + 1) + (Tuple.first blockPos)) ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                   

taxiLine: Int -> Int -> Int -> Int -> Svg msg
taxiLine x1 y1 x2 y2 =
          Svg.node "g" []
              [makeLine x1 y1 x2 y1,
               makeLine x2 y1 x2 y2]
    
makeLine mx1 my1 mx2 my2 =
  line
    [x1  (String.fromInt mx1)
    , y1  (String.fromInt my1)
    , x2  (String.fromInt mx2)
    , y2  (String.fromInt my2)
    , stroke  "blue"
    , strokeWidth  "5"
    , strokeLinecap  "round"
    ]
  []
