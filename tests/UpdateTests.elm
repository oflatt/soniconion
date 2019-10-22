module UpdateTests exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import Update


sine = (Call 80 [Const 1, Const 440] "sine")
sine2 = (Call 89 [Const 2, Const 640] "sine")
join = (Call 85 [Output 80, Output 89] "join")
play = (Call 1092392 [Output 85] "play")
       
-- play is assumed to be at the end
testFunction : Function
testFunction = [sine
               ,sine2
               ,join
               ,play]
               

fixInvalidInputs : Test
fixInvalidInputs =
    describe "fixInvalidInputs"
        [test "unchanged example"
             (\_ -> (Expect.equal
                         (Update.fixInvalidInputs testFunction)
                         testFunction))]
                


