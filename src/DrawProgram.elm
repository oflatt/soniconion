module DrawProgram exposing (drawProgram)
import Model exposing (..)
import ViewPositions exposing (BlockPositions)
import ViewVariables
import SvgDraw


import Browser

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)

import Dict exposing (Dict)
import Array exposing (Array)


import Svg exposing (..)
import Svg.Attributes exposing (..)


import Html.Events exposing (onInput)

import Svg.Events

import Debug exposing (log)

-- function for draw call objects

drawCall: Call -> Int -> Dict Id Int -> BlockPositions -> (Svg Msg)
drawCall call counter idToPos blockPositions =
    (Svg.g
         [Svg.Events.onMouseDown (Clicked call.id)]
         [SvgDraw.drawBuiltIn call counter idToPos blockPositions])

      
idToPosition func dict pos =
    case func of
        [] -> dict
        (e::es) -> idToPosition es
                   (Dict.insert e.id pos dict)
                   (pos + 1)

drawOutputLine id blockPos inputCounter idToPos blockPositions =
    case Dict.get id idToPos of
        Nothing -> SvgDraw.errorSvgNode
        Just otherBlockIndex ->
            case Array.get otherBlockIndex blockPositions of
                Nothing -> SvgDraw.errorSvgNode
                Just otherBlockPos ->
                    SvgDraw.drawConnector blockPos inputCounter otherBlockPos
                       
drawInput input blockPos inputCounter idToPos blockPositions =
    case input of
        Output id -> drawOutputLine id blockPos inputCounter idToPos blockPositions
        Const c -> SvgDraw.errorSvgNode
        Hole -> SvgDraw.errorSvgNode
                       
drawInputLines inputs blockPos inputCounter idToPos blockPositions =
    case inputs of
        [] -> []
        (input::rest) -> (drawInput input blockPos inputCounter idToPos blockPositions) :: (drawInputLines rest blockPos (inputCounter + 1) idToPos blockPositions)

    
drawCallLines call counter idToPos blockPositions =
    case Array.get counter blockPositions of
        Just blockPos ->
            drawInputLines call.inputs blockPos 0 idToPos blockPositions
        Nothing ->
            [SvgDraw.errorSvgNode]

                       
drawLines func counter idToPos blockPositions =
    case func of
        [] -> []
        (call::calls) -> (drawCallLines call counter idToPos blockPositions) ++ (drawLines calls (counter+1) idToPos blockPositions)

-- function for drawing function records
drawFunc: Function -> Int -> Dict Id Int -> BlockPositions -> List (Svg Msg)
drawFunc func counter idToPos blockPositions =
  case func of
    [] -> []
    (call::calls) -> (drawCall call counter idToPos blockPositions) :: (drawFunc calls (counter + 1) idToPos blockPositions)

drawFuncWithConnections: Function -> Dict Id Int -> BlockPositions -> Svg Msg
drawFuncWithConnections func idToPos blockPositions =
    Svg.g
        []
        [Svg.g [] (drawFunc func 0 idToPos blockPositions)
        ,Svg.g [] (drawLines func 0 idToPos blockPositions)]

-- function for drawing the onion
drawOnion: Onion -> MouseState -> Int -> Int -> List (Svg Msg)
drawOnion onion mouseState svgWindowWidth svgWindowHeight = 
  case onion of
    [] -> []
    (func::funcs) ->
        let blockPositions = ViewPositions.getBlockPositions func mouseState svgWindowWidth svgWindowHeight
        in
            (drawFuncWithConnections func
                 (idToPosition func Dict.empty 0)
                 blockPositions) ::
            (drawOnion funcs mouseState svgWindowWidth svgWindowHeight)


                     
drawProgram : Onion -> MouseState -> Int -> Int -> Html Msg
drawProgram program mouseState svgWindowWidth svgWindowHeight =
    let viewportHeight = (ViewPositions.getViewportHeight svgWindowWidth svgWindowHeight)
    in
        fromUnstyled
        (Svg.svg
             [ Svg.Attributes.width(String.fromInt svgWindowWidth) -- define the width of the svg
             , Svg.Attributes.height(String.fromInt svgWindowHeight) -- define the height of the svg
             , Svg.Attributes.viewBox("0 0 " ++ (ViewPositions.createViewboxDimensions ViewVariables.viewportWidth viewportHeight)) -- define the viewbox
             , display "inline-block"
             ]
             (drawOnion program mouseState svgWindowWidth svgWindowHeight))
