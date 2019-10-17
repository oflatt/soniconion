module SvgDraw exposing (drawBuiltIn, errorSvgNode, drawConnector, drawNode)

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
drawBuiltIn: Call -> Int -> Dict Id Int -> BlockPositions -> (Svg Msg)
drawBuiltIn call index idToPos blockPositions=
    let get = Dict.get call.waveType builtInFunctions
    in
        case get of
            Just names ->
                functionNameshape call.waveType index names idToPos call.inputs blockPositions call.id
            Nothing ->
                errorSvgNode



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
functionNameshape: String -> Int -> ArgList -> Dict Id Int -> List Input -> BlockPositions -> Id -> (Svg Msg)
functionNameshape name index argList idToPos inputs blockPositions id =
    case Array.get index blockPositions of
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
            errorSvgNode
                        
                        
                        
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
    
