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


type AST = Empty
         | Literal String

         | Begin (List AST)
         | CallFunction AST (List AST)
         | Function (List String) AST -- arguments, body
         | For AST AST AST AST -- three parts of for loop and body
           
         | VarDeclaration AST AST
         | VarSet AST AST
         
           
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

         

    
forRange varName beginAST endAST bodyAST =
    For (VarDeclaration (Literal varName) beginAST)
        (Unary "<" (Literal varName) endAST)
        (Literal (varName ++ "++"))
        bodyAST
