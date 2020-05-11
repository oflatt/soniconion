module Compiler.OnionToExpr exposing (onionToCompModel)
import Model exposing (..)
import BuiltIn exposing (builtInFunctions, BuiltInVariableValue(..), ArgList(..))
import Compiler.CompModel exposing (Expr, Value(..), Method, CompModel)
import Compiler.CompModel as CompModel
import Utils

import Debug exposing (log)
import Json.Encode as Encode
import Dict exposing (Dict)
import Tuple
import List
import Result exposing (andThen)



type alias IdToIndex = Dict Id Int

makeIdToIndex : Function -> Dict Id Int -> Int -> Dict Id Int
makeIdToIndex func dict index =
    case func of
        [] -> dict
        (e::es) -> makeIdToIndex es 
                   (Dict.insert e.id index dict)
                   (index + 1)

inputToValue input idToIndex =
    case input of
        Output output ->
            case Dict.get output idToIndex of
                Just index -> Ok (StackIndex index)
                Nothing -> Err "Invalid input found" -- this should never happen, since the ui should disallow actions that lead to it
        Text text ->
            case Dict.get text BuiltIn.builtInVariables of
                Nothing ->
                    (case String.toFloat text of
                         Nothing -> Err "Could not parse number"
                         Just float -> Ok (ConstV float))
                Just (Number value) -> Ok (ConstV value)
                Just (StackReference index) -> Ok (StackIndex index)
        Hole -> Err "No argument supplied to a function call"

                
inputsToValues : List Input -> IdToIndex -> Result Error (List Value)
inputsToValues inputs idToIndex =
    case inputs of
        [] -> Ok []
        (input::rest) ->
            Result.map2
                (::)
                (inputToValue input idToIndex)
                (inputsToValues rest idToIndex)

checkCorrectNumberArguments builtIn inputs =
    case builtIn.argList of
        Finite args -> (List.length inputs) >= (List.length args)
        Infinite args othername -> (List.length inputs) >= (List.length args)

dropFinalHole argList =
    case argList of
        [] -> []
        [finalArg] ->
            case finalArg of
                Hole -> []
                _ -> argList
        (arg::args) -> arg :: dropFinalHole args
                                   
-- drops the hole at the end of inifinite arguments
argumentSubset builtIn inputs =
    case builtIn.argList of
        Finite args -> inputs
        Infinite args othername -> dropFinalHole inputs
                    
callToExprBuiltIn builtIn call idToIndex =
    let filteredInputs = argumentSubset builtIn call.inputs
    in
        if (checkCorrectNumberArguments builtIn filteredInputs)
        then
            (case inputsToValues filteredInputs idToIndex of
                 Ok children -> Ok (Expr call.functionName call.id children builtIn.compileExprFunction)
                 Err e -> Err e)
        else
            Err "Wrong number of arguments"
                    
callToExpr : Call -> IdToIndex -> Result Error Expr
callToExpr call idToIndex =
    case Dict.get call.functionName builtInFunctions of
        Just builtIn ->
            callToExprBuiltIn builtIn call idToIndex
        Nothing ->
            Err "Not a built in function"


functionToMethod : Function -> IdToIndex -> Result Error Method
functionToMethod function idToIndex =
    case function of
        [] -> Ok []
        (call::calls) ->
            Result.map2
                (::)
                (callToExpr call idToIndex)
                (functionToMethod calls idToIndex)
  
        
onionToCompModel : Onion -> Result Error CompModel
onionToCompModel onion =
    case onion of
        [] -> Ok []
        (f::fs) ->
            case functionToMethod f (makeIdToIndex f Dict.empty 0) of
                Ok method ->
                    case onionToCompModel fs of
                        Ok rest -> Ok (method :: rest)
                        Err e -> Err e
                Err e -> Err e
