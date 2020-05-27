module ViewPositionsTests exposing (..)


import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import Array exposing (Array)
import Dict exposing (Dict)

import TestModel exposing (myexpect)
import ModelHelpers
import ViewStructure
import ViewVariables exposing (functionXSpacing, blockSpace, lineSpaceBeforeBlock, blockSpacing
                              ,functionHeaderHeight)
                

blockPositionToNormalYpos blockPos = blockPos.ypos - (functionHeaderHeight + blockSpacing)

formatBlockPositions : Function -> MouseState -> Result String (List Int)
formatBlockPositions testFunc mouse =
    Result.map (List.map blockPositionToNormalYpos)
        (ViewStructure.blockPositionsToPositionList testFunc.calls
             (ViewStructure.getViewStructure testFunc
                  mouse ViewVariables.viewportHeight ViewVariables.viewportHeight 0 0 False).blockPositions)

            
emptyMouse = (MouseState 0 0 0 0 NoneSelected)

secondToLastMouse = (MouseState 1
                         (ViewVariables.svgYpos + functionHeaderHeight + blockSpacing
                              +blockSpace+2*lineSpaceBeforeBlock
                              +(ViewVariables.blockHeight//2))
                         0
                         0
                         (BlockSelected 23 0 0))
                    
blockPositionsTest : Test
blockPositionsTest =
    describe "getBlockPositions"
        [test "test func"
             (myexpect
                  (formatBlockPositions TestModel.testFunction emptyMouse)
                  (Ok [0
                      ,blockSpace
                      ,blockSpace*2 + 2*lineSpaceBeforeBlock
                      ,blockSpace*3 + (1+2)*lineSpaceBeforeBlock]))
        ,test "complex connections"
             (myexpect
                  (formatBlockPositions TestModel.complexRoutingFunc emptyMouse)
                  (Ok [0
                      ,blockSpace + lineSpaceBeforeBlock
                      ,blockSpace*2 + (1+1)*lineSpaceBeforeBlock
                      ,blockSpace*3 + (1+1+2)*lineSpaceBeforeBlock
                      ,blockSpace*4 + (1+1+2+2)*lineSpaceBeforeBlock]))
        ,test "move block two up"
             (myexpect
                  (formatBlockPositions TestModel.complexRoutingFunc
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
                  (ViewStructure.getMovedInfo TestModel.complexRoutingFunc.calls secondToLastMouse
                       (ViewStructure.mouseToSvgCoordinates secondToLastMouse
                            (ViewVariables.viewportWidth 100 100) ViewVariables.viewportHeight))
                  (Just (ViewStructure.MovedBlockInfo TestModel.secondToLastSine
                             (1, blockSpace + 2*lineSpaceBeforeBlock + functionHeaderHeight + blockSpacing))))
                                       
               ]
