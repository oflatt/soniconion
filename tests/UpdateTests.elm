module UpdateTests exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import TestModel exposing (..)
import ModelHelpers
import Update


    
               

fixInvalidInputs : Test
fixInvalidInputs =
    describe "fixInvalidInputs"
        [test "unchanged example"
             (\_ -> (Expect.equal
                         (ModelHelpers.fixInvalidInputs testFunction)
                         testFunction))
        ,test "fix play"
            (\_ ->
                 (Expect.equal (ModelHelpers.fixInvalidInputs testInvalidFunction)
                      [sine, sine2, plusWithHole, join]))]
                


