module ViewPositionsTests exposing (..)


import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import Array exposing (Array)
import Dict exposing (Dict)

import TestModel
import ViewPositions exposing (..)
import ViewVariables exposing (functionXSpacing, blockSpace, lineSpaceBeforeBlock)

myexpect item1 item2 =
    (\_ ->
         (Expect.equal item1 item2))

outputConnectedArrayTest func expected =
    let
        svgScreenWidth = 1000
        svgScreenHeight = 1000
        mouseState = (MouseState 0 0 NoneSelected)
        blockPositions = (getBlockPositions func mouseState svgScreenWidth svgScreenHeight)
        madePos = makeIdToPos func blockPositions
        sortedFunc = (Tuple.first madePos)
        idToPos = (Tuple.second madePos)
        connectedArray = getOutputConnectedArray sortedFunc idToPos
    in
        (myexpect
             connectedArray
             expected)
        
fixInvalidInputs : Test
fixInvalidInputs =
    describe "getOutputConnectedArray"
        [test "no connections"
             (outputConnectedArrayTest TestModel.testFunctionHoles
                  (Array.fromList [0,0,0,0]
                  ,Array.fromList [0,0,0,0]))
        ,test "test connections"
            (outputConnectedArrayTest TestModel.testFunction
                  ((Array.fromList [1, 0, 1, 0])
                  ,(Array.fromList [0, 1, 0, 0])))
        ,test "test complex"
            (outputConnectedArrayTest TestModel.complexRoutingFunc
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



        
blockPositionsTest : Test
blockPositionsTest =
    describe "getBlockPositions"
        [test "test func"
             (myexpect
                  (ViewPositions.blockPositionsToPositionList TestModel.testFunction
                       (ViewPositions.getViewStructure TestModel.testFunction
                            (MouseState 0 0 NoneSelected) 1000 1000).blockPositions)
                  (Ok [(functionXSpacing, 0)
                      ,(functionXSpacing, blockSpace)
                      ,(functionXSpacing, blockSpace*2 + 2*lineSpaceBeforeBlock)
                      ,(functionXSpacing, blockSpace*3 + (1+2)*lineSpaceBeforeBlock)]))
        ,test "complex connections"
             (myexpect
                  (ViewPositions.blockPositionsToPositionList TestModel.complexRoutingFunc
                       (ViewPositions.getViewStructure TestModel.complexRoutingFunc
                            (MouseState 0 0 NoneSelected) 1000 1000).blockPositions)
                  (Ok [(functionXSpacing, 0)
                      ,(functionXSpacing, blockSpace + lineSpaceBeforeBlock)
                      ,(functionXSpacing, blockSpace*2 + (1+1)*lineSpaceBeforeBlock)
                      ,(functionXSpacing, blockSpace*3 + (1+1+2)*lineSpaceBeforeBlock)
                      ,(functionXSpacing, blockSpace*4 + (1+1+2+2)*lineSpaceBeforeBlock)]))]

