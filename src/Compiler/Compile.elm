module Compiler.Compile exposing (compile, compileOnion)

import Dict exposing (Dict)

import BuiltIn exposing (builtInFunctions)

import Compiler.CompModel exposing (Expr, Method, CompModel, Value(..), CompileExprFunction(..))
import Compiler.CompModel as CompModel
import Compiler.OnionToExpr exposing (onionToCompModel)
    
        
                 
-- compiles a model of a program into a javascript string
-- this does no error checking- all type checking and validity checks
-- are done when compiler to comp model
compile : CompModel -> String
compile compModel =
    ""


compileOnion onion =
    case onionToCompModel onion of
        Ok compModel ->
            Ok (compile compModel)
        Err e -> Err e
