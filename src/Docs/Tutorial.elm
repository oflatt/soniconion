module Docs.Tutorial exposing (makeTutorialPage)

import ViewVariables
import ViewStructure exposing (getViewStructure)
import DrawFunc exposing (drawFuncWithConnections)
import BuiltIn exposing (constructCall)
import Model exposing (Function, Call, initialModel, makeMain, Model)

import Svg
import Markdown
import Html.Styled exposing (fromUnstyled, div, text, Html)
import Html.Styled.Attributes exposing (css)
import Css exposing (display, block, maxWidth, margin2, px, auto, backgroundColor, fontFamilies
                    ,padding3, textAlign, center, em, fontSize, color, rgb)

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
The dot below represents the output of the function, which is a song with a single
  musical note in it.
The arguments are the information `note` needs to create a single musical notes.
The three arguments to `note` are `time` (in seconds), `frequency` (in hertz), and `duration` (in seconds).
This function call has holes where the arguments should be, so you cannot evaluate it to get a song as
  it is an incomplete program.
"""]


makeSingleBlock call model =
    let viewStructure = (getViewStructure
                             (makeMain -1 [call])
                             model.mouseState
                             (ViewVariables.toSvgWindowWidth model.windowWidth)
                             (ViewVariables.toSvgWindowHeight model.windowHeight)
                             0
                             0
                             Nothing
                             False)
    in fromUnstyled (Svg.svg [] [drawFuncWithConnections viewStructure])
            
   
emptyNoteBlock model = makeSingleBlock (constructCall -2 "note") model
    
   
makeMarkdown str =
    div [css [
          display block
         ,maxWidth (px pageWidth)
         ,margin2 (px 0) auto
         ]]
        [fromUnstyled (Markdown.toHtmlWith options [] str)]

            
options : Markdown.Options
options =
  { githubFlavored = Just { tables = False, breaks = False }
  , defaultHighlighting = Nothing
  , sanitize = False
  , smartypants = False
  }
