module ViewStructure exposing (ViewStructure, getViewStructure, mouseToSvgCoordinates
                              ,BlockPosition, BlockPositions, InputPosition
                              ,countOutputsBefore, blockPositionsToPositionList
                              ,MovedBlockInfo, getMovedInfo)
import LineRouting exposing (LineRouting, getLineRouting, getMaxLine, getMinLine)
import Model exposing (..)
import ModelHelpers exposing (idToPosition, IdToPos)
import ViewVariables
import Utils

import Dict exposing (Dict)
import Debug exposing (log)


-- skip index of -1 if 
type alias MovedBlockInfo = {movedCall : Call
                             ,movedPos : (Int, Int)}

    
mouseToSvgCoordinates: MouseState -> Int -> Int -> Int -> Int -> (Int, Int)
mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight xoffset yoffset =
    (((mouseState.mouseX+mouseState.scrollX) * (ViewVariables.viewportWidth svgScreenWidth svgScreenHeight)) // svgScreenWidth - xoffset
    ,(((mouseState.mouseY+mouseState.scrollY) - ViewVariables.svgYpos) * ViewVariables.viewportHeight) // svgScreenHeight - yoffset)

svgYposToIndex: Int -> Int
svgYposToIndex yPos =
    yPos // (ViewVariables.blockSpace)
    
getMovedInfo func mouseState mouseSvgCoordinates =
    case func of
        [] -> Nothing
        (call::calls) ->
            case mouseState.mouseSelection of
                BlockSelected funcId selectedCall ->
                    if selectedCall.id == call.id
                    then
                        Nothing
                        --Just (MovedBlockInfo
                         --         call
                          --        ((Tuple.first (mouseSvgCoordinates funcx funcy))
                           --       ,(Tuple.second (mouseSvgCoordinates funcx funcy)) - (ViewVariables.blockHeight // 2))) -- center block on mouse
                    else getMovedInfo calls mouseState mouseSvgCoordinates
                _ -> getMovedInfo calls mouseState mouseSvgCoordinates

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
        (call::calls) ->
            case Dict.get call.id blockPositions of
                Nothing -> Err "block not in blockPositions"
                Just pos ->
                    case blockPositionsToPositionList calls blockPositions of
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
                           
callLinesSpace call =
    (countOutputs call.inputs) * ViewVariables.lineSpaceBeforeBlock

getInputWidth input =
    case input of
        Text str -> ViewVariables.numCharactersToInputWidth (String.length str)
        _ -> ViewVariables.nodeRadius*2
        
inputPositionList inputs counter currentX =
    case inputs of
        [] -> []
        (input::rest) ->
            let width = getInputWidth input
            in
                (counter, (currentX, width)) :: (inputPositionList rest (counter+1) (currentX+width+ViewVariables.inputSpacing))
        
makeInputPositions call =
    Dict.fromList (inputPositionList call.inputs 0 ViewVariables.inputPadding)

inputPositionsMax inputPositions =
    case Dict.get ((Dict.size inputPositions)-1) inputPositions of
        Just lastPos -> (Tuple.first lastPos)+(Tuple.second lastPos) + ViewVariables.blockTextXPadding
        Nothing -> 0

        
getBlockWidth call inputPositions =
    max (inputPositionsMax inputPositions) (ViewVariables.callTextBlockSize call.functionName)
        
makeBlockPosition xpos ypos call shouldCenterX =
    let inputPositions = (makeInputPositions call)
        blockW = getBlockWidth call inputPositions
        blockXpos =
            if shouldCenterX then
                xpos - (blockW//2)
            else
                xpos
    in
        (BlockPosition blockXpos ypos blockW inputPositions)

getHeaderBlockPos func xoffset yoffset =
    makeBlockPosition xoffset yoffset (Call 0 func.args func.name "") False
        
-- index is the index in the list but indexPos is where to draw (used for skipping positions)
getAllBlockPositions: Id -> Maybe MovedBlockInfo -> List Call -> Int -> BlockPositions
getAllBlockPositions idToSkip maybeMoveInfo func currentY =
    let iterate = (\call calls ->
                       Dict.insert call.id (makeBlockPosition 0 (currentY+(callLinesSpace call)) call False)
                           (getAllBlockPositions idToSkip maybeMoveInfo calls
                                (currentY+ViewVariables.blockSpace+(callLinesSpace call))))
    in
        case func of
            [] -> Dict.empty
            (call::calls) ->
                if call.id == idToSkip
                then (getAllBlockPositions idToSkip maybeMoveInfo calls currentY)
                else
                    case maybeMoveInfo of
                        Just moveInfo ->
                            if currentY+ViewVariables.blockHeight > (Tuple.second moveInfo.movedPos)
                            then
                                (getAllBlockPositions idToSkip Nothing func -- continue with whole func
                                     (currentY+ViewVariables.blockSpace+(callLinesSpace moveInfo.movedCall)))
                            else
                                -- iterate normally
                                (iterate call calls)
                                    
                        Nothing -> (iterate call calls)


getFuncHeaderHeight func =
    ViewVariables.functionHeaderHeight + (countOutputs func.args) + ViewVariables.blockSpacing
                                   
                      
getBlockPositions: Function -> MouseState -> Int -> Int -> Int -> Int -> BlockPositions
getBlockPositions func mouseState svgScreenWidth svgScreenHeight xoffset yoffset =
    let moveInfo = getMovedInfo func.calls mouseState (mouseToSvgCoordinates mouseState svgScreenWidth svgScreenHeight)
        idToSkip =
            case moveInfo of
                Just info -> info.movedCall.id
                Nothing -> -1
        positionsWithoutMoved = getAllBlockPositions idToSkip moveInfo func.calls (getFuncHeaderHeight func)
    in
        case moveInfo of
            Just info -> (Dict.insert
                              info.movedCall.id
                              (makeBlockPosition (Tuple.first info.movedPos) (Tuple.second info.movedPos) info.movedCall True)
                              positionsWithoutMoved)
            Nothing -> positionsWithoutMoved

makeSortedFunc func blockPositions =
    List.sortBy (blockSorter blockPositions) func.calls

blockSorter blockPositions call =
    case Dict.get call.id blockPositions of
        Nothing -> -100 -- todo some sort of error handeling
        Just pos -> pos.ypos
                   
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
                    
getViewStructure func mouseState svgScreenWidth svgScreenHeight xoffset yoffset isToolbar =
    let blockPositions = (getBlockPositions func mouseState svgScreenWidth svgScreenHeight xoffset yoffset)
        sortedFunc = {func | calls=(makeSortedFunc func blockPositions)}
        lineRouting = getLineRouting sortedFunc
        maxWidth = getMaxBlockWidth blockPositions topBlockPosition
        leftWidth = -(getMinLine lineRouting)* ViewVariables.lineXSpace
        rightWidth = (getMaxLine lineRouting) * ViewVariables.lineXSpace
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

