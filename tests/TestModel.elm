module TestModel exposing (..)

import Model exposing (..)

sine = (Call 80 [Text "1", Text "440"] "sine")
sine2 = (Call 89 [Text "2", Text "640"] "sine")
join = (Call 85 [Output 80, Output 89] "join")
play = (Call 1092392 [Output 85] "play")
playWithHole = (Call 1092392 [Hole] "play")

-- play is assumed to be at the end
testFunction : Function
testFunction = [sine, sine2, join, play]
      
testInvalidFunction : Function
testInvalidFunction = [sine, sine2, play, join]

testFunctionHoles : Function
testFunctionHoles = [(Call 80 [Text "1", Hole] "sine")
                    ,(Call 89 [Text "2", Text "640"] "sine")
                    ,(Call 85 [Hole, Hole] "join")
                    ,(Call 1092392 [Hole] "play")]


complexRoutingFunc : Function    
complexRoutingFunc =
    [(Call 80 [Text "1", Text "2"] "sine")
    ,(Call 98 [Output 80, Text "2"] "sine")
    ,(Call 83 [Output 80, Text "2"] "sine")
    ,(Call 23 [Output 98, Output 98] "sine")
    ,(Call 12 [Output 80, Output 23] "sine")
     ]

