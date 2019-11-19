module Compiler.Compile exposing (compile, compileOnion)

import Dict exposing (Dict)

import BuiltIn exposing (waveFunctions)

import Compiler.CompModel exposing (Expr, Method, CompModel, Value(..))
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
        ,"window.requestAnimationFrame(recur);"
        ,"}"
        ,"step(makeInitialState());" -- start the anim loop
        ]

buildValue val =
    case val of
        StackIndex i ->
            "stack[" ++ (String.fromInt i) ++ "]"
        ConstV c ->
            String.fromFloat c
        
buildWave valList =
    case valList of
        (time::frequency::duration::[]) ->
            let timeStr = buildValue time
                frequencyStr = buildValue frequency
                durationStr = buildValue duration
                endStr = "(" ++ timeStr ++ "+" ++ durationStr ++ ")"
            in
                String.join
                    ""
                    [
                     "stack.push("
                    ,endStr
                    ,");"
                        
                    ,"if(time>"
                    ,timeStr
                    ," && time<"
                    ,endStr
                    ,"){"
                        
                    ,"notes.push({frequency: "
                    ,frequencyStr
                    ,"});"

                    ,"}"
                    ]
        _ -> "" -- fail silently
        
-- todo: handle join function
buildExpr : Expr -> String
buildExpr expr =
    case Dict.get expr.functionName waveFunctions of
        Nothing -> "" -- fails silently, this check should have been made already
        Just val ->
            buildWave expr.children

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
        
                 
-- compiles a model of a program into a javascript string
-- this does no error checking- all type checking and validity checks
-- like only referencing values that come before a funtion call
-- are done before
compile : CompModel -> String
compile compModel =
    String.join
        ""
        (javascriptHead :: (buildMethods compModel))


compileOnion onion =
    case onionToCompModel onion of
        Ok compModel ->
            Ok (compile compModel)
        Err e -> Err e
