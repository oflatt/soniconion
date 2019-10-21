module SvgDraw exposing (drawBuiltIn, errorSvgNode, drawConnector, drawNode, drawConst)

import Model exposing (..)
import ViewVariables exposing (blockHeight, blockSpacing)
import Utils


import ViewPositions exposing (BlockPositions)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)

import Dict exposing (Dict)
import Array exposing (Array)

import Svg exposing (..)
import Svg.Attributes exposing (..)
import Svg.Events

errorSvgNode errorMsg=
    Svg.node "g"
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
        ,text_
             [x "0"
             ,y "50"
             ,fill "white"
             ,stroke "white"]
             [Svg.text errorMsg]
        ]
        
-- function for drawing builtIns
drawBuiltIn: Call -> Int -> BlockPositions -> (Svg Msg)
drawBuiltIn call index blockPositions=
    let get = Dict.get call.waveType builtInFunctions
    in
        case get of
            Just names ->
                functionNameshape call.waveType names call.inputs blockPositions call.id
            Nothing ->
                errorSvgNode "call without block position"


drawConst const xpos ypos =
    Svg.g
        []
        [rect [x (String.fromInt (xpos-ViewVariables.nodeRadius*2))
              ,y (String.fromInt (ypos-ViewVariables.nodeRadius))
              ,width (String.fromInt (ViewVariables.nodeRadius * 4))
              ,height (String.fromInt (ViewVariables.nodeRadius * 2))
              ,fill "white"
              ,stroke "black"]
             []
        ,text_
            [x (String.fromInt xpos)
            ,y (String.fromInt ypos)
            ,textAnchor "middle"
            ,dominantBaseline "central"
            ,fontSize (String.fromInt ViewVariables.nodeRadius)]
            [Svg.text (String.fromFloat const)]]
    

drawNode xpos ypos event isHighlighted =
    if isHighlighted
    then
        (circle [r (String.fromInt ViewVariables.nodeRadius)
            , cx (String.fromInt xpos)
            , cy (String.fromInt ypos)
            , fill "blue"
            , event] [])
    else
        (circle [r (String.fromInt ViewVariables.nodeRadius)
            , cx (String.fromInt xpos)
            , cy (String.fromInt ypos)
            , fill "black"
            , event] [])
    
                      
            
        
drawNames l = []
        

                    
-- shape for functionName objects
functionNameshape: String -> ArgList -> List Input -> BlockPositions -> Id -> (Svg Msg)
functionNameshape name argList inputs blockPositions id =
    case Dict.get id blockPositions of
        Just blockPos ->
            Svg.node "g"
                [(Svg.Events.onMouseDown (BlockClick id))
                ,transform ("translate(" ++ (String.fromInt (Tuple.first blockPos)) ++ "," ++ (String.fromInt  (Tuple.second blockPos)) ++ ")")]
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
                ]
        Nothing ->
            errorSvgNode "function call without block pos"
                        
                        
                        
drawConnector blockPos inputCounter otherBlockPos inputEvent isLineHighlighted =
    taxiLine
    ((Tuple.first otherBlockPos) + ViewVariables.outputNodeX)
    ((Tuple.second otherBlockPos) + ViewVariables.outputNodeY)
    ((ViewVariables.indexToNodeX inputCounter) + (Tuple.first blockPos))
    ((Tuple.second blockPos) + ViewVariables.nodeRadius)
    inputEvent
    isLineHighlighted
                   

taxiLine: Int -> Int -> Int -> Int -> Svg.Attribute msg -> Bool -> Svg msg
taxiLine x1 y1 x2 y2 inputEvent isLineHighlighted =
    let color =
            if isLineHighlighted
            then "blue"
            else "black"
    in
        polyline
        [points (Utils.listToStringList [x1, y1, x1, y2, x2, y2])
        ,stroke color
        ,fill "none"
        ,strokeWidth "5"
        ,strokeLinecap "round"
        ,inputEvent]
        []
    
