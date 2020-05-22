module SvgDraw exposing (drawBuiltIn, errorSvgNode, drawConnector, drawNode, drawTextInput,
                             nodeEvent, drawNodeWithEvent, svgTranslate, svgClickEvents,
                             nodeEvents, drawBlockNameInput, drawFuncHeader, svgTextInput,
                             headerEvents)

import Model exposing (..)
import BuiltIn exposing (builtInFunctions, ArgList)
import ViewVariables exposing (blockHeight, blockSpacing)
import Utils
import Update

import ViewPositions exposing (BlockPositions, ViewStructure, InputPosition, BlockPosition)
import LineRouting exposing (LineRouting)

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
        


    
        
drawBuiltIn: Call -> Int -> ViewStructure -> (Svg Msg)
drawBuiltIn call index viewStructure =
    drawBlock call viewStructure


svgText xpos ypos textIn fontSizeIn fillIn =
    text_
    [x (String.fromInt xpos)
    ,y (String.fromInt ypos)
    ,textAnchor "start"
    ,fontFamily "monospace"
    ,dominantBaseline "central"
    ,fontSize (String.fromInt fontSizeIn)
    ,pointerEvents "none"
    ,Svg.Attributes.cursor "default"
    ,Svg.Attributes.style "user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;"
    ,fill fillIn]
    [Svg.text textIn]


svgTextInput: String -> Int -> Int -> Int -> Int -> Msg -> (String ->  Msg) -> Css.ColorValue compatible -> List (Svg.Attribute Msg) -> String -> (Svg Msg)
svgTextInput str xpos ypos w h onFocusEvent onInputEvent backgroundColor events domId =
    Svg.foreignObject
        (events ++
             [x (String.fromInt xpos)
             ,y (String.fromInt ypos)
             ,width (String.fromInt w)
             ,height (String.fromInt h)])
        [toUnstyled
             (input
                  [Html.Styled.Attributes.value str
                  ,Html.Styled.Events.onInput onInputEvent
                  ,Html.Styled.Attributes.id domId
                  ,onFocus onFocusEvent
                  ,css [Css.fontFamily Css.monospace
                       ,Css.fontSize (Css.px ((toFloat h)*ViewVariables.inputFontSizePercent))
                       ,Css.width
                            (Css.pct 100)
                       ,Css.height
                            (Css.pct 100)
                       ,Css.boxSizing Css.borderBox
                       ,Css.backgroundColor backgroundColor
                       ,Css.textAlign Css.center
                       ,Css.padding (px 0)
                       ,Css.border (px 2)]]
                  [])]
        
drawTextInput : Call -> String -> List (Svg.Attribute Msg) -> Int -> InputPosition -> Int -> Int -> String -> (Svg Msg)
drawTextInput call str events xpos inputPos ypos index domId =
    svgTextInput
        str
        ((Tuple.first inputPos)+xpos)
        (ypos - (ViewVariables.inputHeight//2))
        (Tuple.second inputPos)
        ViewVariables.inputHeight
        (InputHighlight call.id index)
        (InputUpdate call.id index)
        (case Dict.get str BuiltIn.builtInVariables of
             Just val -> ViewVariables.textInputColorVariable
             Nothing -> ViewVariables.textInputColor)
        events
        domId

nodeEvent xpos inputPos ypos event domId =
    Svg.foreignObject
        [x (String.fromInt ((Tuple.first inputPos)+xpos))
        ,y (String.fromInt ypos)
        ,width (String.fromInt ViewVariables.nodeRadius)
        ,height (String.fromInt ViewVariables.nodeRadius)]
        [toUnstyled
             (div
              [Html.Styled.Attributes.tabindex 0
              ,Html.Styled.Attributes.id domId
              ,(onFocus event)]
             [])]

drawNode xpos inputPosition ypos events isHighlighted =
    (circle (events ++
                 [r (String.fromInt ((Tuple.second inputPosition)//2))
                 , cx (String.fromInt ((Tuple.first inputPosition)+((Tuple.second inputPosition)//2) + xpos))
                 , cy (String.fromInt ypos)
                 , fill (if isHighlighted then "blue" else "black")])
         [])

        
-- nodes has inputs underneath them so that they can be tabbed
drawNodeWithEvent xpos inputPos ypos events highlightevent eventId isHighlighted =
    Svg.g
        []
        [
         nodeEvent xpos inputPos ypos highlightevent eventId
        ,drawNode xpos inputPos ypos events isHighlighted
        ]

        
        
drawNames l = []
                  

svgTranslate xpos ypos =
    transform ("translate(" ++ (String.fromInt xpos) ++ "," ++ (String.fromInt  ypos) ++ ")")

alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
  (msg, True)

createLeftDecoder : Msg -> Msg -> Int -> Json.Decoder Msg
createLeftDecoder msgLeft msgRight button =
    case button of
        0 -> (Json.succeed msgLeft)
        2 -> (Json.succeed msgRight)
        _ -> Json.succeed msgLeft
      
checkLeftDecoder : Msg -> Msg -> Json.Decoder Msg
checkLeftDecoder msgLeft msgRight =
    (Json.field "button" Json.int)
        |> Json.andThen (createLeftDecoder msgLeft msgRight)
      
svgClickPrevent : Msg -> Msg -> Json.Decoder (Msg, Bool)
svgClickPrevent msgLeft msgRight =
    (Json.map alwaysPreventDefault (checkLeftDecoder msgLeft msgRight))
    
svgClickEvents leftClickEvent rightClickEvent =
    [Svg.Events.preventDefaultOn "contextmenu" (Json.map alwaysPreventDefault (Json.succeed NoOp))
    ,Svg.Events.preventDefaultOn "mousedown" (svgClickPrevent leftClickEvent rightClickEvent)]

svgClickWithDefault leftClickEvent rightClickEvent =
    [Svg.Events.preventDefaultOn "contextmenu" (Json.map alwaysPreventDefault (Json.succeed NoOp))
    ,Svg.Events.on "mousedown" (checkLeftDecoder leftClickEvent rightClickEvent)]

blockNameEvents call viewStructure =
    if viewStructure.isToolbar
    then
        svgClickEvents (SpawnBlock call.functionName) (SpawnBlock call.functionName)
    else
        svgClickWithDefault (BlockNameClick call.id) (BlockClick call.id)

nodeEvents call viewStructure inputCounter =
    if viewStructure.isToolbar
    then
        []
    else
        svgClickEvents (InputClick call.id inputCounter) (InputRightClick call.id inputCounter)

headerEvents inputCounter viewStructure =
    if viewStructure.isToolbar
    then
        []
    else
        svgClickEvents (HeaderOutputClick viewStructure.id inputCounter) (HeaderOutputRightClick viewStructure.id inputCounter)
            
        
-- shape for functionName objects
drawBlock: Call -> ViewStructure -> (Svg Msg)
drawBlock call viewStructure =
    case Dict.get call.id viewStructure.blockPositions of
        Just blockPos ->
            (rect
                 ((if viewStructure.isToolbar
                   then
                       svgClickEvents (SpawnBlock call.functionName) (SpawnBlock call.functionName)
                   else
                       svgClickEvents (BlockClick call.id) (BlockClick call.id))
                      ++
                      [(svgTranslate blockPos.xpos blockPos.ypos)
                      ,x "0"
                      , y (String.fromInt ViewVariables.nodeRadius)
                      , width (String.fromInt blockPos.width)
                      , height (String.fromInt (blockHeight-(ViewVariables.nodeRadius*2))) -- room for dots
                      , fill ViewVariables.blockColor
                      , stroke ViewVariables.blockColor
                      , rx (String.fromInt ViewVariables.nodeRadius)
                      , ry (String.fromInt ViewVariables.nodeRadius)
                      ])
                 [])
                
        Nothing ->
            errorSvgNode "function call without block pos"


drawFuncHeader : Function -> ViewStructure -> (Svg Msg)
drawFuncHeader function viewStructure =
    Svg.g
        []
        [
         (ellipse
              [rx (String.fromInt (viewStructure.headerPos.width//2))
              ,ry (String.fromInt ViewVariables.functionHeaderSquareY)
              , cx (String.fromInt (viewStructure.headerPos.width//2))
              , cy (String.fromInt ViewVariables.functionHeaderSquareY)
              , fill ViewVariables.blockColor
              , stroke ViewVariables.blockColor]
             [])
         ,(rect
               [x "0"
               ,y (String.fromInt ViewVariables.functionHeaderSquareY)
               ,width (String.fromInt viewStructure.headerPos.width)
               ,height (String.fromInt (ViewVariables.functionHeaderHeight-ViewVariables.functionHeaderSquareY-ViewVariables.nodeRadius))
               ,fill ViewVariables.blockColor
               ,stroke ViewVariables.blockColor]
               [])]
                
drawBlockNameInput call viewStructure blockPos =
    (svgTextInput call.functionName
         (blockPos.xpos + ViewVariables.blockTextXPadding)
         ((ViewVariables.blockTextInputYpos) + blockPos.ypos)
         (blockPos.width - 2*ViewVariables.blockTextXPadding)
         (ViewVariables.blockTextInputHeight)
         (BlockNameHighlight call.id)
         (BlockNameUpdate call.id)
         Css.transparent
         (blockNameEvents call viewStructure)
         (Update.nodeNameId call.id))
                
        
                
drawConnector : Call -> BlockPosition -> Int -> (Int, Int) -> List (Svg.Attribute Msg) -> Bool -> Int -> ViewStructure -> Svg Msg
drawConnector call blockPos inputCounter otherBlockPos events isLineHighlighted routeOffset viewStructure =
    let otherBlockOutputX = (Tuple.first otherBlockPos)
        lineX =
            (if routeOffset < 0
             then ViewVariables.lineXSpace * routeOffset
             else
                 if routeOffset > 0
                 then ViewVariables.lineXSpace * routeOffset + viewStructure.funcBlockMaxWidth
                 else otherBlockOutputX)
        lastY =
            (blockPos.ypos + ViewVariables.nodeRadius)
            - (ViewVariables.lineSpaceBeforeBlock * (1 + (ViewPositions.countOutputsBefore call.inputs inputCounter)))
        nodeX =
            (case (Dict.get inputCounter blockPos.inputPositions ) of
                 Just inputPos -> (Tuple.first inputPos) + ViewVariables.nodeRadius + blockPos.xpos
                 Nothing -> -100) -- something went wrong
        linepoints =
            [
             otherBlockOutputX
            ,(Tuple.second otherBlockPos)
            -- just below
            ,otherBlockOutputX
            ,(Tuple.second otherBlockPos) + ViewVariables.lineSpaceBeforeBlock
            -- to right or left
            ,lineX
            ,(Tuple.second otherBlockPos) + ViewVariables.lineSpaceBeforeBlock
            -- down to other block
            ,lineX
            ,lastY
            -- above node by inputcounter spacing
            ,nodeX
            ,lastY
                
            -- on block node
            ,nodeX
            ,(blockPos.ypos + ViewVariables.nodeRadius)
            ]
    in
        taxiLine linepoints events isLineHighlighted
                        
                        
taxiLine: List Int -> List (Svg.Attribute Msg) -> Bool -> Svg Msg
taxiLine posList events isLineHighlighted =
    let color =
            if isLineHighlighted
            then "blue"
            else "black"
    in
        polyline
            (events ++
                 [points (Utils.listToStringList posList)
                 ,strokeLinejoin "round"
                 ,stroke color
                 ,fill "none"
                 ,strokeWidth ViewVariables.lineWidth
                 ,strokeLinecap "round"])
            []
    
