module SvgDraw exposing (drawCall, errorSvgNode, drawConnector, drawNode, drawTextInput,
                             nodeEvent, drawNodeWithEvent, svgTranslate, svgClickEvents,
                             nodeEvents, drawBlockNameInput, drawFuncHeader, svgTextInput,
                             drawStaff,
                             headerEvents, drawHeaderNameInput, headerEventsFinal, blockMouseOffset)

import Model exposing (..)
import BuiltIn exposing (builtInFunctions, ArgList)
import ViewVariables exposing (blockHeight, blockSpacing)
import Utils exposing (rgbToCss)

import ViewStructure exposing (BlockPositions, ViewStructure, InputPosition, BlockPosition, countOutputsBefore
                              ,mouseToSvgCoordinates)
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


svgTextInput: String -> Int -> Int -> Int -> Int -> Msg -> (String ->  Msg) -> Css.ColorValue compatible -> List (Svg.Attribute Msg) -> String -> ViewStructure -> (Svg Msg)
svgTextInput str xpos ypos w h onFocusEvent onInputEvent backgroundColor events domId viewStructure=
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
                  ,(if viewStructure.isToolbar then Html.Styled.Attributes.tabindex -1
                    else Html.Styled.Attributes.tabindex 0)
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
                       ,Css.border (px 2)
                       ,Css.position Css.absolute]]
                  [])]
        
drawTextInput : Block -> String -> List (Svg.Attribute Msg) -> Int -> InputPosition -> Int -> Int -> String ->
              ViewStructure -> (Svg Msg)
drawTextInput block str events xpos inputPos ypos index domId viewStructure =
    svgTextInput
        str
        ((Tuple.first inputPos)+xpos)
        (ypos - (ViewVariables.inputHeight//2))
        (Tuple.second inputPos)
        ViewVariables.inputHeight
        (InputHighlight (getId block) index)
        (InputUpdate (getId block) index)
        (case Dict.get str BuiltIn.builtInVariables of
             Just val -> ViewVariables.textInputColorVariable
             Nothing -> ViewVariables.textInputColor)
        events
        domId
        viewStructure

nodeEvent xpos inputPos ypos event domId viewStructure isTabable =
    Svg.foreignObject
        [x (String.fromInt ((Tuple.first inputPos)+xpos))
        ,y (String.fromInt ypos)
        ,width (String.fromInt ViewVariables.nodeRadius)
        ,height (String.fromInt ViewVariables.nodeRadius)]
        [toUnstyled
             (div
              [Html.Styled.Attributes.tabindex (if (viewStructure.isToolbar || (not isTabable)) then -1 else 0)
              ,Html.Styled.Attributes.id domId
              ,(onFocus event)]
             [])]

drawNode xpos inputPosition ypos events isHighlighted isHollow =
    let outerCircle =
            (circle
                 [r (String.fromInt ((Tuple.second inputPosition)//2))
                 , cx (String.fromInt ((Tuple.first inputPosition)+((Tuple.second inputPosition)//2) + xpos))
                 , cy (String.fromInt ypos)
                 , fill (if isHighlighted then "blue" else "black")]
                 [])
    in
        Svg.g
            events
            (if isHollow
             then
                 (let innerR = floor ((toFloat (Tuple.second inputPosition)) * 0.5 *
                                         (1-ViewVariables.hollowNodeOutlineProportion))
                  in
                      [outerCircle
                      ,(circle [r (String.fromInt innerR)
                               ,cx (String.fromInt ((Tuple.first inputPosition)+((Tuple.second inputPosition)//2) + xpos))
                               ,cy (String.fromInt ypos)
                               ,fill ViewVariables.holeGrey]
                            [])])
             else
                 [outerCircle])

        
-- nodes has inputs underneath them so that they can be tabbed
drawNodeWithEvent xpos inputPos ypos events highlightevent eventId isHighlighted viewStructure isHollow =
    Svg.g
        []
        [
         nodeEvent xpos inputPos ypos highlightevent eventId viewStructure (not isHollow)
        ,drawNode xpos inputPos ypos events isHighlighted isHollow
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

viewStructureToMouse viewStructure =
    mouseToSvgCoordinates viewStructure.mouseState viewStructure.svgWidth viewStructure.svgHeight 0 0
    
blockMouseOffset block viewStructure =
    let coordinates = viewStructureToMouse viewStructure
    in
        case Dict.get (getId block) viewStructure.blockPositions of
            Just blockPos -> ((Tuple.first coordinates)-blockPos.xpos-viewStructure.headerPos.xpos,
                                  ((Tuple.second coordinates)-blockPos.ypos-viewStructure.headerPos.ypos))
            Nothing -> (0, 0) -- should not happen
                       
functionMouseOffset function viewStructure =
    let coordinates = viewStructureToMouse viewStructure 
    in
        ((Tuple.first coordinates) - viewStructure.headerPos.xpos,
             (Tuple.second coordinates)- viewStructure.headerPos.ypos)
        

                       
blockNameEvents block viewStructure =
    let coordinates = blockMouseOffset block viewStructure
    in
        (if viewStructure.isToolbar
         then
             svgClickEvents (SpawnBlock block coordinates) (SpawnBlock block coordinates)
         else
             svgClickWithDefault (BlockNameClick block viewStructure.id coordinates)
                 (BlockNameClick block viewStructure.id coordinates))

headerNameEvents function viewStructure =
    if viewStructure.isToolbar
    then svgClickEvents (SpawnFunction "" (functionMouseOffset function viewStructure)) (SpawnFunction "" (functionMouseOffset function viewStructure))
    else
        svgClickWithDefault (HeaderNameClick function (functionMouseOffset function viewStructure))
            (HeaderClick function (functionMouseOffset function viewStructure))

headerBlockEvents function viewStructure =
    if viewStructure.isToolbar
    then svgClickEvents (SpawnFunction "" (functionMouseOffset function viewStructure)) (SpawnFunction "" (functionMouseOffset function viewStructure))
    else
        svgClickEvents (HeaderClick function (functionMouseOffset function viewStructure)) (HeaderClick function (functionMouseOffset function viewStructure))
            
nodeEvents block viewStructure inputCounter =
    if viewStructure.isToolbar
    then
        []
    else
        svgClickEvents (InputClick (getId block) inputCounter) (InputRightClick (getId block) inputCounter)

headerEvents inputCounter viewStructure =
    if viewStructure.isToolbar
    then
        []
    else
        svgClickEvents (HeaderOutputClick viewStructure.id inputCounter) (HeaderOutputRightClick viewStructure.id inputCounter)

headerEventsFinal inputCounter viewStructure =
    if viewStructure.isToolbar
    then
        []
    else
        svgClickEvents (HeaderAddOutput viewStructure.id inputCounter) (HeaderAddOutputRightClick viewStructure.id inputCounter)
            

drawStaff : Staff -> Int -> ViewStructure -> (Svg Msg)
drawStaff staff index viewStructure =
    case Dict.get staff.id viewStructure.blockPositions of
        Just blockPos ->
            (drawStaffAt viewStructure staff blockPos)
        Nothing -> errorSvgNode "staff without block pos"

drawStaffAt viewStructure staff blockPos =
    Svg.g []
          ((rect
                 ((if viewStructure.isToolbar
                   then
                       (svgClickEvents (SpawnBlock (StaffBlock staff) (blockMouseOffset (StaffBlock staff) viewStructure))
                            (SpawnBlock (StaffBlock staff) (blockMouseOffset (StaffBlock staff) viewStructure)))
                   else
                       svgClickEvents (BlockClick (StaffBlock staff) viewStructure.id (blockMouseOffset (StaffBlock staff) viewStructure))
                           (BlockClick (StaffBlock staff) viewStructure.id (blockMouseOffset (StaffBlock staff) viewStructure)))
                      ++
                      [(svgTranslate blockPos.xpos blockPos.ypos)
                      ,x "0"
                      , y "0"
                      , width (String.fromInt blockPos.width)
                      , height (String.fromInt (blockPos.height-(ViewVariables.nodeRadius))) -- room for dots
                      , fill (rgbToCss ViewVariables.staffBackgroundColor)
                      , stroke (rgbToCss ViewVariables.staffBackgroundColor)
                      , rx (String.fromInt ViewVariables.nodeRadius)
                      , ry (String.fromInt ViewVariables.nodeRadius)
                      ])
                 [])
            :: (drawHorizLines blockPos.xpos (blockPos.ypos + (((blockPos.height - ViewVariables.nodeRadius*2) * 3) // 10)) blockPos.width ((blockPos.height - ViewVariables.nodeRadius*2) // 10) 5))

drawHorizLines xpos ypos width spacing numLeft =
    case numLeft of
        0 -> []
        num ->
            ((Svg.line [x1 (String.fromInt xpos)
                  ,y1 (String.fromInt ypos)
                  ,x2 (String.fromInt (xpos+width)) 
                  ,y2 (String.fromInt ypos)
                  ,stroke "black"
                  ,strokeWidth (String.fromInt (ViewVariables.lineWidth // 4))] [])
                  :: (drawHorizLines xpos (ypos+spacing) width spacing (numLeft-1)))

drawCall: Call -> Int -> ViewStructure -> (Svg Msg)
drawCall call index viewStructure =
    case Dict.get call.id viewStructure.blockPositions of
        Just blockPos ->
            (rect
                 ((if viewStructure.isToolbar
                   then
                       (svgClickEvents (SpawnBlock (CallBlock call) (blockMouseOffset (CallBlock call) viewStructure))
                            (SpawnBlock (CallBlock call) (blockMouseOffset (CallBlock call) viewStructure)))
                   else
                       svgClickEvents (BlockClick (CallBlock call) viewStructure.id (blockMouseOffset (CallBlock call) viewStructure))
                           (BlockClick (CallBlock call) viewStructure.id (blockMouseOffset (CallBlock call) viewStructure)))
                      ++
                      [(svgTranslate blockPos.xpos blockPos.ypos)
                      ,x "0"
                      , y (String.fromInt ViewVariables.nodeRadius)
                      , width (String.fromInt blockPos.width)
                      , height (String.fromInt (blockPos.height-(ViewVariables.nodeRadius*2))) -- room for dots
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
        (headerBlockEvents function viewStructure)
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

drawBlockNameInput block viewStructure blockPos =
    case block of
        CallBlock call -> drawCallNameInput call viewStructure blockPos
        _ -> Svg.g [] []

drawCallNameInput call viewStructure blockPos =
    (svgTextInput call.functionName
         (blockPos.xpos + ViewVariables.blockTextXPadding)
         ((ViewVariables.blockTextInputYpos) + blockPos.ypos)
         (blockPos.width - 2*ViewVariables.blockTextXPadding)
         (ViewVariables.blockTextInputHeight)
         (BlockNameHighlight call.id)
         (BlockNameUpdate call.id)
         Css.transparent
         (blockNameEvents (CallBlock call) viewStructure)
         (nodeNameId call.id)
         viewStructure)

drawHeaderNameInput function viewStructure =
    (svgTextInput function.name
         ViewVariables.blockTextXPadding
         (ViewVariables.functionHeaderSquareY + ViewVariables.nodeRadius)
         (viewStructure.headerPos.width - 2*ViewVariables.blockTextXPadding)
         (ViewVariables.blockTextInputHeight)
         (HeaderNameHighlight viewStructure.id)
         (HeaderNameUpdate viewStructure.id)
         Css.transparent
         (headerNameEvents function viewStructure)
         (headerNameId viewStructure.id)
         viewStructure)

        
                
drawConnector : Block -> BlockPosition -> Int -> (Int, Int) -> List (Svg.Attribute Msg) -> Bool -> Int -> ViewStructure -> Int -> Svg Msg
drawConnector block blockPos inputCounter otherBlockPos events isLineHighlighted routeOffset viewStructure topOffset =
    let otherBlockOutputX = (Tuple.first otherBlockPos)
        topY = (Tuple.second otherBlockPos) + ViewVariables.lineSpaceBeforeBlock * topOffset
        lineX =
            (if routeOffset < 0
             then ViewVariables.lineXSpace * routeOffset
             else
                 if routeOffset > 0
                 then ViewVariables.lineXSpace * routeOffset + viewStructure.funcBlockMaxWidth
                 else otherBlockOutputX)
        lastY =
            (blockPos.ypos + ViewVariables.nodeRadius)
            - (ViewVariables.lineSpaceBeforeBlock * (1 + (countOutputsBefore (getInputs block) inputCounter)))
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
            ,topY
            -- to right or left
            ,lineX
            ,topY
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
                 ,strokeWidth (String.fromInt ViewVariables.lineWidth)
                 ,strokeLinecap "round"])
            []
    
