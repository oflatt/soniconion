module Docs.Tutorial exposing (makeTutorialPage)

import ViewVariables
import DrawProgram exposing (drawProgram)
import BuiltIn exposing (constructCall)
import Model exposing (Function, Call, initialModel, makeMain, Model, Input(..))
import TitleBar exposing (playButton, stopButton)

import Svg
import Markdown
import Html.Styled exposing (fromUnstyled, div, text, Html)
import Html.Styled.Attributes exposing (css)
import Css exposing (display, block, maxWidth, margin2, px, auto, backgroundColor, fontFamilies
                    ,padding3, textAlign, center, em, fontSize, color, rgb)

import Debug exposing (log)

pageWidth = 600

makeTutorialPage : Model -> Html Model.Msg
makeTutorialPage model =
    wrapMarkdownPage "Tutorial" (tutorialBody model)


makeMarkdownTitle title =
    (div [css [
         padding3 (em 4) (em 0) (em 1)
         ,textAlign center]
         ]
         [(div [css [fontSize (em 4)
                    ,color (rgb 0 14 22)]
               ]
               [text title])])
        
wrapMarkdownPage title page =
    div [css [
          backgroundColor ViewVariables.pageColor
         ,fontFamilies ["IBM Plex Sans", "sans-serif"]
          ]]
        [makeMarkdownTitle title
        ,page]
            
tutorialBody model =
    div []
        (bodyList model)
            
bodyList model =
    [
     makeMarkdown
    """
## The Note Block
"""
   ,emptyNoteBlock model
   ,makeMarkdown
   """
The main function above contains a single function call to the `note` function.

The three dots above on the the `note` call represent the three arguments the `note` function requires.

The dot on the bottom of the block represents the output of the function, which is a song with a single
  musical note in it.

This function call has holes where the arguments should be, so you cannot evaluate it to get a song as
  it is an incomplete program.
"""
   ,simpleNoteBlock model
   ,makeMarkdown """
The arguments are the information `note` needs to create a single musical notes.

The three arguments to `note` are the `startTime` (in seconds), `frequency` (in hertz), and `duration` (in seconds).
"""]


makeExampleCalls calls model addPlayButton =
    (wrapCenter
         ([
          (drawProgram
               [(makeMain 1 calls)]
               model.mouseState
               pageWidth
               (ViewVariables.toSvgWindowHeight model.windowHeight)
               False)
        ] ++
         if addPlayButton
         then [(playButton [(makeMain 1 calls)]), (stopButton model)]
         else []))
        
   
emptyNoteBlock model = makeExampleCalls [(constructCall 2 "note")] model False
                       
simpleNoteBlock model = makeExampleCalls [(Call 2 [Text "0", Text "440", Text "1"] "note" "")] model True
    

wrapCenter elements =
    div [css [
          display block
         ,maxWidth (px pageWidth)
         ,margin2 (px 0) auto
         ]]
        elements
                        
makeMarkdown str =
    wrapCenter [fromUnstyled (Markdown.toHtmlWith options [] str)]

            
options : Markdown.Options
options =
  { githubFlavored = Just { tables = False, breaks = False }
  , defaultHighlighting = Nothing
  , sanitize = False
  , smartypants = False
  }
