module DrawToolbar exposing (drawToolbar)

import BuiltIn exposing (allBuiltInAsFunction)
import Model exposing (..)
import DrawFunc
import ViewPositions
import ViewVariables

import Dict exposing (Dict)
import Array exposing (Array)

import Browser
import Html
import Html.Styled
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)
import Svg exposing (Svg)
import Svg.Attributes

        
drawToolbar : Onion -> MouseState -> Int -> Int -> Svg Msg
drawToolbar onion mouseState svgWindowWidth svgWindowHeight =
    (DrawFunc.drawFuncWithConnections
         (ViewPositions.getViewStructure allBuiltInAsFunction mouseState svgWindowWidth svgWindowHeight 0 0 True)
         mouseState)
