module TestModel exposing (..)

import Expect
import Model exposing (..)

myexpect item1 item2 =
    (\_ ->
         (Expect.equal item1 item2))


sine = (Call 80 [Text "1", Text "440", Text "1"] "sine" "")
sine2 = (Call 89 [Text "2", Text "640", Text "2"] "sine" "")
join = (Call 85 [Output 80, Output 89] "+" "")
plus = (Call 1092392 [Output 85] "+" "")
plusWithHole = (Call 1092392 [Hole] "+" "")

testFunction : Function
testFunction = (makeMain 0 [sine, sine2, join, plus])
      
testInvalidFunction : Function
testInvalidFunction = (makeMain 0 [sine, sine2, plus, join])

testFunctionHoles : Function
testFunctionHoles = (makeMain 0
                         [(Call 80 [Text "1", Hole] "sine" "")
                         ,(Call 89 [Text "2", Text "640"] "sine" "")
                         ,(Call 85 [Hole, Hole] "+" "")
                         ,(Call 1092392 [Hole] "+" "")])


complex0 = (Call 80 [Text "1", Text "2"] "sine" "")
complex1 = (Call 98 [Output 80, Text "2"] "sine" "")
complex2 = (Call 83 [Output 80, Text "2"] "sine" "")
complex3 = (Call 23 [Output 98, Output 98] "sine" "")
complex4 = (Call 12 [Output 80, Output 23] "sine" "")
complexRoutingFunc : Function    
complexRoutingFunc =
    (makeMain 0
         [complex0
         ,complex1
         ,complex2
         ,complex3
         ,complex4
         ])

plusCall id routes =
    (Call id (List.map Output routes) "+" "")
    
threeLeftRoutingFunc : Function
threeLeftRoutingFunc =
    (makeMain 0
         [(plusCall 0 [])
         ,(plusCall 1 [])
         ,(plusCall 2 [])
         ,(plusCall 3 [0])
         ,(plusCall 4 [1])
         ,(plusCall 5 [2])
         ,(plusCall 6 [3])
         ,(plusCall 7 [4])])
