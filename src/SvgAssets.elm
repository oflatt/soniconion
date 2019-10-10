module SvgAssets exposing (..)


import Model exposing (..)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Dict exposing (Dict)


import Svg exposing (..)
import Svg.Attributes exposing (..)

-- function for drawing builtIns
drawBuiltIn: BuiltIn -> Int -> Dict Id Int -> (Svg msg)
drawBuiltIn builtIn counter idToPos =
    let get = Dict.get builtIn.waveType builtInFunctions
    in
        case get of
            Just names ->
                functionNameshape builtIn.waveType (counter * blockSpacing) names idToPos builtIn.inputs
            Nothing ->
                functionNameshape builtIn.waveType (counter * blockSpacing) (Finite []) idToPos builtIn.inputs

blockHeight = 100
blockSpacing = 150
paddingSize = 20
viewportWidth = 600
viewportHeight = 600

                 
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
functionNameshape: String -> Int -> ArgList -> Dict Id Int -> List Input -> (Svg msg)
functionNameshape name yPos argList idToPos inputs =
  Svg.node "g"
      [
       transform ("translate(" ++ "30," ++(String.fromInt (paddingSize + yPos) ++ ")"))
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
