module SvgDraw exposing (drawBuiltIn, errorSvgNode, drawConnector, drawNode, drawTextInput,
                             nodeEvent, drawNodeWithEvent, svgTranslate)

import Model exposing (..)
import BuiltIn exposing (builtInFunctions, ArgList)
import ViewVariables exposing (blockHeight, blockSpacing)
import Utils


import ViewPositions exposing (BlockPositions)

import Css exposing (px)
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave, onFocus)

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
             ,stroke "white"
             ,pointerEvents "none"
             ,Svg.Attributes.cursor "default"]
             [Svg.text errorMsg]
        ]
        
-- function for drawing builtIns
drawBuiltIn: Call -> Int -> BlockPositions -> (Svg Msg)
drawBuiltIn call index blockPositions =
    let get = Dict.get call.functionName builtInFunctions
    in
        case get of
            Just names ->
                functionNameshape call.functionName names call.inputs blockPositions call.id
            Nothing ->
                errorSvgNode ("not a built in function " ++ call.functionName)


svgText xpos ypos textIn fontSizeIn fillIn =
    text_
    [x (String.fromInt xpos)
    ,y (String.fromInt ypos)
    ,textAnchor "middle"
    ,dominantBaseline "central"
    ,fontSize (String.fromInt fontSizeIn)
    ,pointerEvents "none"
    ,Svg.Attributes.cursor "default"
    ,Svg.Attributes.style "user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;"
    ,fill fillIn]
    [Svg.text textIn]

drawTextInput : String -> Int -> Int -> Id -> Int -> String -> (Svg Msg)
drawTextInput str xpos ypos id index domId =
    Svg.foreignObject
        [x (String.fromInt (xpos - (ViewVariables.inputWidth//2)))
        ,y (String.fromInt (ypos-(ViewVariables.inputHeight//2)))
        ,width (String.fromInt ViewVariables.inputWidth)
        ,height (String.fromInt (ViewVariables.inputHeight))]
        [toUnstyled
             (input
                  [Html.Styled.Attributes.value str
                  ,Html.Styled.Events.onInput (InputUpdate id index)
                  ,Html.Styled.Attributes.id domId
                  ,onFocus (InputHighlight id index)
                  ,onClick (InputClick id index)
                  ,css [Css.width
                            (px ((Basics.toFloat ViewVariables.inputWidth)-4.0))
                       ,Css.height
                            (px ((Basics.toFloat ViewVariables.inputHeight)-4.0))
                       ,Css.textAlign Css.center
                       ,Css.padding (px 0)
                       ,Css.border (px 2)]]
                  [])]


nodeEvent xpos ypos event domId =
    Svg.foreignObject
        [x (String.fromInt xpos)
        ,y (String.fromInt ypos)
        ,width (String.fromInt ViewVariables.nodeRadius)
        ,height (String.fromInt ViewVariables.nodeRadius)]
        [toUnstyled
             (div
              [Html.Styled.Attributes.tabindex 0
              ,Html.Styled.Attributes.id domId
              ,(onFocus event)]
             [])]

drawNode xpos ypos event isHighlighted =
    (circle [r (String.fromInt ViewVariables.nodeRadius)
            , cx (String.fromInt xpos)
            , cy (String.fromInt ypos)
            , fill (if isHighlighted then "blue" else "black")
            , (Svg.Events.onMouseDown event)] [])

        
-- nodes has inputs underneath them so that they can be tabbed

drawNodeWithEvent xpos ypos event highlightevent eventId isHighlighted =
    Svg.g
        []
        [
         nodeEvent xpos ypos highlightevent eventId
        ,drawNode xpos ypos event isHighlighted
        ]

        
        
drawNames l = []
                  

svgTranslate xpos ypos =
    transform ("translate(" ++ (String.fromInt xpos) ++ "," ++ (String.fromInt  ypos) ++ ")")
                    
-- shape for functionName objects
functionNameshape: String -> ArgList -> List Input -> BlockPositions -> Id -> (Svg Msg)
functionNameshape name argList inputs blockPositions id =
    case Dict.get id blockPositions of
        Just blockPos ->
            Svg.node "g"
                [(Svg.Events.onMouseDown (BlockClick id))
                ,svgTranslate (Tuple.first blockPos) (Tuple.second blockPos)]
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
                , svgText (ViewVariables.blockWidth // 2) (ViewVariables.blockHeight // 2) name ViewVariables.funcNameFontHeight "white"
                ]
        Nothing ->
            errorSvgNode "function call without block pos"
                        
                        
                        
drawConnector blockPos inputCounter otherBlockPos inputEvent isLineHighlighted routing =
    case routing of
        Nothing -> (errorSvgNode "got nothing where expected routing")
        Just routeOffset ->
            let lineX =
                    if routeOffset < 0
                    then (Tuple.first otherBlockPos) + ViewVariables.lineXSpace * routeOffset
                    else
                        if routeOffset > 0
                        then (Tuple.first otherBlockPos) + ViewVariables.lineXSpace * routeOffset + ViewVariables.blockWidth
                        else (Tuple.first otherBlockPos) + ViewVariables.outputNodeX
                linepoints =
                    [
                     ((Tuple.first otherBlockPos) + ViewVariables.outputNodeX)
                    ,((Tuple.second otherBlockPos) + ViewVariables.outputNodeY)
                    -- just below
                    ,((Tuple.first otherBlockPos) + ViewVariables.outputNodeX)
                    ,((Tuple.second otherBlockPos) + ViewVariables.outputNodeY) + ViewVariables.lineSpaceBeforeBlock
                    -- to right or left
                    ,lineX
                    ,((Tuple.second otherBlockPos) + ViewVariables.outputNodeY) + ViewVariables.lineSpaceBeforeBlock
                    -- down to other block
                    ,lineX
                    ,((Tuple.second blockPos) + ViewVariables.nodeRadius) - (ViewVariables.lineSpaceBeforeBlock * (1 + inputCounter))
                    -- above node by inputcounter spacing
                    ,((ViewVariables.indexToNodeX inputCounter) + (Tuple.first blockPos))
                    ,((Tuple.second blockPos) + ViewVariables.nodeRadius) - (ViewVariables.lineSpaceBeforeBlock * (1 + inputCounter))
                        
                    -- on block node
                    ,((ViewVariables.indexToNodeX inputCounter) + (Tuple.first blockPos))
                    ,((Tuple.second blockPos) + ViewVariables.nodeRadius)
                    ]
            in
                taxiLine
                linepoints
                inputEvent
                isLineHighlighted
                   

taxiLine: List Int -> Svg.Attribute msg -> Bool -> Svg msg
taxiLine posList inputEvent isLineHighlighted =
    let color =
            if isLineHighlighted
            then "blue"
            else "black"
    in
        polyline
        [points (Utils.listToStringList posList)
        ,strokeLinejoin "round"
        ,stroke color
        ,fill "none"
        ,strokeWidth ViewVariables.lineWidth
        ,strokeLinecap "round"
        ,inputEvent]
        []
    
