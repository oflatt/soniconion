module DrawToolbar exposing (drawToolbar, ToolResult)

import BuiltIn exposing (allBuiltInAsFunction)
import Model exposing (..)
import DrawFunc
import ViewStructure exposing (getViewStructure)
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

type alias ToolResult =
    {width : Int
    ,height : Int
    ,svg: Svg Msg}
        
drawToolbar : Onion -> MouseState -> Int -> Int -> ToolResult
drawToolbar onion mouseState svgWindowWidth svgWindowHeight =
    let viewStructure = (getViewStructure allBuiltInAsFunction mouseState
                             svgWindowWidth svgWindowHeight 0 0 Nothing True)
    in
        (ToolResult
             viewStructure.funcWidth
             viewStructure.funcHeight
             (DrawFunc.drawFuncWithConnections 
                  viewStructure)) 
