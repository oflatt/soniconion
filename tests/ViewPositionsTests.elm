module ViewPositionsTests exposing (..)


import Expect exposing (Expectation)
import Test exposing (..)
import Model exposing (..)
import Array exposing (Array)
import Dict exposing (Dict)

import TestModel exposing (myexpect)
import ModelHelpers
import ViewStructure exposing (MovedBlockInfo)
import ViewVariables exposing (functionXSpacing, blockSpace, lineSpaceBeforeBlock, blockSpacing
                              ,functionHeaderHeight)
                

blockPositionToNormalYpos blockPos = blockPos.ypos - (functionHeaderHeight + blockSpacing)

formatBlockPositions : Function -> MouseState -> Maybe MovedBlockInfo -> Result String (List Int)
formatBlockPositions testFunc mouse blockInfo =
    Result.map (List.map blockPositionToNormalYpos)
        (ViewStructure.blockPositionsToPositionList
             testFunc.calls
             (ViewStructure.getViewStructure
                  (case blockInfo of
                       Nothing -> testFunc
                       Just info -> (ModelHelpers.removeCallUnsafe testFunc info.movedCall.id))
                  mouse ViewVariables.viewportHeight ViewVariables.viewportHeight 0 0 blockInfo False).blockPositions)

            
emptyMouse = (MouseState 0 0 0 0 NoneSelected)


             
secondToLastMouse = (MouseState (ViewVariables.funcInitialX + 20)
                         (ViewVariables.svgYpos + functionHeaderHeight + blockSpacing
                              +blockSpace+2*lineSpaceBeforeBlock
                              +(ViewVariables.blockHeight//2))
                         0
                         0
                         (BlockSelected 0 TestModel.complex3))

maybeSecond = (ViewStructure.maybeMovedInfo secondToLastMouse ViewVariables.viewportHeight
                   (ViewVariables.viewportWidth ViewVariables.viewportHeight ViewVariables.viewportHeight))

              
                    
blockPositionsTest : Test
blockPositionsTest =
    describe "getBlockPositions"
        [test "test func"
             (myexpect
                  (formatBlockPositions TestModel.testFunction emptyMouse Nothing)
                  (Ok [0
                      ,blockSpace
                      ,blockSpace*2 + 2*lineSpaceBeforeBlock
                      ,blockSpace*3 + (1+2)*lineSpaceBeforeBlock]))
        ,test "complex connections"
             (myexpect
                  (formatBlockPositions TestModel.complexRoutingFunc emptyMouse Nothing)
                  (Ok [0
                      ,blockSpace + lineSpaceBeforeBlock
                      ,blockSpace*2 + (1+1)*lineSpaceBeforeBlock
                      ,blockSpace*3 + (1+1+2)*lineSpaceBeforeBlock
                      ,blockSpace*4 + (1+1+2+2)*lineSpaceBeforeBlock]))
        ,test "move block two up"
             (myexpect
                  (formatBlockPositions TestModel.complexRoutingFunc
                       secondToLastMouse maybeSecond)
                  (Ok [0
                      ,blockSpace*2 + (1+2)*lineSpaceBeforeBlock
                      ,blockSpace*3 + (1+2+1)*lineSpaceBeforeBlock
                      ,secondToLastMouse.mouseY-ViewVariables.svgYpos-functionHeaderHeight-blockSpacing-ViewVariables.blockHeight//2
                      ,blockSpace*4 + (1+1+2+2)*lineSpaceBeforeBlock]))]


movedInfoTest : Test
movedInfoTest =
    describe "getMovedInfo"
        [test "test select second to last"
             (myexpect
                  maybeSecond
                  (Just (ViewStructure.MovedBlockInfo TestModel.complex3
                             (secondToLastMouse.mouseX, secondToLastMouse.mouseY-ViewVariables.svgYpos))))
               ]
