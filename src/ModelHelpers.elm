module ModelHelpers exposing (updateInput, fixInvalidInputs, idToPosition, updateCall, IdToPos)

import Dict exposing (Dict)

import Model exposing (..)
import BuiltIn exposing (builtInFunctions, ArgList(..))


type alias IdToPos = Dict Id Int

idToPosition func dict pos =
    case func of
        [] -> dict
        (e::es) -> idToPosition es
                   (Dict.insert e.id pos dict)
                   (pos + 1)                                

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

updateInputOnion : Onion -> Id -> Int -> (Input -> Input) -> Onion
updateInputOnion onion id index inputFunc =
    case onion of
        [] -> []
        (func::funcs) -> fixInvalidInputs (updateInputFunc func id index inputFunc) :: updateInputOnion funcs id index inputFunc
    
                        
updateInput : Model -> Id -> Int -> (Input -> Input)  -> Model
updateInput model id index inputFunc =
    let oldMouse = model.mouseState
        newMouse =
            {oldMouse | mouseSelection = NoneSelected}
        newOnion = updateInputOnion model.program id index inputFunc
    in
        {model |
             mouseState = newMouse
        ,program = newOnion}
        
        
updateCallIfMatchesId : Call -> (Call -> Call) -> Id -> Call
updateCallIfMatchesId call callFunc id =
    if call.id == id
    then (callFunc call)
    else call
        
updateCallFunc : Function -> Id -> (Call -> Call) -> Function
updateCallFunc func id callFunc =
    case func of
        [] -> []
        (call::calls) -> (updateCallIfMatchesId call callFunc id) :: updateCallFunc calls id callFunc
        
updateCallOnion : Onion -> Id -> (Call -> Call) -> Onion
updateCallOnion onion id callFunc =
    case onion of
        [] -> []
        (func::funcs) -> (updateCallFunc func id callFunc) :: (updateCallOnion funcs id callFunc)
               

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
 
fixInvalidInputs func =
    let idToPos = idToPosition func Dict.empty 0
    in
        fixInvalidInputsHelper func idToPos 0
