module Compiler.Compile exposing (compile, compileOnion)

import Dict exposing (Dict)

import BuiltIn exposing (builtInFunctions)

import Compiler.CompModel exposing (Expr, Method, CompModel, Value(..), CompileExprFunction(..))
import Compiler.CompModel as CompModel
import Compiler.OnionToExpr exposing (onionToCompModel)
    
javascriptHead =
    String.join
        ""
        [
         "var startTime = getTime();"
        ,"function step(state){" -- the big loop function begins
        ,"var stack = [];"
        ,"var notes = [];"
        ,"var time = getTime()-startTime;"
        ]

javascriptTail =
    String.join
        ""
        [
         "update(state, notes);" -- update updates the playing synthesizers in javascript code
        ,"function recur() {" -- recur func with state
        ,"step(state);"
        ,"}"
        ,"window.setTimeout(recur, 0);"
        ,"}"
        ,"step(makeInitialState());" -- start the anim loop
        ]
        
-- todo: handle join function
buildExpr : Expr -> String
buildExpr expr =
    case Dict.get expr.functionName builtInFunctions of
        Nothing -> "" -- fails silently, this check should have been made already
        Just val ->
            case expr.compileExprFunction of
                CompileExprFunction func -> func expr

buildMethod : Method -> List String
buildMethod method =
    case method of
        [] -> []
        (expr::exprs) ->
            (buildExpr expr) :: (buildMethod exprs)

        
buildMethodString method =
    String.join
        ""
        (buildMethod method)
        
        
buildMethods compModel =
    case compModel of
        [] -> [javascriptTail]
        (method::methods) ->
            (buildMethodString method) :: (buildMethods methods)

pushSystemValue sysVal =
    String.join "" ["stack.push("
                   ,(Tuple.second sysVal)
                   ,");"]
                
systemValues : String
systemValues =
    String.join ""
        (List.map pushSystemValue CompModel.systemValues)

                 
-- compiles a model of a program into a javascript string
-- this does no error checking- all type checking and validity checks
-- like only referencing values that come before a funtion call
-- are done before
compile : CompModel -> String
compile compModel =
    String.join
        ""
        (javascriptHead :: systemValues :: (buildMethods compModel))


compileOnion onion =
    case onionToCompModel onion of
        Ok compModel ->
            Ok (compile compModel)
        Err e -> Err e
