module Compiler.HandleTailRecursion exposing (returnContinuation)

import ModelHelpers exposing (OnionMap)

import Compiler.CompModel exposing (Expr, Value(..), Method, CompModel, CompileExprFunction(..), AST(..)
                                   ,false, true)
import Compiler.CompModel as CompModel
import Compiler.CompileBuiltIn exposing (buildTailFuncCall, buildIf)


import Array exposing (Array)
import Dict exposing (Dict)

arrayIncrement arr index =
    Array.set index (1+(Maybe.withDefault 0 (Array.get index arr))) arr

addChildren children numRefs =
    case children of
        [] -> numRefs
        (child::rest) ->
            case child of
                StackIndex i -> (addChildren rest (arrayIncrement numRefs i))
                _ -> (addChildren rest numRefs)

makeNumRefs exprs numRefs =
    case exprs of
        [] -> numRefs
        (expr::rest) ->
            makeNumRefs rest (addChildren expr.children numRefs)

tailFunc : (Array Expr) -> Int -> Expr -> (Array Int) -> Array Expr
tailFunc exprArr pos expr numRefs =
    case Array.get pos numRefs of
        Just n ->
            if n<2 then
                Array.set pos {expr | compileExprFunction = (CompileExprFunction buildTailFuncCall)} exprArr
            else
                normalTail exprArr pos expr
        _ -> normalTail exprArr pos expr
    

buildCont expr =
    case expr.compileExprFunction of
        CompileExprFunction func ->
            CompileExprFunction (\e -> (Arr [false, func e]))
        
normalTail exprArr pos expr =
    Array.set pos {expr | compileExprFunction=buildCont expr} exprArr


makeContinuations : (Array Expr) -> Array Int -> Int -> OnionMap -> Array Expr
makeContinuations exprArr numRefs pos onionMap =
    case Array.get pos exprArr of
        Nothing -> exprArr -- todo add error handling
        Just expr ->
            case expr.functionName of
                "if" ->
                    case expr.children of
                        (cond::left::[right]) ->
                            let leftRecur =
                                    case left of
                                        StackIndex p -> makeContinuations exprArr numRefs p onionMap
                                        _ -> exprArr
                                leftWrap = case left of
                                               StackIndex p -> False
                                               _ -> True
                                rightWrap = case right of
                                                StackIndex p -> False
                                                _ -> True
                                rightRecur = case right of
                                                 StackIndex p -> makeContinuations leftRecur numRefs p onionMap
                                                 _ -> leftRecur
                            in
                                Array.set pos {expr | compileExprFunction=
                                                   (CompileExprFunction (buildIf leftWrap rightWrap))}
                                    rightRecur
                        _ -> exprArr -- todo add error handling
                other ->
                    case Dict.get other onionMap of
                        Just func -> tailFunc exprArr pos expr numRefs
                        _ -> normalTail exprArr pos expr
                
returnContinuation : OnionMap -> (List Expr) -> (List Expr)
returnContinuation onionMap exprs =
    let exprArr = Array.fromList exprs
        numRefs = makeNumRefs exprs (Array.repeat (Array.length exprArr) 0)
    in
        Array.toList (makeContinuations exprArr numRefs ((Array.length exprArr)-1) onionMap)
