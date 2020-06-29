module Docs.Tutorial exposing (makeTutorialPage)

import ViewVariables

import Markdown
import Html.Styled exposing (fromUnstyled, div)
import Html.Styled.Attributes exposing (css)
import Css exposing (display, block, maxWidth, margin2, px, auto, backgroundColor, fontFamilies)

makeTutorialPage model =
    div [css [
          backgroundColor ViewVariables.pageColor
         ,fontFamilies ["IBM Plex Sans", "sans-serif"]
          ]]
        [
         makeMarkdown tutorialText]

            
tutorialText =
    """

# test

"""

makeMarkdown str =
    div [css [
          display block
         ,maxWidth (px 600)
         ,margin2 (px 0) auto
         ]]
        [fromUnstyled (Markdown.toHtml [] str)]

            
