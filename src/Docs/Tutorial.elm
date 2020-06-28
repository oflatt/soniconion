module Docs.Tutorial exposing (makeTutorialPage)

import Markdown
import Html.Styled exposing (fromUnstyled)

makeTutorialPage model =
    fromUnstyled (Markdown.toHtml [] """
# test
""")
