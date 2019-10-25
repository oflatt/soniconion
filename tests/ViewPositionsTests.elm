module ViewPositionsTests exposing (..)


import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import Array exposing (Array)
import Dict exposing (Dict)

import TestModel
import ViewPositions
import ViewVariables exposing (functionXSpacing, blockSpace)

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
                  [[Nothing, Nothing], [Nothing, Nothing], [Nothing, Nothing], [Nothing]])
        ,test "basic example"
            (myexpect
                 (ViewPositions.getViewStructure TestModel.testFunction
                       (MouseState 0 0 NoneSelected) 0 0).lineRouting
                 [[Nothing, Nothing], [Nothing, Nothing], [Just -1, Just 0], [Just 0]])
        ,test "complex routing"
            (myexpect
                 (ViewPositions.getViewStructure TestModel.complexRoutingFunc
                       (MouseState 0 0 NoneSelected) 0 0).lineRouting
                 [[Nothing, Nothing], [Just 0, Nothing], [Just 2, Nothing], [Just -1, Just 1], [Just -2, Just 0]])]



        
getBlockPositions : Test
getBlockPositions =
    describe "getBlockPositions"
        [test "no connections"
             (myexpect
                  (ViewPositions.blockPositionsToPositionList TestModel.testFunction
                       (ViewPositions.getViewStructure TestModel.testFunction
                            (MouseState 0 0 NoneSelected) 1000 1000).blockPositions)
                  (Ok [(functionXSpacing, 0)
                      ,(functionXSpacing, blockSpace)
                      ,(functionXSpacing, blockSpace*2)
                      ,(functionXSpacing, blockSpace*3)]))
        ,test "complex connections"
             (myexpect
                  (ViewPositions.blockPositionsToPositionList TestModel.complexRoutingFunc
                       (ViewPositions.getViewStructure TestModel.complexRoutingFunc
                            (MouseState 0 0 NoneSelected) 1000 1000).blockPositions)
                  (Ok [(functionXSpacing, 0)
                      ,(functionXSpacing, blockSpace)
                      ,(functionXSpacing, blockSpace*2)
                      ,(functionXSpacing, blockSpace*3)
                      ,(functionXSpacing, blockSpace*4)]))]

