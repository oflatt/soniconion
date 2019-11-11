module Compiler.CompModel exposing (..)
import Model exposing (Constant)
import Model exposing (Id)
import Array exposing (Array)

-- Environment : List Value


type Value = StackIndex Int
           | ConstV Constant

type alias CompModel = List Method

type alias Method = List Expr

type alias Expr =
    {functionName : String
    ,id : Id -- just for error messages
    ,children : List Value}




