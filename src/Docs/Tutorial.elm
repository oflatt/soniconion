module Docs.Tutorial exposing (makeTutorialPage)

import ViewVariables

import Markdown
import Html.Styled exposing (fromUnstyled, div, text)
import Html.Styled.Attributes exposing (css)
import Css exposing (display, block, maxWidth, margin2, px, auto, backgroundColor, fontFamilies
                    ,padding3, textAlign, center, em, fontSize, color, rgb)

makeTutorialPage model =
    wrapMarkdownPage "Tutorial" (makeMarkdown tutorialText)


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
            
tutorialText =
    """

### The Note Block

"""

makeMarkdown str =
    div [css [
          display block
         ,maxWidth (px 600)
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
