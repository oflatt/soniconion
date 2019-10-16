module SvgDraw exposing (drawBuiltIn, errorSvgNode, drawConnector, drawNode)

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



drawNode xpos ypos =
    (circle [r (String.fromInt ViewVariables.nodeRadius)
            , cx (String.fromInt xpos)
            , cy (String.fromInt ypos)
            , fill "black"] [])
                      
            
        
drawNames l = []
        

                    
-- shape for functionName objects
functionNameshape: String -> Int -> ArgList -> Dict Id Int -> List Input -> BlockPositions -> (Svg msg)
functionNameshape name index argList idToPos inputs blockPositions =
    case Array.get index blockPositions of
        Just blockPos ->
            Svg.node "g"
                [
                 transform ("translate(" ++ (String.fromInt (Tuple.first blockPos)) ++ "," ++ (String.fromInt  (Tuple.second blockPos)) ++ ")")
                ]
                 [
                  rect
                      [ x "0"
                      , y (String.fromInt ViewVariables.nodeRadius)
                      , width (String.fromInt (ViewVariables.blockWidth))
                      , height (String.fromInt (blockHeight-(ViewVariables.nodeRadius*2))) -- room for dots
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
                 , drawNode ViewVariables.outputNodeX ViewVariables.outputNodeY
                 ]
        Nothing ->
            errorSvgNode


                
drawConnector blockPos inputCounter otherBlockPos =
    taxiLine
    ((Tuple.first otherBlockPos) + ViewVariables.outputNodeX)
    ((Tuple.second otherBlockPos) + ViewVariables.outputNodeY)
    ((ViewVariables.indexToNodeX inputCounter) + (Tuple.first blockPos))
    ((Tuple.second blockPos) + ViewVariables.nodeRadius)
                   

taxiLine: Int -> Int -> Int -> Int -> Svg msg
taxiLine x1 y1 x2 y2 =
          Svg.node "g" []
              [makeLine x1 y1 x2 y1,
               makeLine x2 y1 x2 y2,
               drawNode x2 y2]
    
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
