module TestModel exposing (..)

import Model exposing (..)

sine = (Call 80 [Text "1", Text "440", Text "1"] "sine" "")
sine2 = (Call 89 [Text "2", Text "640", Text "2"] "sine" "")
join = (Call 85 [Output 80, Output 89] "+" "")
plus = (Call 1092392 [Output 85] "+" "")
plusWithHole = (Call 1092392 [Hole] "+" "")

testFunction : Function
testFunction = [sine, sine2, join, plus]
      
testInvalidFunction : Function
testInvalidFunction = [sine, sine2, plus, join]

testFunctionHoles : Function
testFunctionHoles = [(Call 80 [Text "1", Hole] "sine" "")
                    ,(Call 89 [Text "2", Text "640"] "sine" "")
                    ,(Call 85 [Hole, Hole] "+" "")
                    ,(Call 1092392 [Hole] "+" "")]

secondToLastSine = (Call 23 [Output 98, Output 98] "sine" "")

complexRoutingFunc : Function    
complexRoutingFunc =
    [(Call 80 [Text "1", Text "2"] "sine" "")
    ,(Call 98 [Output 80, Text "2"] "sine" "")
    ,(Call 83 [Output 80, Text "2"] "sine" "")
    ,secondToLastSine
    ,(Call 12 [Output 80, Output 23] "sine" "")
     ]

