module ModelHelpers exposing (updateInput, fixInvalidInputs, idToPosition, updateCall, IdToPos, updateInputOn
                             ,updateInputAtIndex, updateFunc, removeCall, removeFunc)

import Dict exposing (Dict)

import Model exposing (..)
import BuiltIn exposing (builtInFunctions, ArgList(..))


type alias IdToPos = Dict Id Int

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
        
        
updateCallIfMatchesId : Call -> (Call -> Call) -> Id -> Call
updateCallIfMatchesId call callFunc id =
    if call.id == id
    then (callFunc call)
    else call
        
updateCallFunc : List Call -> Id -> (Call -> Call) -> List Call
updateCallFunc func id callFunc =
    case func of
        [] -> []
        (call::calls) -> (updateCallIfMatchesId call callFunc id) :: updateCallFunc calls id callFunc
        
updateCallOnion : Onion -> Id -> (Call -> Call) -> Onion
updateCallOnion onion id callFunc =
    case onion of
        [] -> []
        (func::funcs) -> {func | calls=(updateCallFunc func.calls id callFunc)} :: (updateCallOnion funcs id callFunc)
               

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
    {model | program = (updateFuncOnion model.program funcId update)}

removeFunc onion funcId =
    case onion of
        [] -> []
        (func :: funcs) ->
            if func.id == funcId then funcs else func :: (removeFunc funcs funcId)
    
        
fixInputs inputs idToPos currentIndex =
    case inputs of
        [] -> []
        (input::rest) ->
            case input of
                Output id ->
                    case Dict.get id idToPos of
                        Nothing -> (Hole) :: fixInputs rest idToPos currentIndex
                        Just index ->
                            if index >= currentIndex
                            then (Hole) :: fixInputs rest idToPos currentIndex
                            else input :: fixInputs rest idToPos currentIndex
                _ -> input :: fixInputs rest idToPos currentIndex
                       
fixCallInputs call idToPos currentIndex =
    {call | inputs = fixInputs call.inputs idToPos currentIndex}
                       
fixInvalidInputsHelper func idToPos currentIndex =
    case func of
        [] -> []
        (call::calls) ->
            (fixCallInputs call idToPos currentIndex) :: fixInvalidInputsHelper calls idToPos (currentIndex + 1)

fixInvalidInputs : Function -> Function
fixInvalidInputs func =
    let idToPos = idToPosition func Dict.empty 0
    in
        {func | calls = (fixInvalidInputsHelper func.calls idToPos 0)}


