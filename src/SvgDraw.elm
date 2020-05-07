module SvgDraw exposing (drawBuiltIn, errorSvgNode, drawConnector, drawNode, drawTextInput,
                             nodeEvent, drawNodeWithEvent, svgTranslate, svgLeftClick, svgRightClick)

import Model exposing (..)
import BuiltIn exposing (builtInFunctions, ArgList)
import ViewVariables exposing (blockHeight, blockSpacing)
import Utils


import ViewPositions exposing (BlockPositions, ViewStructure, InputPosition, BlockPosition, LineRouting)

import Json.Decode as Json
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
drawBuiltIn: Call -> Int -> ViewStructure -> (Svg Msg)
drawBuiltIn call index viewStructure =
    let get = Dict.get call.functionName builtInFunctions
    in
        case get of
            Just names ->
                functionNameshape call viewStructure
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

drawTextInput : Call -> String -> List (Svg.Attribute Msg) -> InputPosition -> Int -> Int -> String -> (Svg Msg)
drawTextInput call str events inputPos ypos index domId =
    Svg.foreignObject
        (events ++
             [x (String.fromInt (Tuple.first inputPos))
             ,y (String.fromInt (ypos - (ViewVariables.inputHeight//2)))
             ,width (String.fromInt (Tuple.second inputPos))
             ,height (String.fromInt (ViewVariables.inputHeight))])
        [toUnstyled
             (input
                  [Html.Styled.Attributes.value str
                  ,Html.Styled.Events.onInput (InputUpdate call.id index)
                  ,Html.Styled.Attributes.id domId
                  ,onFocus (InputHighlight call.id index)
                  ,css [Css.fontFamily Css.monospace
                       ,Css.fontSize (Css.pct (100*ViewVariables.inputFontSizePercent))
                       ,Css.width
                            (Css.calc (Css.pct 100) Css.minus (Css.px 4))
                       ,Css.height
                            (Css.calc (Css.pct 100) Css.minus (Css.px 4))
                       ,Css.backgroundColor
                            (case Dict.get str BuiltIn.builtInVariables of
                                 Just val -> ViewVariables.textInputColorVariable
                                 Nothing -> ViewVariables.textInputColor)
                       ,Css.textAlign Css.center
                       ,Css.padding (px 0)
                       ,Css.border (px 2)]]
                  [])]


nodeEvent inputPos ypos event domId =
    Svg.foreignObject
        [x (String.fromInt (Tuple.first inputPos))
        ,y (String.fromInt ypos)
        ,width (String.fromInt ViewVariables.nodeRadius)
        ,height (String.fromInt ViewVariables.nodeRadius)]
        [toUnstyled
             (div
              [Html.Styled.Attributes.tabindex 0
              ,Html.Styled.Attributes.id domId
              ,(onFocus event)]
             [])]

drawNode inputPosition ypos events isHighlighted =
    (circle (events ++
                 [r (String.fromInt ((Tuple.second inputPosition)//2))
                 , cx (String.fromInt ((Tuple.first inputPosition)+((Tuple.second inputPosition)//2)))
                 , cy (String.fromInt ypos)
                 , fill (if isHighlighted then "blue" else "black")])
         [])

        
-- nodes has inputs underneath them so that they can be tabbed
drawNodeWithEvent inputPos ypos events highlightevent eventId isHighlighted =
    Svg.g
        []
        [
         nodeEvent inputPos ypos highlightevent eventId
        ,drawNode inputPos ypos events isHighlighted
        ]

        
        
drawNames l = []
                  

svgTranslate xpos ypos =
    transform ("translate(" ++ (String.fromInt xpos) ++ "," ++ (String.fromInt  ypos) ++ ")")

alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
  (msg, True)

createLeftDecoder : Msg -> Int -> Json.Decoder Msg
createLeftDecoder msg button =
    if button == 0
    then (Json.succeed msg)
    else (Json.succeed NoOp)
      
checkLeftDecoder : Msg -> Json.Decoder Msg
checkLeftDecoder msg =
    (Json.field "button" Json.int)
        |> Json.andThen (createLeftDecoder msg)
      
svgLeftDecoder : Msg -> Json.Decoder (Msg, Bool)
svgLeftDecoder msg =
    (Json.map alwaysPreventDefault (checkLeftDecoder msg))
      
svgLeftClick msg =
    Svg.Events.preventDefaultOn "mousedown" (svgLeftDecoder msg)
svgRightClick msg =
    Svg.Events.preventDefaultOn "contextmenu" (Json.map alwaysPreventDefault (Json.succeed msg))


-- shape for functionName objects
functionNameshape: Call -> ViewStructure -> (Svg Msg)
functionNameshape call viewStructure =
    case Dict.get call.id viewStructure.blockPositions of
        Just blockPos ->
            Svg.node "g"
                ((svgTranslate blockPos.xpos blockPos.ypos) ::
                     (if viewStructure.isToolbar
                      then
                          [(svgLeftClick (SpawnBlock call.functionName))]
                      else
                          [(svgLeftClick (BlockClick call.id))]))
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
                , svgText (ViewVariables.blockWidth // 2) (ViewVariables.blockHeight // 2) call.functionName ViewVariables.funcNameFontHeight "white"
                ]
        Nothing ->
            errorSvgNode "function call without block pos"
                        

drawConnector : Call -> BlockPosition -> Int -> BlockPosition -> Svg.Attribute Msg -> Bool -> Maybe Int -> Svg Msg
drawConnector call blockPos inputCounter otherBlockPos inputEvent isLineHighlighted routing =
    case routing of
        Nothing -> (errorSvgNode "got nothing where expected routing")
        Just routeOffset ->
            let lineX =
                    if routeOffset < 0
                    then otherBlockPos.xpos + ViewVariables.lineXSpace * routeOffset
                    else
                        if routeOffset > 0
                        then otherBlockPos.xpos + ViewVariables.lineXSpace * routeOffset + ViewVariables.blockWidth
                        else otherBlockPos.xpos + ViewVariables.outputNodeX
                lastY =
                    (blockPos.ypos + ViewVariables.nodeRadius)
                    - (ViewVariables.lineSpaceBeforeBlock * (1 + (ViewPositions.countOutputsBefore call.inputs inputCounter)))
                nodeX =
                    case (Dict.get inputCounter blockPos.inputPositions ) of
                        Just inputPos -> (Tuple.first inputPos) + ViewVariables.nodeRadius
                        Nothing -> -100 -- something went wrong
                linepoints =
                    [
                     (otherBlockPos.xpos + ViewVariables.outputNodeX)
                    ,(otherBlockPos.ypos + ViewVariables.outputNodeY)
                    -- just below
                    ,(otherBlockPos.xpos + ViewVariables.outputNodeX)
                    ,(otherBlockPos.ypos + ViewVariables.outputNodeY) + ViewVariables.lineSpaceBeforeBlock
                    -- to right or left
                    ,lineX
                    ,(otherBlockPos.ypos + ViewVariables.outputNodeY) + ViewVariables.lineSpaceBeforeBlock
                    -- down to other block
                    ,lineX
                    ,lastY
                    -- above node by inputcounter spacing
                    ,(nodeX + blockPos.xpos)
                    ,lastY
                        
                    -- on block node
                    ,(nodeX + blockPos.xpos)
                    ,(blockPos.ypos + ViewVariables.nodeRadius)
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
    
