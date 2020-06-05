module Compiler.CompileFunction exposing (compileFunction, getValueFunctionAST, getCacheValue)
import Compiler.CompModel exposing (CompModel, Method, Expr, AST(..), CompileExprFunction(..),
                                   forRange, litInt)
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
    getCacheValue (litInt ((List.length method)-1))

            
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
        
compileFunction method =
    Function []
        (Begin ((functionStart method) :: (compileExprs method method)))
            
