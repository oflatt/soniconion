module ModelHelpers exposing (updateInput, fixInvalidInputs, idToPosition, updateBlock, IdToPos, updateInputOn
                             ,updateInputAtIndex, updateFunc, removeBlock, removeFunc, removeBlockUnsafe
                             ,fixAllInvalidInputs, getFunc, isStandInInfinite, OnionMap, makeOnionMap
                             ,funcToArgList)

import Dict exposing (Dict)

import Model exposing (..)
import Utils
import BuiltIn exposing (builtInFunctions, ArgList(..))
import Result exposing (andThen)

type alias IdToPos = Dict Id Int
type alias OnionMap = Dict String Function -- name of func to function

addFuncPos func idToPos =
    Dict.insert func.id -1 idToPos
    
idToPosition : Function -> IdToPos -> Int -> IdToPos
idToPosition func dict pos =
    (addFuncPos func (idToPositionBlocks func.blocks dict pos))

idToPositionBlocks func dict pos =
    case func of
        [] -> dict
        (block::blocks) -> (idToPositionBlocks blocks
                                               (Dict.insert (getId block) pos dict)
                                               (pos + 1))

isStandInInfinite block input index =
    case Dict.get (getFunctionName block) builtInFunctions of
        Nothing -> False
        Just builtInSpec ->
            case builtInSpec.argList of
                Infinite base lastname -> index >= (List.length base)
                _ -> False
                   
eliminateHoles inputs =
    case inputs of
        [] -> [Hole]
        (input::rest) ->
            case input of
                Hole -> eliminateHoles rest
                _ -> input :: eliminateHoles rest
                    
eliminateHolesAfter inputs mandatoryLength =
    case mandatoryLength of
        0 -> eliminateHoles inputs
        _ -> (eliminateHolesAfter inputs (mandatoryLength-1))
             
fixInfiniteInputs inputs mandatoryLength = 
    (eliminateHolesAfter inputs mandatoryLength)

fitInputsTo inputs mandatoryLength =
    if ((List.length inputs) > mandatoryLength) then
        (List.take mandatoryLength inputs)
    else
        (if (List.length inputs) < mandatoryLength then
             (inputs ++ (List.repeat (mandatoryLength-(List.length inputs)) Hole))
             else inputs)
             
                    

fixInputsForInfiniteArguments : List Input -> Block -> List Input
fixInputsForInfiniteArguments inputs block =
    case Dict.get (getFunctionName block) builtInFunctions of
        Nothing -> inputs
        Just builtInSpec ->
            case builtInSpec.argList of
                Infinite base lastName -> fixInfiniteInputs inputs (List.length base)
                _ -> inputs
                                

updateInputAtIndex : List Input -> Int -> (Input -> Input) -> List Input
updateInputAtIndex inputs index inputFunc =
    case inputs of
        [] -> []
        (thisinput::rest) ->
            if index == 0
            then (inputFunc thisinput) :: rest
            else
                thisinput :: updateInputAtIndex rest (index - 1) inputFunc

                    
                     
updateInputInputs : List Input -> Int -> (Input -> Input) -> Block -> List Input
updateInputInputs inputs index inputFunc block =
    fixInputsForInfiniteArguments (updateInputAtIndex inputs index inputFunc) block

updateInputBlock block id index inputFunc =
    if id == (getId block)
    then
        (setInputs block (updateInputInputs (getInputs block) index inputFunc block))
    else
        block
                        
updateInputFunc func id index inputFunc =
    case func of
        [] -> []
        (block::blocks) -> updateInputBlock block id index inputFunc :: updateInputFunc blocks id index inputFunc

updateInputOnion : Onion -> Id -> Int -> Maybe Id -> (Input -> Input) -> Onion
updateInputOnion onion id index funcIdMaybe inputFunc =
    case onion of
        [] -> []
        (func::funcs) ->
            case funcIdMaybe of
                Just fId ->
                    if fId == func.id
                    then
                        (fixInvalidInputs {func | blocks=(updateInputFunc func.blocks id index inputFunc)} :: funcs)
                    else
                        func :: (updateInputOnion funcs id index funcIdMaybe inputFunc)
                Nothing -> (fixInvalidInputs {func | blocks=(updateInputFunc func.blocks id index inputFunc)} ::
                                updateInputOnion funcs id index funcIdMaybe inputFunc)
    
                        
updateInputOn : Model -> Id -> Int -> Maybe Id -> (Input -> Input)  -> Model
updateInputOn model id index funcIdMaybe inputFunc =
    let oldMouse = model.mouseState
        newMouse =
            {oldMouse | mouseSelection = NoneSelected}
        newOnion = updateInputOnion model.program id index funcIdMaybe inputFunc
    in
        {model |
             mouseState = newMouse
        ,program = newOnion}

updateInput model id index inputFunc =
    updateInputOn model id index Nothing inputFunc
        
        
updateBlockIfMatchesId : Block -> (Block -> Block) -> Id -> Onion -> Block
updateBlockIfMatchesId block blockFunc id onion =
    if (getId block) == id
    then fixInputsForFunc onion (blockFunc block)
    else block
        
updateBlockFunc : List Block -> Id -> (Block -> Block) -> Onion -> List Block
updateBlockFunc func id blockFunc onion =
    case func of
        [] -> []
        (block::blocks) -> (updateBlockIfMatchesId block blockFunc id onion) :: updateBlockFunc blocks id blockFunc onion
        
updateBlockOnion : Onion -> Id -> (Block -> Block) -> Onion
updateBlockOnion onion id blockFunc =
    case onion of
        [] -> []
        (func::funcs) -> {func | blocks=(updateBlockFunc func.blocks id blockFunc onion)} :: (updateBlockOnion funcs id blockFunc)
               

updateBlock : Model -> Id -> (Block -> Block) -> (Model, Cmd Msg)
updateBlock model id blockFunc =
    let oldMouse = model.mouseState
        newMouse =
            {oldMouse | mouseSelection = NoneSelected}
        newOnion = updateBlockOnion model.program id blockFunc
    in
        ({model |
              mouseState = newMouse
              ,program = newOnion}
        ,Cmd.none)

removeBlocksR blocks id =
    case blocks of
        [] -> []
        (block ::rest) ->
            if (getId block) == id
            then
                rest
            else
                block :: removeBlocksR rest id
        
removeBlock func id =
    fixInvalidInputs {func | blocks = removeBlocksR func.blocks id}

-- unsafe because it doesn't fix invalid inputs
-- after placing a block, fixInvalidInputs needs to be called on the func
removeBlockUnsafe func id =
    {func | blocks = removeBlocksR func.blocks id}
        
updateFuncOnion onion funcId update =
    case onion of
        [] -> []
        (func::funcs) ->
            if func.id == funcId
            then
                (update func) :: funcs
            else
                func :: (updateFuncOnion funcs funcId update)
        
updateFunc model funcId update =
    {model | program = fixAllInvalidInputs (updateFuncOnion model.program funcId update)}

getFunc : List Function -> Id -> Maybe Function
getFunc onion id =
    case onion of
        [] -> Nothing
        (f::rest) ->
            if f.id == id
            then
                Just f
            else getFunc rest id

        
removeFunc onion funcId =
    case onion of
        [] -> []
        (func :: funcs) ->
            if func.id == funcId then funcs else func :: (removeFunc funcs funcId)
    
        
fixInputs inputs idToPos currentIndex validF =
    case inputs of
        [] -> []
        (input::rest) ->
            case input of
                Output id ->
                    case Dict.get id idToPos of
                        Nothing -> (Hole) :: fixInputs rest idToPos currentIndex validF
                        Just index ->
                            if index >= currentIndex
                            then (Hole) :: fixInputs rest idToPos currentIndex validF
                            else input :: fixInputs rest idToPos currentIndex validF
                FunctionArg index ->
                    if validF index then
                        input :: fixInputs rest idToPos currentIndex validF
                    else (Hole) :: fixInputs rest idToPos currentIndex validF
                _ -> input :: fixInputs rest idToPos currentIndex validF
                       
fixBlockInputs block idToPos currentIndex validF =
    (setInputs block (fixInputs (getInputs block) idToPos currentIndex validF))
                       
fixInvalidInputsHelper func idToPos currentIndex validF =
    case func of
        [] -> []
        (block::blocks) ->
            (fixBlockInputs block idToPos currentIndex validF) :: fixInvalidInputsHelper blocks idToPos (currentIndex + 1 ) validF

validFunctionArg header pos =
    case header of
        [] -> False
        (h::rest) ->
            if pos == 0
            then
                (case h of
                     Text _ -> False
                     _ -> True)
            else validFunctionArg rest (pos-1)



makeOnionMap : Onion -> Result Error OnionMap
makeOnionMap onion =
    case onion of
        [] -> Ok Dict.empty
        (func::funcs) ->
            (makeOnionMap funcs)
                |> andThen
                   (\currentMap ->
                     if Dict.member func.name currentMap
                     then Err ("Cannot define two functions with the name " ++ func.name)
                     else
                         Ok (Dict.insert func.name func currentMap))

                
fixInvalidInputs : Function -> Function
fixInvalidInputs func =
    let idToPos = idToPosition func Dict.empty 0
        validF = validFunctionArg func.args
    in
        {func | blocks = (fixInvalidInputsHelper func.blocks idToPos 0 validF)}

fixForArgList block argList =
    let inputs = (getInputs block)
    in
        (case argList of
             Infinite finite _ -> (setInputs block (fixInfiniteInputs inputs (List.length finite)))
             Finite finite ->
                 (setInputs block (fitInputsTo inputs (List.length finite))))
        
funcToArgList func =
    (Finite (List.repeat (List.length func.args) ""))

fixInputsForFunc onion block =
    case Dict.get (getFunctionName block) builtInFunctions of
        Just builtInSpec -> fixForArgList block builtInSpec.argList
        _ ->
            (case (Utils.findBy onion (\func -> func.name == (getFunctionName block))) of
                 Just func -> fixForArgList block (funcToArgList func)
                 Nothing -> block)

fixAllForFunc onion func =
    let blocks = func.blocks
    in
        {func | blocks=(List.map (fixInputsForFunc onion) blocks)}
                
fixAllInvalidInputs : Onion -> Onion
fixAllInvalidInputs onion =
    List.map (fixAllForFunc onion) (List.map fixInvalidInputs onion)
