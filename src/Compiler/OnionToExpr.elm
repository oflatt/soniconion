module Compiler.OnionToExpr exposing (onionToCompModel)
import Model exposing (..)
import ModelHelpers exposing (OnionMap, makeOnionMap, funcToArgList)
import BuiltIn exposing (builtInFunctions, BuiltInVariableValue(..), ArgList(..))
import Compiler.CompModel exposing (Expr, Value(..), Method, CompModel, CompileExprFunction(..))
import Compiler.CompModel as CompModel
import Compiler.CompileBuiltIn exposing (buildFuncCall)
import Utils exposing (resultMap)

import Debug exposing (log)
import Json.Encode as Encode
import Dict exposing (Dict)
import Set exposing (Set)
import Tuple
import List
import Result exposing (andThen)




type alias IdToIndex = Dict Id Int

makeIdToIndex : List Call -> Dict Id Int -> Int -> Dict Id Int
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
                Just (JavaScript varName) -> Ok (ScriptVariable varName)
        FunctionArg index -> Ok (FArg index)
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

checkCorrectNumberArguments argList inputs =
    case argList of
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
argumentSubset argList inputs =
    case argList of
        Finite args -> inputs
        Infinite args othername -> dropFinalHole inputs
                    
callToExprWith call idToIndex argList compileExprFunction =
    let filteredInputs = argumentSubset argList call.inputs
    in
        if (checkCorrectNumberArguments argList filteredInputs)
        then
            (case inputsToValues filteredInputs idToIndex of
                 Ok children -> Ok (Expr call.functionName call.id children compileExprFunction)
                 Err e -> Err e)
        else
            Err "Wrong number of arguments"
                    
callToExpr : Call -> IdToIndex -> OnionMap -> Result Error Expr
callToExpr call idToIndex onionMap =
    case Dict.get call.functionName builtInFunctions of
        Just builtIn ->
            callToExprWith call idToIndex builtIn.argList builtIn.compileExprFunction
        Nothing ->
            case Dict.get call.functionName onionMap of
                Just func -> callToExprWith call idToIndex
                             (funcToArgList func) (CompileExprFunction buildFuncCall)
                _ -> Err "Not a function name"


callsToExprs : List Call -> OnionMap -> IdToIndex -> Result Error (List Expr)
callsToExprs calls onionMap idToIndex =
    resultMap (\call -> (callToExpr call idToIndex onionMap)) calls

checkName func =
    if String.isEmpty func.name
    then
        Err "Empty function name"
    else
        if String.contains " " func.name
        then
            Err "No whitespace allowed in function name"
        else
            Ok func.name

        
functionToMethod : OnionMap -> Function -> Result Error (String, Method)
functionToMethod onionMap func =
    let idToPos = makeIdToIndex func.calls Dict.empty 0
        funcName = checkName func
    in
        Result.map2
            (\exprs name -> (name, (Method (List.length func.args) exprs)))
            (callsToExprs func.calls onionMap idToPos)
            funcName
                

    
                    
onionToCompModel : Onion -> Result Error CompModel
onionToCompModel onion =
    (makeOnionMap onion)
        |> andThen
           (\onionMap ->
                Result.map Dict.fromList
                    (resultMap (functionToMethod onionMap) onion))
            
