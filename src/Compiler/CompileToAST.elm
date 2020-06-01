module Compiler.CompileToAST exposing (compileToAST, getCacheValue)
import Compiler.CompModel exposing (CompModel, Method, Expr, AST(..), CompileExprFunction(..), systemValues, forRange)
import Utils
import Dict exposing (Dict)

cacheIsNull ast =
    Unary "==" [(Literal "null"), (CacheRef ast)]

updateCache cacheIndex localIndex =
    CacheUpdate cacheIndex (CallFunction (FunctionRef localIndex) [])
        
getValueFunctionAST =
    VarDeclaration (Literal "getValueAt")
        (Function ["cacheILocal", "PC"]
                  (Begin
                       [(VarDeclaration (Literal "res") (Literal "null"))
                       ,(VarDeclaration (Literal "cacheI") (Unary "+" [(Literal "cacheILocal"), (Literal "PC")]))
                       ,(If
                         (cacheIsNull (Literal "cacheI"))
                         (Begin
                              [(updateCache (Literal "cacheI") (Literal "cacheILocal"))
                              ,(VarSet (Literal "res") (CacheRef (Literal "cacheI")))])
                         (VarSet (Literal "res") (CacheRef (Literal "cacheI"))))
                       ,(Literal "res")]))

getCacheValue ast =
    CallFunction (Literal "getValueAt") [ast, (Literal "PC")]
        
initialVariables =
    [VarSet (Literal "cache") (Literal "[]")
    ,VarSet (Literal "notes") (Literal "[]")
    ,VarSet (Literal "time") (Unary "-" [(Literal "getTime()"), (Literal "startTime")])
    ,VarSet (Literal "PC") (Literal "0")
     ]

globals =
    [(VarDeclaration (Literal "startTime") (Literal "getTime()"))
    , (VarDeclaration (Literal "functions") (Literal "[]"))]

varSetToVarDec ast =
    case ast of
        VarSet a b -> (VarDeclaration a b)
        _ -> (VarDeclaration (Literal "bad") (Literal "shouldnothappen"))
    
initialVariablesDeclaration =
    List.map varSetToVarDec initialVariables

    
astHead =
    (getValueFunctionAST ::
         (globals ++ initialVariablesDeclaration))

recur =
    (CallFunction (Literal "setTimeout") [(Literal "recur"), (Literal "4")])
        
loopFunctionBody =
    BeginThunk (initialVariables ++
                    [CallFunction (FunctionRef (Unary "-" [(Literal "functions.length"), (Literal "1")])) []
                    ,CallFunction (Literal "update") [(Literal "state"), (Literal "notes")]
                    ,recur])

loopFunctionAST =
    (VarDeclaration (Literal "recur")
         (Function []
              loopFunctionBody))
            
loopAST =
    BeginThunk
        [(VarDeclaration (Literal "state") (Literal "makeInitialState()"))
        ,loopFunctionAST
        ,recur]
        
       
functionStart method =
    (forRange "i"
         (Literal "0")
         (Literal (String.fromInt (List.length method)))
         (CachePushNull))

functionEnd method =
    Empty

        

            
compileExpr expr isReturnFunction entireMethod =
    (FunctionsPush
         (Function
              []
              (let compiledExpr =
                       (case expr.compileExprFunction of
                            CompileExprFunction func -> func expr)
               in
                   if isReturnFunction
                   then
                       Begin
                       [(functionStart entireMethod)
                       ,compiledExpr
                       ,(functionEnd entireMethod)]
                   else
                       compiledExpr)))
        
compileExprs method entireMethod =
    case method of
        [] -> []
        (expr::[]) -> [compileExpr expr True entireMethod]
        (expr::exprs) -> (compileExpr expr False entireMethod) :: (compileExprs exprs entireMethod)
        
compileMethod method =
    BeginThunk
    (compileExprs method method)
            

compileFunctions compModel =
    case Dict.get "main" compModel of
        Just method -> compileMethod method
        _ -> Empty -- no multiple methods yet
             
compileToAST : CompModel -> AST
compileToAST compModel =
    Begin (astHead ++
               [(compileFunctions compModel)
               ,loopAST])
