module Compiler.CompModel exposing (..)

import Model exposing (Id)
import Dict exposing (Dict)

-- Environment : List Value

systemValues : List (String, String)
systemValues =
    [("time", "time")
    ,("mouseX", "window.mouseXPos")
    ,("mouseY", "window.mouseYPos")]

type Value = StackIndex Int
           | FArg Int
           | ConstV Float
           | ScriptVariable String

type CompileExprFunction = CompileExprFunction (Expr -> AST)
             
type alias CompModel = Dict String Method

type alias Method = {argCount : Int
                    ,exprs : List Expr}

type alias Expr =
    {functionName : String
    ,id : Id -- just for error messages
    ,children : List Value
    ,compileExprFunction : CompileExprFunction}


type AST = Empty
         | Lit String

         | Object (List (String, AST))
         | CopySet AST (List (String, AST))
         | Get AST AST
         | Set AST AST AST
         
         | Array (List AST)
           
         | Begin (List AST)
         | Let (List (String, AST)) AST
           
         | CallFunction AST (List AST)
         | Function (List String) AST -- arguments, body
         | For AST AST AST AST -- three parts of for loop and body
           
         | VarDeclaration AST AST
         | VarSet AST AST
         
           
         | CachePush AST
         | CacheUpdate AST AST

         | CacheRef AST

         | If AST AST AST
         | Unary String (List AST)
         | SingleOp String AST

         
false = Lit "false"
true = Lit "true"
    
forRange varName beginAST endAST bodyAST =
    For (VarDeclaration (Lit varName) beginAST)
        (Unary "<" [(Lit varName), endAST])
        (Lit (varName ++ "++"))
        bodyAST

litFloat float = (Lit (String.fromFloat float))
litInt int = (Lit (String.fromInt int))
getLit obj str = (Get obj (Lit str))
getAnchor obj = getLit obj "anchor"

maximum args =  CallFunction (Lit "Math.max") args
sum args = Unary "+" args


argName index =
    "arg" ++ (String.fromInt index)
