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
             

listToLineRoute nested function =
    case nested of
        [] -> Dict.empty
        (routes::restRoutes) ->
            case function of
                [] -> Dict.empty -- should not happen
                (call::calls) ->
                    case routes of
                        [] -> listToLineRoute restRoutes calls
                        _ ->
                            Dict.update call.id (always (Just (Array.fromList routes)))
                                (listToLineRoute restRoutes calls)

testLineRoute : List (List (Maybe Int)) -> Function -> (b -> Expectation)
testLineRoute route testFunction =
    (myexpect (getLineRouting testFunction)
         (listToLineRoute route testFunction))

getLineRoutingTest : Test
getLineRoutingTest =
    describe "getLineRoutingTest"
        [test "no connections"
             (testLineRoute []
                  TestModel.testFunctionHoles)
        ,test "basic example"
            (testLineRoute [[], [], [Just -1, Just 0], [Just 0]]
                 TestModel.testFunction)
        ,test "complex routing"
            (testLineRoute
                 [[]
                 ,[Just 0, Nothing]
                 , [Just -2, Nothing]
                 , [Just 1, Just 1]
                 , [Just 2, Just 0]]
                 TestModel.complexRoutingFunc)
        ,test "three levels on left"
                 (testLineRoute
                      [[]
                      ,[]
                      ,[Just -3]
                      ,[Just 2,Just -2]
                      ,[Just 1,Just -1]]
                      TestModel.threeLeftRoutingFunc)]
