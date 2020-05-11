module ViewPositionsTests exposing (..)


import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import Array exposing (Array)
import Dict exposing (Dict)

import TestModel exposing (myexpect)
import ModelHelpers
import ViewPositions
import ViewVariables exposing (functionXSpacing, blockSpace, lineSpaceBeforeBlock)
                

blockPositionToYpos blockPos = blockPos.ypos
        
callBlockPositions testFunc mouse =
    Result.map (List.map blockPositionToYpos)
        (ViewPositions.blockPositionsToPositionList testFunc
             (ViewPositions.getViewStructure testFunc
                  mouse ViewVariables.viewportHeight ViewVariables.viewportHeight 0 0 False).blockPositions)

            
emptyMouse = (MouseState 0 0 0 0 NoneSelected)

secondToLastMouse = (MouseState 1
                         (blockSpace+2*lineSpaceBeforeBlock+ViewVariables.svgYpos+(ViewVariables.blockHeight//2))
                         0
                         0
                         (BlockSelected 23))
                    
blockPositionsTest : Test
blockPositionsTest =
    describe "getBlockPositions"
        [test "test func"
             (myexpect
                  (callBlockPositions TestModel.testFunction emptyMouse)
                  (Ok [0
                      ,blockSpace
                      ,blockSpace*2 + 2*lineSpaceBeforeBlock
                      ,blockSpace*3 + (1+2)*lineSpaceBeforeBlock]))
        ,test "complex connections"
             (myexpect
                  (callBlockPositions TestModel.complexRoutingFunc emptyMouse)
                  (Ok [0
                      ,blockSpace + lineSpaceBeforeBlock
                      ,blockSpace*2 + (1+1)*lineSpaceBeforeBlock
                      ,blockSpace*3 + (1+1+2)*lineSpaceBeforeBlock
                      ,blockSpace*4 + (1+1+2+2)*lineSpaceBeforeBlock]))
        ,test "move block two up"
             (myexpect
                  (callBlockPositions TestModel.complexRoutingFunc
                       secondToLastMouse)
                  (Ok [0
                      ,blockSpace*2 + (1+2)*lineSpaceBeforeBlock
                      ,blockSpace*3 + (1+2+1)*lineSpaceBeforeBlock
                      ,blockSpace + 2*lineSpaceBeforeBlock
                      ,blockSpace*4 + (1+1+2+2)*lineSpaceBeforeBlock]))]


movedInfoTest : Test
movedInfoTest =
    describe "getMovedInfo"
        [test "test select second to last"
             (myexpect
                  (ViewPositions.getMovedInfo TestModel.complexRoutingFunc secondToLastMouse
                       (ViewPositions.mouseToSvgCoordinates secondToLastMouse
                            (ViewVariables.viewportWidth 100 100) ViewVariables.viewportHeight 0 0))
                  (Just (ViewPositions.MovedBlockInfo TestModel.secondToLastSine
                             (1, blockSpace + 2*lineSpaceBeforeBlock))))
                                       
               ]
