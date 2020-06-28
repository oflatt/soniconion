module TitleBar exposing (makeTitle)

import ViewVariables
import Model exposing (Msg(..))


import Css exposing (pct, px, textAlign, padding, fontFamilies, fontSize, top, display, height, width, inlineBlock
                    ,center, alignItems, inlineFlex, paddingRight, rgb, backgroundColor, paddingLeft, border, none
                    ,borderRadius, marginLeft, paddingTop, alignSelf, top, em, relative, position
                    ,marginRight)
import Html.Styled exposing (div, text, button, fromUnstyled)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import ViewVariables exposing (holeGrey, disabledGrey)

import Svg
import Svg.Attributes

buttonSpacing = 50

makeIcon polygonAttrs =
    div
        [css [width (em 1)
             ,height (em 1)
             ,display inlineFlex
             ,alignSelf center
             ,top (em 0.125)
             ,position relative
             ,marginRight (px 10)]]
        [
         fromUnstyled
             (Svg.svg
                  [Svg.Attributes.width "24px"
                  ,Svg.Attributes.height "24px"]
                  [Svg.polygon
                       polygonAttrs
              []])
        ]

        
stopIcon isRunning =
    makeIcon [Svg.Attributes.points "0,0 0,24 24,24, 24,0"
             ,Svg.Attributes.fill (if isRunning then "rgb(214, 36, 36)" else holeGrey)]
        
playIcon = makeIcon [Svg.Attributes.points "0,0 0,24 24,12"
                     ,Svg.Attributes.fill "rgb(67, 194, 60)"]
        
makeIconButton icon textString event color =
    button [onClick event
           ,onMouseOver (MouseOver textString)
           ,onMouseLeave (MouseLeave textString)
           ,css[
                fontFamilies ["monospace"]
               ,fontSize (px 24)
               ,padding (px 10)
               ,paddingLeft (px 20)
               ,paddingRight (px 20)
               ,marginLeft (px buttonSpacing)
               ,border (px 0)
               ,borderRadius (px 5)
               ,backgroundColor color]]
    [
     icon
    ,text textString]
    
    
makeTitle model = (div[css[
                        display (inlineBlock)
                       ,width (pct 100)
                       ]
                      ]
                       [
                        div[css[
                             fontFamilies ["monospace"]
                            ,display (inlineBlock)
                            ,fontSize (px 32)
                            ,top (px 10)
                            ]]
                            [text "Sonic Onion"]
                       ,(makeIconButton playIcon "Play" (PlaySound)
                             (if not (model.highlightedButton == "Play")
                              then (rgb 199 255 201)
                              else (rgb 168 255 163)))
                       ,(makeIconButton (stopIcon model.isRunning) "Stop" (StopSound)
                             (if model.isRunning
                              then (if not (model.highlightedButton == "Stop")
                                    then (rgb 252 144 144)
                                    else (rgb 232 93 93))
                              else disabledGrey))
                       ,(div [css [fontFamilies ["monospace"]
                                  ,display (inlineBlock)
                                  ,fontSize (px 24)
                                  ,marginLeft (px buttonSpacing)]]
                             [text ("fps: " ++ (if not model.isRunning
                                                then ""
                                                else (String.fromInt model.fps)))])
                       ,(makeIconButton (text "") "Tutorial" (PageChange "Tutorial")
                             (if (model.highlightedButton == "Tutorial")
                              then (rgb 212 214 67)
                              else (rgb 186 180 61)))
                           
                       ])
    
