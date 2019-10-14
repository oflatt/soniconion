module SvgAssets exposing (functionNameshape, drawBuiltIn, createViewboxDimensions, BlockPositions, BlockPos, getBlockPositions)


import Model exposing (..)
import ViewVariables exposing (blockHeight, blockSpacing)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Dict exposing (Dict)
import Array exposing (Array)


import Svg exposing (..)
import Svg.Attributes exposing (..)

-- skip index of -1 if 
type alias MovedBlockInfo = {skipIndex : Int,
                             movedIndex : Int,
                             movedPos : (Int, Int)}
noMovedBlock: MovedBlockInfo
noMovedBlock = (MovedBlockInfo -1 -1 (-1, -1))

mouseToSvgCoordinates: MouseState -> Int -> Int -> (Int, Int)
mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight =
    (mouseState.mouseX * ViewVariables.viewportWidth // svgScreenWidth
    ,(mouseState.mouseY - ViewVariables.svgYpos) * ViewVariables.viewportWidth // svgScreenWidth)

svgYposToIndex: Int -> Int
svgYposToIndex yPos =
    yPos // (blockHeight + blockSpacing)
    
getMovedInfo func mouseState index mouseSvgCoordinates =
    case func of
        [] -> noMovedBlock
        (call::calls) ->
            if mouseState.mousePressedp && (mouseState.selectedId == call.id)
            then
                let mPos = mouseSvgCoordinates
                in
                    (MovedBlockInfo (svgYposToIndex (Tuple.first mPos))
                         index
                         mPos)
            else
                getMovedInfo calls mouseState (index + 1) mouseSvgCoordinates

type alias BlockPos = (Int, Int)
type alias BlockPositions = Array BlockPos

indexToBlockPos indexPos =
    (100, indexPos * (ViewVariables.blockHeight + ViewVariables.blockSpacing))

-- index is the index in the list but indexPos is where to draw (used for skipping positions)
getAllBlockPositions: MovedBlockInfo -> Function -> MouseState -> Int -> Int -> List BlockPos
getAllBlockPositions moveInfo func mouseState index indexPos =
    case func of
        [] -> []
        (call::calls) ->
            if indexPos == moveInfo.skipIndex && index == moveInfo.movedIndex
            then
                moveInfo.movedPos :: (getAllBlockPositions moveInfo calls mouseState (index + 1) (indexPos + 1))
            else if indexPos == moveInfo.skipIndex
                 then
                     (getAllBlockPositions moveInfo func mouseState index (indexPos + 1))
                 else
                     if index == moveInfo.movedIndex
                         then
                             moveInfo.movedPos :: (getAllBlockPositions moveInfo calls mouseState (index + 1) indexPos)
                     else
                         (indexToBlockPos indexPos) :: (getAllBlockPositions moveInfo calls mouseState (index + 1) (indexPos + 1))
                      
getBlockPositions: Function -> MouseState -> Int -> Int -> BlockPositions
getBlockPositions func mouseState svgScreenWidth svgScreenHeight =
    let moveInfo = getMovedInfo func mouseState 0 (mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight)
    in
        Array.fromList (getAllBlockPositions moveInfo func mouseState 0 0)
        
            
-- function for drawing builtIns
drawBuiltIn: BuiltIn -> Int -> Dict Id Int -> BlockPositions -> (Svg msg)
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
        (circle [r "10"
                , cx (String.fromInt xpos)
                , cy (String.fromInt ypos)
                , fill "black"] []) :: (drawDots (num - 1) (xpos + 40) ypos)
            
        
drawNames l = []
        
getArgCircles argList ypos =
    case argList of
        Infinite min -> drawDots min 20 ypos
        Finite l -> (drawNames l) ++ (drawDots (List.length l) 20 ypos)
        
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
                      , y "20"
                      , width "200"
                      , height (String.fromInt (blockHeight-20))
                      , fill "red"
                      , stroke "red"
                      , strokeWidth "2"
                      , rx "10"
                      , ry "10"
                      ]
                      []
                 , text_
                      [ x "100"
                      , y "60"
                      , fill "white"
                      , fontSize "25"
                      , textAnchor "middle"
                      , dominantBaseline "central"
                      ]
                      [ Svg.text name
                      ]
                 ] ++ (getArgCircles argList 20) ++ (createLines inputs idToPos 20 20))
        Nothing ->
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
                ]


createLines inputs idToPos ypos xpos =
    case inputs of
        [] -> []
        (i::is) ->
            case (createLine i idToPos ypos xpos) of
                Nothing -> (createLines is idToPos ypos (xpos + 30))
                Just l -> l :: (createLines is idToPos ypos (xpos + 30))

idToLine: Id -> Dict Id Int -> Int -> Int -> Maybe (Svg msg)
idToLine id idToPos ypos xpos =
    let pos =
            Dict.get id idToPos
    in
        case pos of
            Nothing -> Nothing
            Just i ->
                Just (taxiLine 100 ((i-2) * blockSpacing + blockHeight) xpos ypos)
                   
createLine input idToPos ypos xpos =
    case input of
        Output id ->
            idToLine id idToPos ypos xpos
        Const c -> Nothing
        Hole -> Nothing


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
  

createViewboxDimensions w h =
    let
        width = String.fromInt (w)
        height = String.fromInt (h)
    in
        width ++ " " ++ height
