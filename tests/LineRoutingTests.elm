module LineRoutingTests exposing (..)


import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import ModelHelpers
import Array exposing (Array)
import Dict exposing (Dict)

import ViewPositions

import TestModel exposing (..)
import LineRouting


getLineRouting testModel =
    (ViewPositions.getViewStructure testModel (MouseState 0 0 NoneSelected) 0 0 0 0 False).lineRouting
        
outputOrderingTest : Test
outputOrderingTest =
    describe "getOutputOrdering"
        [test "complexRoutingOrdering"
             (\_ ->
                  Expect.equal
                  (LineRouting.getOutputOrdering TestModel.complexRoutingFunc
                       (ModelHelpers.idToPosition TestModel.complexRoutingFunc Dict.empty 0))
                  [(LineRouting.InputInfo complex4 1 complex3.id)
                  ,(LineRouting.InputInfo complex3 0 complex1.id)
                  ,(LineRouting.InputInfo complex3 1 complex1.id)
                  ,(LineRouting.InputInfo complex1 0 complex0.id)
                  ,(LineRouting.InputInfo complex2 0 complex0.id)
                  ,(LineRouting.InputInfo complex4 0 complex0.id)
                  ])]
             

        


getLineRoutingTest : Test
getLineRoutingTest =
    describe "getLineRoutingTest"
        [test "no connections"
             (myexpect
                  (getLineRouting TestModel.testFunctionHoles)
                  [[Nothing, Nothing], [Nothing, Nothing], [Nothing, Nothing], [Nothing]])
        ,test "basic example"
            (myexpect
                 (getLineRouting TestModel.testFunction)
                 [[Nothing, Nothing, Nothing], [Nothing, Nothing, Nothing], [Just -1, Just 0], [Just 0]])
        ,test "complex routing"
            (myexpect
                 (getLineRouting TestModel.complexRoutingFunc)
                 [[Nothing, Nothing], [Just 0, Nothing], [Just 2, Nothing], [Just -1, Just 1], [Just -2, Just 0]])
        ,test "three levels on left"
            (myexpect
                 (getLineRouting TestModel.threeLeftRoutingFunc)
                 [[]
                 ,[]
                 ,[Just -3]
                 ,[Just 2,Just -2]
                 ,[Just 1,Just -1]])]
