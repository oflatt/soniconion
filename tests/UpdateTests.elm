module UpdateTests exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import TestModel exposing (..)
import Update


    
               

fixInvalidInputs : Test
fixInvalidInputs =
    describe "fixInvalidInputs"
        [test "unchanged example"
             (\_ -> (Expect.equal
                         (Update.fixInvalidInputs testFunction)
                         testFunction))
        ,test "fix play"
            (\_ ->
                 (Expect.equal (Update.fixInvalidInputs testInvalidFunction)
                      [sine, sine2, playWithHole, join]))]
                


