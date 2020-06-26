module TitleBar exposing (makeTitle)

import ViewVariables
import Model exposing (Msg(..))


import Css exposing (pct, px, textAlign, padding, fontFamilies, fontSize, top, display, height, width, inlineBlock
                    ,center, alignItems, inlineFlex, paddingRight, rgb, backgroundColor, paddingLeft, border, none
                    ,borderRadius, marginLeft)
import Html.Styled exposing (div, text, button, fromUnstyled)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import ViewVariables exposing (holeGrey, disabledGrey)

import Svg
import Svg.Attributes

stopIcon isRunning =
    fromUnstyled
    (Svg.svg
         [Svg.Attributes.width "40px"
         ,Svg.Attributes.height "24px"]
         [Svg.polygon
              [Svg.Attributes.points "0,0 0,24 24,24, 24,0"
              ,Svg.Attributes.fill (if isRunning then "rgb(214, 36, 36)" else holeGrey)]
              []])

playIcon = fromUnstyled
           (Svg.svg
                [Svg.Attributes.width "40px"
                ,Svg.Attributes.height "24px"]
                [Svg.polygon
                     [Svg.Attributes.points "0,0 0,24 24,12"
                     ,Svg.Attributes.fill "rgb(67, 194, 60)"]
                     []])

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
               ,marginLeft (px 100)
               ,border (px 0)
               ,borderRadius (px 5)
               ,alignItems center
               ,display inlineFlex
               ,backgroundColor color]]
    [
     icon
    ,text textString]
    
    
makeTitle model = (div
                   [css [
                     height (px ViewVariables.titleHeight)
                    ,width (pct 100)
                    ]
                   ]
                   [(div[css[
                          textAlign (center)
                         ,padding (px 20)
                         ,display (inlineBlock)
                         ]
                        ]
                         [div[css[
                               fontFamilies ["monospace"]
                              ,fontSize (px 32)
                              ,top (px 10)
                              ]]
                              [text "Sonic Onion"]
                              
                         ])
                   ,(div[css[
                          display (inlineBlock)
                         ,textAlign (center)
                         ]
                        ]
                         [
                          (makeIconButton playIcon "Play" (PlaySound)
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
                                    ,marginLeft (px 100)]]
                               [text ("fps: " ++ (if not model.isRunning
                                                  then ""
                                                  else (String.fromInt model.fps)))])
                               
                         ])])
    
