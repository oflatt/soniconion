module ViewPositionsTests exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import Array exposing (Array)
import Dict exposing (Dict)
import TestModel
import ViewPositions


myexpect item1 item2 =
    (\_ ->
         (Expect.equal item1 item2))

fixInvalidInputs : Test
fixInvalidInputs =
    describe "getOutputConnectedArray"
        [test "no connections"
             (myexpect
                  (ViewPositions.getOutputConnectedArray
                       TestModel.testFunctionHoles
                       (ViewPositions.makeIdToPos TestModel.testFunctionHoles Dict.empty 0))
                  ((Array.repeat 4 0), (Array.repeat 4 0)))
        ,test "test connections"
            (myexpect
                 (ViewPositions.getOutputConnectedArray
                      TestModel.testFunction
                      (ViewPositions.makeIdToPos TestModel.testFunction Dict.empty 0))
                 ((Array.fromList [1, 0, 1, 0])
                 ,(Array.fromList [0, 1, 0, 0])))
        ,test "test complex"
            (myexpect
                 (ViewPositions.getOutputConnectedArray
                      TestModel.complexRoutingFunc
                      (ViewPositions.makeIdToPos TestModel.complexRoutingFunc Dict.empty 0))
                 ((Array.fromList [1, 1, 0, 0, 0])
                 ,(Array.fromList [1, 1, 0, 1, 0])))
        ]
                


getLineRouting : Test
getLineRouting =
    describe "getLineRouting"
        [test "no connections"
             (myexpect
                  (ViewPositions.getViewStructure TestModel.testFunctionHoles
                       (MouseState 0 0 NoneSelected) 0 0).lineRouting
                  [[], [], [], []])
        ,test "basic example"
            (myexpect
                 (ViewPositions.getViewStructure TestModel.testFunction
                       (MouseState 0 0 NoneSelected) 0 0).lineRouting
                 [[], [], [-1, 0], [0]])
        ,test "complex routing"
            (myexpect
                 (ViewPositions.getViewStructure TestModel.complexRoutingFunc
                       (MouseState 0 0 NoneSelected) 0 0).lineRouting
                 [[], [0], [2], [-1, 1], [-2, 0]])]

