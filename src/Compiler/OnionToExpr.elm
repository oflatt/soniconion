module Compiler.OnionToExpr exposing (onionToCompModel)
import Model exposing (..)
import BuiltIn exposing (builtInFunctions)
import Compiler.CompModel exposing (Expr, Value(..), Method, CompModel)
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
        Output o ->
            case Dict.get o idToIndex of
                Just index -> Ok (StackIndex index)
                Nothing -> Err "Invalid input found" -- this should never happen, since the ui should disallow actions that lead to it
        Text t ->
            case String.toFloat t of
                Nothing -> Err "Could not parse number"
                Just f -> Ok (ConstV f)
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
                                  
isFunctionValid : String -> Bool                                    
isFunctionValid funcName =
    Dict.member funcName builtInFunctions
    
callToExpr : Call -> IdToIndex -> Result Error Expr
callToExpr call idToIndex =
    if isFunctionValid call.functionName
    then
        case inputsToValues call.inputs idToIndex of
            Ok children -> Ok (Expr call.functionName call.id children)
            Err e -> Err e
    else
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
