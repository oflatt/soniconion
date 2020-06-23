module Compiler.CompileFunction exposing (compileFunction, getValueFunctionAST, getCacheValue)
import Compiler.CompModel exposing (CompModel, Method, Expr, AST(..), CompileExprFunction(..),
                                   forRange, litInt, argName, false, true)
import Utils
import Dict exposing (Dict)
cacheIsNull ast =
    Unary "==" [(Lit "null"), (CacheRef ast)]
        
getValueFunctionAST =
    VarDeclaration (Lit "getValueAt")
        (Function ["cache", "cacheI"]
             (Let [("val", (CallFunction (CacheRef (Lit "cacheI")) []))]
                  (Begin
                       [(CacheUpdate (Lit "cacheI") (Function [] (Lit "val")))
                       ,(Lit "val")])))

getCacheValue ast =
    CallFunction (Lit "getValueAt") [(Lit "cache"), ast]

        
functionStart method =
    VarDeclaration (Lit "cache") (Array [])

        
functionEnd method =
    Array [false, getCacheValue (litInt ((List.length method.exprs)-1))]

            
compileExpr expr entireMethod =
    (CachePush
         (Function
              []
              (case expr.compileExprFunction of
                            CompileExprFunction func -> func expr)))
        
compileExprs method entireMethod =
    case method of
        [] -> [] -- should not happen
        (expr::[]) -> [compileExpr expr entireMethod, (functionEnd entireMethod)]
        (expr::exprs) -> (compileExpr expr entireMethod) :: (compileExprs exprs entireMethod)

buildArgs method =
    List.map
        (\index -> argName index)
        (List.range 0 (method.argCount-1))
                         
compileFunction method =
    Function (buildArgs method)
        (Begin ((functionStart method) :: (compileExprs method.exprs method)))
            
