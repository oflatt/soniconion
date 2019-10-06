module DrawToolbar exposing (drawToolBar)
import Model exposing (..)

import Browser
import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)



drawToolBar : Model -> Int -> Int -> Html Msg
drawToolBar model twidth theight =
    div [css [
          width (px (toFloat twidth))
         ,height (px (toFloat theight))
         ,display (inlineBlock)
         ]
        ]
        []
        
