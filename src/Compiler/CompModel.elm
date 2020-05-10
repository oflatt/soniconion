module Compiler.CompModel exposing (..)

import Model exposing (Id)
import Array exposing (Array)

-- Environment : List Value

systemValues : List (String, String)
systemValues =
    [("time", "time")
    ,("mouseX", "window.mouseXPos")
    ,("mouseY", "window.mouseYPos")]

type Value = StackIndex Int
           | ConstV Float

type CompileExprFunction = CompileExprFunction (Expr -> AST)
             
type alias CompModel = List Method

type alias Method = List Expr

type alias Expr =
    {functionName : String
    ,id : Id -- just for error messages
    ,children : List Value
    ,compileExprFunction : CompileExprFunction}


type AST = Begin (List AST)
         | CallFunction AST (List AST)
         | VarDeclaration AST AST
         | VarSet AST AST
         | Literal String

         | Function (List String) (List AST) AST -- arguments, body, return value
           
         | CachePushNull
         | CachePush AST
         | CacheUpdate AST AST
         | NotesPush AST
         | FunctionsPush AST

         | CacheRef AST
         | FunctionRef AST

         | If AST AST AST
         | Unary String AST AST
         | SingleOp String AST

           
         | Note AST -- frequency
         | Empty

    
