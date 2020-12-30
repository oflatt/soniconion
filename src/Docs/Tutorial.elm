module Docs.Tutorial exposing (makeTutorialPage)

import ViewVariables
import DrawProgram exposing (drawProgram)
import BuiltIn exposing (constructCall)
import Model exposing (Function, Call, initialModel, makeMainFromCalls,
                       Model, Input(..), makeFunc, makeFuncFromCalls, Block(..))
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
to the duration of a song when the song is a literal. When songs are chained, the new anchor
is updated to be `duration` greater.

Mathematical operations like `+` operate
on the anchors of multiple songs, returning the first argument with a modified anchor, 
in a similar way to how `note` extends a song with another note.
This may be confusing at first, so consider the following example.

"""
   ,ex1Addition model
   ,makeMarkdown """
Notice that the second note plays two seconds after the first.
This is because the `anchor` of the first note is changed from 1 to 3 by the addition of 2.
The song with the modified anchor of 3 is the input of the second note, so it begins at time 3.
The resulting song with two notes in it has an anchor of 4.

However, something different happens when we reverse the order of the arguments to `+`.
"""
   ,ex2Addition model
   ,makeMarkdown """
The first note does not play! This is because the result of the `+` computation is
a silent song with the anchor `3`.
Operations on songs only inherit the notes from the first operand.
The other songs are only used to update the anchor of the result.

In this case, the `+` operator is only considering the anchor of the second note
and adding it to the 2.

## Join and Append
"""
   ,sideEffectFreeExample model
   ,makeMarkdown """
Notice that, in the example above, only the second note plays.
This is because the call to `note` constructs a song, but the song only plays
when it is returned at the end of the `main` function. In other words, the result of the entire program
is a single song, so the top note is a song which is not used anywhere.
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

## Signals

So far, we have been writing programs that generate a static song.
However, Sonic Onion is a reactive programing language- a song can be thought of
as a continuous signal over time, which is a function of other signals.

Signals can be anything that changes over time. In the next example, we use the mouse
X coordinate, which can be refered to using the `mouseX` variable.
"""
   ,mouseXExample model
   ,makeMarkdown """
The output of the program changes over time, with a frequency that matches the mouse
position. In reality, the continuous nature of your program is simulated by running many times
per second. This is why we display a `fps`, or frames per second, counter to get an idea of how fine
the simulation is.

Some other useful signals are `mouseY`, the Y coordinate of the mouse, and `time`, the current time
in seconds since the program started playing.
"""

   ,makeMarkdown """
## If Statements

It is useful sometimes to select between two songs
depending on a condition. Condition operators like `<` return
a boolean value, which is either true or false.
The `<` operator returns `true` if the first argument is less than the second argument.


To check conditions, we use the `if` function.
The first argument to `if` is the boolean value. If the value
is `true`, the result of the `if` is the second argument.
Otherwise, `if` returns the third argument.

"""
   ,ifExample model
   ,makeMarkdown """
In the example above, we use `if` to detect if the mouse is far enough down
the screen, and change the note if it is.
The condition is that the mouse is greater than 200 pixels down the screen, and the
choices are two notes, either `A4` or `B4`. Using `if`, we can pick between entire songs!
The song is a signal which changes depending on the mouse position.
"""
   
   ,makeMarkdown """
## Functions
Writing little songs in the `main` functions is fun and all, but it's time to make things more interesting
with functions.
Dragging a new function block allows you to define a new function, which you can give a name in the text box.
I called my new function `coolBeeps`.
"""
   ,coolBeepsSimple model
   ,makeMarkdown """
Notice that this program calls the `coolBeeps` function in `main`. `coolBeeps` returns
a little two-note song, which `main` provides as the main song.

Your functions can also take arguments, allowing them to change their behavior
in response to signals from outside the function.


To do this, connect the dots on the top of the function to inputs inside the body
of the function.
Then, when calling the function, provide arguments which are substituted for the outputs
at the top of the function when it is called.
"""
   ,coolBeepsWithArgument model
   ,makeMarkdown """
The example above provides `5` for the argument to the coolBeeps function.
This value is used for the duration of the first note, so the resulting song
has a first note of duration `5`.

## Recursive Functions

If a function contains a call to itself in the body of the function, it is called 
a `recursive` function. Recursive functions provide a powerful way to describe songs
concisely.
"""
   ,recursiveExample model
   ,makeMarkdown """

This example recusrively calls the `beep` method to play notes
separated by 0.2 seconds. The input to the function is the song to
add on to, and the output is a completed song.

When the function is called, it importantly checks that the song is
not too long. Without this check, the function would run forever, continuously
adding to the song.

If you are familiar with other programming languages, you may notice Sonic Onion currently has no syntax to support loops. However, all loops can be written as recursive functions.


## Sonic Onion To Do List

Sonic Onion is in an early stage of development, and lacks many features
that make programming languages usable and scalable.

You can contribute new ideas (as a github issue) or contribute at
[https://github.com/oflatt/soniconion](https://github.com/oflatt/soniconion).

Ideas:
- infinite-length songs
- saving programs
- better toolbar
- structs
- state that persists over time- ontick loop
- iterating over songs
- synthesizers
- effects
- modules
- performance improvement with Tone library
- virtual reality inputs
"""
   ]

recursiveExample model =
    makeExampleProgram
        [(makeMainFromCalls 1 [(Call 2 [Text "0"] "beeps" "")])
        ,(Function "beeps" 3 [Hole]
              (List.map CallBlock
                  [(Call 4 [FunctionArg 0, Text "0.2"] "+" "")
                  ,(Call 5 [Output 4, Text "A4", Text "0.2"] "note" "")
                  ,(Call 6 [Output 5] "beeps" "")
                  ,(Call 7 [FunctionArg 0, Text "5"] ">" "")
                  ,(Call 8 [Output 7, FunctionArg 0, Output 6] "if" "")]))]
        model
        True

   
ifExample model =
    makeExampleProgram
        [(makeMainFromCalls 1 [(Call 2 [Text "mouseY", Text "200"] ">" "")
                     ,(Call 4 [Text "0", Text "A4", Text "10"] "note" "")
                     ,(Call 5 [Text "0", Text "B4", Text "10"] "note" "")
                     ,(Call 3 [Output 2, Output 4, Output 5] "if" "")])]
        model
        True
   
coolBeepsSimple model =
    makeExampleProgram
        [(makeMainFromCalls 1 [(Call 2 [] "coolBeeps" "")])
        ,(makeFuncFromCalls 3 [(Call 4 [Text "0", Text "A4", Text "1"] "note" "")
                              ,(Call 5 [Output 4, Text "B4", Text "1"] "note" "")] "coolBeeps")]
        model
        True

coolBeepsWithArgument model =
    makeExampleProgram
        [(makeMainFromCalls 1 [(Call 2 [Text "5"] "coolBeeps" "")])
        ,(Function "coolBeeps"
              3 [Hole]
              (List.map CallBlock
               [(Call 4 [Text "0", Text "A4", FunctionArg 0] "note" "")
               ,(Call 5 [Output 4, Text "B4", Text "1"] "note" "")]))]
        model
        True

mouseXExample model = makeExampleCalls [(Call 2 [Text "0", Text "mouseX", Text "10"] "note" "")] model True
   
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



makeExampleProgram onion model shouldAddPlayButton =
    (wrapCenter
         [(div
           [css [marginBottom (em 2)]]
           ([
            (drawProgram
                 onion
                 model.mouseState
                 pageWidth
                 (ViewVariables.toSvgWindowHeight model.windowHeight)
                 False)
           ] ++ if shouldAddPlayButton
                then [div
                      [css [marginTop (em 1)]]
                           [(playButton onion), (stopButton model)]]
                else []))])
    
makeExampleCalls calls model addPlayButton =
    makeExampleProgram [(makeMainFromCalls 1 calls)] model addPlayButton
        
   
                        
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






















    
