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
                    ,padding3, textAlign, center, em, fontSize, color, rgb, marginBottom, marginTop)

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
The main function above contains a block which represents a calling the `note` function.

The three black dots on top of the `note` call represent the three arguments the function requires.

The dot on the bottom of the block represents the output of the function, a song with a single
  musical note in it.

This function call has holes where the arguments should be, so you cannot evaluate it to get a song.
"""
   ,simpleNoteBlock model
   ,makeMarkdown """
This function call has three arguments provided.

The arguments are the information `note` needs to create a single musical notes.

You can provide them when editing code by clicking a hole and typing on your keyboard.

The three arguments to `note` are the `startTime` (in seconds), `frequency` (in hertz), and `duration` (in seconds).

This call to `note` plays the note `A4` for 1 second. Alternatively, you can type the constant `A4` for 440.
"""]


makeExampleCalls calls model addPlayButton =
    (wrapCenter
         [(div
           [css [marginBottom (em 2)]]
           ([
            (drawProgram
                 [(makeMain 1 calls)]
                 model.mouseState
                 pageWidth
                 (ViewVariables.toSvgWindowHeight model.windowHeight)
                 False)
           ] ++ if addPlayButton
                then [div
                      [css [marginTop (em 1)]]
                           [(playButton [(makeMain 1 calls)]), (stopButton model)]]
                else []))])
        
   
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
