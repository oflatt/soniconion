module ModelHelpers exposing (updateInput, fixInvalidInputs, idToPosition, updateCall, IdToPos, updateInputOn
                             ,updateInputAtIndex, updateFunc, removeCall, removeFunc, removeCallUnsafe
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
    
idToPosition func dict pos =
    (addFuncPos func (idToPositionCalls func.calls dict pos))

idToPositionCalls func dict pos =
    case func of
        [] -> dict
        (e::es) -> (idToPositionCalls es
                        (Dict.insert e.id pos dict)
                        (pos + 1))

isStandInInfinite call input index =
    case Dict.get call.functionName builtInFunctions of
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
             
                    

fixInputsForInfiniteArguments : List Input -> Call -> List Input
fixInputsForInfiniteArguments inputs call =
    case Dict.get call.functionName builtInFunctions of
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

                    
                     
updateInputInputs : List Input -> Int -> (Input -> Input) -> Call -> List Input
updateInputInputs inputs index inputFunc call =
    fixInputsForInfiniteArguments (updateInputAtIndex inputs index inputFunc) call

updateInputCall call id index inputFunc =
    if id == call.id
    then
        {call | inputs = updateInputInputs call.inputs index inputFunc call}
    else
        call
                        
updateInputFunc func id index inputFunc =
    case func of
        [] -> []
        (call::calls) -> updateInputCall call id index inputFunc :: updateInputFunc calls id index inputFunc

updateInputOnion : Onion -> Id -> Int -> Maybe Id -> (Input -> Input) -> Onion
updateInputOnion onion id index funcIdMaybe inputFunc =
    case onion of
        [] -> []
        (func::funcs) ->
            case funcIdMaybe of
                Just fId ->
                    if fId == func.id
                    then
                        (fixInvalidInputs {func | calls=(updateInputFunc func.calls id index inputFunc)} :: funcs)
                    else
                        func :: (updateInputOnion funcs id index funcIdMaybe inputFunc)
                Nothing -> (fixInvalidInputs {func | calls=(updateInputFunc func.calls id index inputFunc)} ::
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
        
        
updateCallIfMatchesId : Call -> (Call -> Call) -> Id -> Onion -> Call
updateCallIfMatchesId call callFunc id onion =
    if call.id == id
    then fixInputsForFunc onion (callFunc call)
    else call
        
updateCallFunc : List Call -> Id -> (Call -> Call) -> Onion -> List Call
updateCallFunc func id callFunc onion =
    case func of
        [] -> []
        (call::calls) -> (updateCallIfMatchesId call callFunc id onion) :: updateCallFunc calls id callFunc onion
        
updateCallOnion : Onion -> Id -> (Call -> Call) -> Onion
updateCallOnion onion id callFunc =
    case onion of
        [] -> []
        (func::funcs) -> {func | calls=(updateCallFunc func.calls id callFunc onion)} :: (updateCallOnion funcs id callFunc)
               

updateCall : Model -> Id -> (Call -> Call) -> (Model, Cmd Msg)
updateCall model id callFunc =
    let oldMouse = model.mouseState
        newMouse =
            {oldMouse | mouseSelection = NoneSelected}
        newOnion = updateCallOnion model.program id callFunc
    in
        ({model |
              mouseState = newMouse
              ,program = newOnion}
        ,Cmd.none)

removeCallsR calls id =
    case calls of
        [] -> []
        (call ::rest) ->
            if call.id == id
            then
                rest
            else
                call :: removeCallsR rest id
        
removeCall func id =
    fixInvalidInputs {func | calls = removeCallsR func.calls id}

-- unsafe because it doesn't fix invalid inputs
-- after placing a block, fixInvalidInputs needs to be called on the func
removeCallUnsafe func id =
    {func | calls = removeCallsR func.calls id}
        
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
                       
fixCallInputs call idToPos currentIndex validF =
    {call | inputs = fixInputs call.inputs idToPos currentIndex validF}
                       
fixInvalidInputsHelper func idToPos currentIndex validF =
    case func of
        [] -> []
        (call::calls) ->
            (fixCallInputs call idToPos currentIndex validF) :: fixInvalidInputsHelper calls idToPos (currentIndex + 1 ) validF

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
        {func | calls = (fixInvalidInputsHelper func.calls idToPos 0 validF)}

fixForArgList call argList =
    let inputs = call.inputs
    in
        (case argList of
             Infinite finite _ -> {call | inputs = (fixInfiniteInputs inputs (List.length finite))}
             Finite finite ->
                 {call | inputs = (fitInputsTo inputs (List.length finite))})
        
funcToArgList func =
    (Finite (List.repeat (List.length func.args) ""))

fixInputsForFunc onion call =
    case Dict.get call.functionName builtInFunctions of
        Just builtInSpec -> fixForArgList call builtInSpec.argList
        _ ->
            (case (Utils.findBy onion (\func -> func.name == call.functionName)) of
                 Just func -> fixForArgList call (funcToArgList func)
                 Nothing -> call)

fixAllForFunc onion func =
    let calls = func.calls
    in
        {func | calls=(List.map (fixInputsForFunc onion) calls)}
                
fixAllInvalidInputs : Onion -> Onion
fixAllInvalidInputs onion =
    List.map (fixAllForFunc onion) (List.map fixInvalidInputs onion)