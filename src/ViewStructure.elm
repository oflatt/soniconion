module ViewStructure exposing (ViewStructure, getViewStructure, mouseToSvgCoordinates
                              ,BlockPosition, BlockPositions, InputPosition
                              ,countOutputsBefore, blockPositionsToPositionList
                              ,MovedBlockInfo, maybeMovedInfo)
import LineRouting exposing (LineRouting, getLineRouting, getMaxLine, getMinLine)
import Model exposing (..)
import ModelHelpers exposing (idToPosition, IdToPos)
import ViewVariables
import Utils

import Dict exposing (Dict)
import Debug exposing (log)


-- skip index of -1 if 
type alias MovedBlockInfo = {movedBlock : Block
                             ,movedPos : (Int, Int)}

mouseToSvgCoordinates: MouseState -> Int -> Int -> Int -> Int -> (Int, Int)
mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight xoffset yoffset =
    (((mouseState.mouseX+mouseState.scrollX) * (ViewVariables.viewportWidth svgScreenWidth svgScreenHeight)) // svgScreenWidth - xoffset
    ,(((mouseState.mouseY+mouseState.scrollY) - ViewVariables.svgYpos) * ViewVariables.viewportHeight) // svgScreenHeight - yoffset)

maybeMovedInfo mouseState svgScreenWidth svgScreenHeight =
    case mouseState.mouseSelection of
        BlockSelected funcId block mouseOffset ->
            Just (MovedBlockInfo
                      block
                      (mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight
                           (Tuple.first mouseOffset) (Tuple.second mouseOffset)))
        _ -> Nothing
        
-- xpos and width, with xpos relative to the block
type alias InputPosition = (Int, Int)
                     
type alias BlockPosition = {xpos: Int
                           ,ypos: Int
                           ,width: Int
                           ,inputPositions: Dict Int InputPosition}
    
type alias BlockPositions = Dict Id BlockPosition
type alias ViewStructure = {blockPositions : BlockPositions
                           ,lineRouting : LineRouting
                           ,sortedFunc : Function
                           ,id : Id
                           ,headerPos : BlockPosition
                           ,funcBlockMaxWidth : Int
                           ,funcWidth : Int
                           ,funcHeight : Int
                           ,mouseState : MouseState
                           ,svgWidth : Int
                           ,svgHeight : Int
                           ,isToolbar : Bool}

blockPositionsToPositionList func blockPositions =
    case func of
        [] -> Ok []
        (block::blocks) ->
            case Dict.get (getId block) blockPositions of
                Nothing -> Err "block not in blockPositions"
                Just pos ->
                    case blockPositionsToPositionList blocks blockPositions of
                        Err e -> Err e
                        Ok positions ->
                            Ok (pos :: positions)

-- gets extra space for the outputs of a call
countOutputsBefore : (List Input) -> Int -> Int
countOutputsBefore inputs threshhold =
    if (threshhold == 0)
    then 0
    else
        (case inputs of
             [] -> 0
             (input::rest) ->
                 (case input of
                      Output id -> 1 + (countOutputsBefore rest (threshhold-1))
                      FunctionArg index -> 1 + (countOutputsBefore rest (threshhold-1))
                      _ -> countOutputsBefore rest (threshhold-1)))

countOutputs inputs =
    (countOutputsBefore inputs (List.length inputs))

blockLinesSpace block =
    (countOutputs (getInputs block) * ViewVariables.lineSpaceBeforeBlock)

getInputWidth input =
    case input of
        Text str -> ViewVariables.numCharactersToInputWidth (String.length str)
        _ -> ViewVariables.nodeRadius*2
        
inputPositionList inputs counter currentX shouldAddTail=
    case inputs of
        [] ->
            if shouldAddTail then
                [(counter, (currentX, getInputWidth Hole))]
            else
                []
        (input::rest) ->
            let width = getInputWidth input
            in
                (counter, (currentX, width)) ::
                    (inputPositionList rest (counter+1) (currentX+width+ViewVariables.inputSpacing) shouldAddTail)
        
makeInputPositions block shouldAddTail =
    Dict.fromList (inputPositionList (getInputs block) 0 ViewVariables.inputPadding shouldAddTail)

inputPositionsMax inputPositions =
    case Dict.get ((Dict.size inputPositions)-1) inputPositions of
        Just lastPos -> (Tuple.first lastPos)+(Tuple.second lastPos) + ViewVariables.blockTextXPadding
        Nothing -> 0

getBlockWidth block inputPositions =
    case block of
       CallBlock call -> max (inputPositionsMax inputPositions) (ViewVariables.callTextBlockSize call.functionName)
       StaffBlock staff -> (ViewVariables.callTextBlockSize "placeholder")
    
        
makeBlockPosition xpos ypos block shouldCenter shouldAddTail =
    let inputPositions = (makeInputPositions block shouldAddTail)
        blockW = getBlockWidth block inputPositions
        blockXpos =
            if shouldCenter then
                xpos - (blockW//2)
            else
                xpos
        blockYpos =
            if shouldCenter then
                ypos - ViewVariables.blockHeight//2
            else ypos
    in
        (BlockPosition blockXpos blockYpos blockW inputPositions)

getHeaderBlockPos func xoffset yoffset =
    makeBlockPosition xoffset yoffset (CallBlock (Call 0 func.args func.name "")) False True

movedInfoBlockPos moveInfo =
    (makeBlockPosition (Tuple.first moveInfo.movedPos) (Tuple.second moveInfo.movedPos)
         moveInfo.movedBlock False False)
        
-- index is the index in the list but indexPos is where to draw (used for skipping positions)
getAllBlockPositions: Maybe MovedBlockInfo -> List Block -> Int -> Bool -> (List Block, BlockPositions)
getAllBlockPositions maybeMoveInfo func currentY isSpaceForMovedBlock =
    case func of
        [] -> case maybeMoveInfo of
                  Nothing -> ([], Dict.empty)
                  Just moveInfo -> ([moveInfo.movedBlock],
                                        (Dict.insert (getId moveInfo.movedBlock)
                                             (movedInfoBlockPos moveInfo)
                                             Dict.empty))
        (block::rest) ->
            let isMoved =
                    (case maybeMoveInfo of
                         Nothing -> False
                         Just moveInfo -> (Tuple.second moveInfo.movedPos) < currentY + ViewVariables.blockHeight)
                newMoveInfo =
                    if isMoved then Nothing
                    else maybeMoveInfo
                topBlock = if isMoved then Maybe.withDefault block (Maybe.map .movedBlock maybeMoveInfo) else block -- default should not happen
                restBlock = if isMoved then func else rest
                newY = if isMoved then
                           (case maybeMoveInfo of
                                Just moveInfo -> (if isSpaceForMovedBlock
                                                  then (currentY + ViewVariables.blockSpace + (blockLinesSpace moveInfo.movedBlock))
                                                  else currentY)
                                Nothing -> 0)
                       else currentY + ViewVariables.blockSpace + (blockLinesSpace block)-- should not happen!
                iteration = getAllBlockPositions newMoveInfo restBlock newY isSpaceForMovedBlock

                blockPos = if isMoved then
                               (case maybeMoveInfo of
                                    Just moveInfo -> (movedInfoBlockPos moveInfo)
                                    Nothing -> (makeBlockPosition 0 0 block False False)) -- should not happen
                           else (makeBlockPosition 0 (currentY + (blockLinesSpace block)) block False False)
            in
                (topBlock :: (Tuple.first iteration)
                ,(Dict.insert (getId topBlock) blockPos (Tuple.second iteration)))

getFuncHeaderHeight func =
    ViewVariables.functionHeaderHeight + (countOutputs func.args)*ViewVariables.lineSpaceBeforeBlock + ViewVariables.blockSpacing

fixMoveInfo xoffset yoffset maybeMove =
    case maybeMove of
        Nothing -> Nothing
        Just moveInfo ->
            let newx = (Tuple.first moveInfo.movedPos) - xoffset
                newy = (Tuple.second moveInfo.movedPos) - yoffset
            in
                Just {moveInfo | movedPos = (newx, newy)}
        
getBlockPositions: Function -> MouseState -> Int -> Int -> Maybe MovedBlockInfo -> Bool -> (Function, BlockPositions)
getBlockPositions func mouseState xoffset yoffset maybeMove isSpaceForMovedBlock =
    let fixedMoveInfo = fixMoveInfo xoffset yoffset maybeMove
        allPositions = getAllBlockPositions fixedMoveInfo func.blocks (getFuncHeaderHeight func) isSpaceForMovedBlock
    in
        ({func | blocks=(Tuple.first allPositions)}, (Tuple.second allPositions))

            
getMaxBlockWidth blockPositions topBlock =
    Dict.foldr
        (\key blockpos acc ->
             max blockpos.width acc)
        topBlock.width
        blockPositions

getMaxBlockBottom blockPositions =
    Dict.foldr
        (\key blockpos acc ->
             max (blockpos.ypos+ViewVariables.blockHeight) acc)
        0
        blockPositions

fixLeftForMoveInfo withoutLeft maybeMove leftW =
    case maybeMove of
        Nothing -> withoutLeft
        Just moveInfo ->
            case Dict.get (getId moveInfo.movedBlock) withoutLeft of
                Just blockPos ->
                    let newx = blockPos.xpos-leftW
                    in
                        Dict.insert (getId moveInfo.movedBlock) {blockPos | xpos = newx} withoutLeft
                Nothing -> withoutLeft
             
getViewStructure func mouseState svgScreenWidth svgScreenHeight xoffset yoffset maybeMoveInfo isToolbar =
    let blockTuple = (getBlockPositions func mouseState xoffset yoffset maybeMoveInfo (not isToolbar))
        sortedFunc = Tuple.first blockTuple
        blockPositionsWithoutLeftWidth = Tuple.second blockTuple
        
                         
        
        lineRouting = getLineRouting sortedFunc
        maxWidth = getMaxBlockWidth blockPositions topBlockPosition
        leftWidth = -(getMinLine lineRouting)* ViewVariables.lineXSpace
        rightWidth = (getMaxLine lineRouting) * ViewVariables.lineXSpace
        blockPositions = fixLeftForMoveInfo blockPositionsWithoutLeftWidth maybeMoveInfo leftWidth
        totalWidth = leftWidth + rightWidth + maxWidth
        topBlockPosition = getHeaderBlockPos func (xoffset + leftWidth) yoffset
        funcHeight = getMaxBlockBottom blockPositions
    in
        (ViewStructure
             blockPositions
             lineRouting
             sortedFunc
             sortedFunc.id
             topBlockPosition
             maxWidth
             totalWidth
             funcHeight
             mouseState
             svgScreenWidth
             svgScreenHeight
             isToolbar)

