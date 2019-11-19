module Compiler.CompModel exposing (..)

import Model exposing (Id)
import Array exposing (Array)

-- Environment : List Value


type Value = StackIndex Int
           | ConstV Float

type alias CompModel = List Method

type alias Method = List Expr

type alias Expr =
    {functionName : String
    ,id : Id -- just for error messages
    ,children : List Value}

