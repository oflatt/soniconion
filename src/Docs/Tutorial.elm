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
The main function above contains a block which represents calling the `note` function.

The three black dots on top of the `note` call represent the three arguments the function requires,
  information `note` needs to create a single musical note.
This function call has holes where the arguments should be, so you cannot evaluate it to get a song.

The dot on the bottom of the block represents the output of the function, a song with a single
  musical note in it.

"""
   ,simpleNoteBlock model
   ,makeMarkdown """
The `note` call above has three arguments provided.
You can provide them when editing code by clicking a hole and typing on your keyboard.

The three arguments to `note` are the `startTime` (in seconds), `frequency` (in hertz), and `duration` (in seconds).
This call to `note` plays the note `A4` for 1 second. Alternatively, you can type the constant `A4` for 440.

## Chaining Note Blocks
"""
   ,twoNoteBlocks model
   ,makeMarkdown """
This example uses the output of the first note as the input for the `startTime` of the second note.
The `startTime` of the second note becomes the ending time for the first note, so it plays just after.

When editing your programs, do this by left-clicking the output of the first block
  and right clicking the input of a second block. (Alternatively, you can left-click an input and right-click
an output).


Notice that you can provide either a song or a literal number for the start time.
In fact, all literal numbers, such as `2`, represent silent songs with a start time of `0` and a duration
which is the same as the literal number. The start time `1` sequences the first note after a silent period of
1 second, then the second note is played after as it has a start time of `3`.

## Computing With Songs

All literal values instantiate songs, and all calls to the `note` function result in songs. Operations like
`+` also compute using songs, but require the definition of a song `anchor`.

The `anchor` of a song is the attachment point for future songs. This anchor is initialized
to the duration of a song when the song is a literal. The anchor is upated when songs are chained.

Mathematical operations like `+` operate
on the anchors of multiple songs, returning the first argument with a modified anchor, similar to how
`note` extends a song with another note.
Consider the following example.
"""
   ,ex1Addition model
   ,makeMarkdown """
Notice that the second note plays one second after the first.
The second note starts at the modified anchor of the first note, which is 2.

However, something different happens when we reverse the order of the arguments to `+`.
"""
   ,ex2Addition model
   ,makeMarkdown """
The first note does not play! This is because the result of the `+` computation is
a silent song of duration `2` with the anchor `3`. The other argument, the first note,
is used to update the anchor of the literal `2`.


## Join and Append
"""
   ,sideEffectFreeExample model
   ,makeMarkdown """
Notice that, in the example above, only the second note plays.
Sonic Onion is a functional, reactice programming language without side-effects. In other words,
each call produces a new song, and the result of the program is a single song.
Each function returns the result of the last call in the body of the function, and last block of the `main`
function should be the entire desired song.

Chaining two notes creates a song with both notes in them, but what if two songs must be played in parallel?
Combining two separate songs can be achieved with the `join` function.

"""
   ,joinExample model
   ,makeMarkdown """
Actually, it is possible to get away with never using the `join` function.
This is because there are no contraints on the `anchor` of a song- the anchor can even be negative!
If we set the anchor of the first note to zero, the second note will be added at time zero and
achieve the same effect as the `join` call.
"""
   ,joinExampleZero model
   ,makeMarkdown """
The above example subtracts the song from the first note from itself.
The anchor of the output then becomes `0`, the result of `1-1`.
This anchor is used in adding the second note, resulting in the same song as in the first example.

Sometimes, it is convenient to sequence two separate songs, one after another.
The `append` function sequences songs together, adding the anchor of each song to the `startTime` of the next.
Here is an example that plays two notes, waits a second, then plays another two notes.
"""
   ,appendExample model
   ,makeMarkdown """
## Functions
Writing little songs in the `main` functions is fun and all, but it's time to make things more interesting
with functions.
Dragging a new function block allows you to define a new function, which you can give a name in the text box.
I called my new function `coolBeeps`
"""
   ,coolBeepsSimple model
   ,
   ,makeMarkdown """



## Functions

## Signals: Make Things Reactive
"""
   ]

emptyNoteBlock model = makeExampleCalls [(constructCall 2 "note")] model False
                       
simpleNoteBlock model = makeExampleCalls [(Call 2 [Text "0", Text "440", Text "1"] "note" "")] model True
    
twoNoteBlocks model = makeExampleCalls [(Call 2 [Text "1", Text "A4", Text "2"] "note" "")
                                       ,(Call 3 [Output 2, Text "B4", Text "1"] "note" "")] model True

ex1Addition model = makeExampleCalls [(Call 2 [Text "0", Text "A4", Text "1"] "note" "")
                                     ,(Call 3 [Output 2, Text "2"] "+" "")
                                     ,(Call 4 [Output 3, Text "B4", Text "1"] "note" "")] model True


ex2Addition model = makeExampleCalls [(Call 2 [Text "0", Text "A4", Text "1"] "note" "")
                                     ,(Call 3 [Text "2", Output 2] "+" "")
                                     ,(Call 4 [Output 3, Text "B4", Text "1"] "note" "")] model True

sideEffectFreeExample model = makeExampleCalls [(Call 2 [Text "0", Text "C4", Text "1"] "note" "")
                                               ,(Call 3 [Text "0", Text "E4", Text "1"] "note" "")] model True

joinExample model = makeExampleCalls [(Call 2 [Text "0", Text "C4", Text "1"] "note" "")
                                     ,(Call 3 [Text "0", Text "E4", Text "1"] "note" "")
                                     ,(Call 4 [Output 2, Output 3] "join" "")] model True

joinExampleZero model = makeExampleCalls [(Call 2 [Text "0", Text "C4", Text "1"] "note" "")
                                         ,(Call 3 [Output 2, Output 2] "-" "")
                                         ,(Call 4 [Output 3, Text "E4", Text "1"] "note" "")
                                         ] model True

appendExample model = makeExampleCalls [
                       (Call 2 [Text "0", Text "C4", Text "1"] "note" "")
                      ,(Call 3 [Output 2, Text "D4", Text "1"] "note" "")
                      ,(Call 4 [Output 3, Text "1"] "+" "")
                      ,(Call 5 [Text "0", Text "E4", Text "1"] "note" "")
                      ,(Call 6 [Output 5, Text "F4", Text "1"] "note" "")
                      ,(Call 7 [Output 4, Output 6] "append" "")
                       ] model True



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






















    
