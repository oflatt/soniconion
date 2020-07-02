module DrawToolbar exposing (drawToolbar, ToolResult)

import BuiltIn exposing (allBuiltInAsFunction)
import Model exposing (..)
import DrawFunc
import Utils exposing  (rgbToCss, darken)
import ViewStructure exposing (getViewStructure, maybeMovedInfo)
import ViewVariables exposing (toolbarPadding, toolbarBackgroundColor)

import Dict exposing (Dict)
import Array exposing (Array)

import Browser
import Html
import Html.Styled
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)
import Svg exposing (Svg)
import Svg.Attributes exposing (width, height, fill)

type alias ToolResult =
    {width : Int
    ,height : Int
    ,svg: Svg Msg
    ,usedMoveInfo: Bool}
        
drawToolbar : Onion -> MouseState -> Int -> Int -> ToolResult
drawToolbar onion mouseState svgScreenWidth svgScreenHeight =
    let structureBeforeMoveInfo = (getViewStructure allBuiltInAsFunction mouseState
                                       svgScreenWidth svgScreenHeight toolbarPadding toolbarPadding Nothing True)
        toolWidth = (structureBeforeMoveInfo.funcWidth + toolbarPadding)
        toolHeight = (structureBeforeMoveInfo.funcHeight + toolbarPadding)
                                  
        maybeMoved = maybeMovedInfo mouseState svgScreenWidth svgScreenHeight
        useMoveInfo = case maybeMoved of
                          Nothing -> False
                          Just moveInfo -> (Tuple.first moveInfo.movedPos) < toolWidth
        viewStructure = if useMoveInfo
                        then
                            (getViewStructure allBuiltInAsFunction mouseState
                                       svgScreenWidth svgScreenHeight toolbarPadding toolbarPadding maybeMoved True)
                        else structureBeforeMoveInfo
        
        
    in
        (ToolResult
             toolWidth
             toolHeight
             (Svg.g
                  []
                  [(Svg.rect [width (String.fromInt (viewStructure.funcWidth+(2*toolbarPadding)))
                             ,height (String.fromInt viewStructure.funcHeight)
                             ,(fill
                                   (if useMoveInfo
                                    then (rgbToCss (darken 20 toolbarBackgroundColor))
                                    else (rgbToCss toolbarBackgroundColor)))]
                        [])
                  ,(DrawFunc.drawFuncWithConnections 
                        viewStructure)])
             useMoveInfo)
