module Compiler.CompileToAST exposing (compileToAST)
import Compiler.CompModel exposing (CompModel, Method, Expr, AST(..), CompileExprFunction(..), forRange, while)
import Compiler.CompileFunction exposing (compileFunction, getValueFunctionAST)
import Compiler.CompileBuiltIn exposing (handleContinuations)
import Compiler.Song
import Utils
import Dict exposing (Dict)


 
initialVariables =
    [VarSet (Lit "time") (Unary "-" [(Lit "getTime()"), (Lit "startTime")])]

globals =
    [(VarDeclaration (Lit "startTime") (Lit "getTime()"))
    ,(VarDeclaration (Lit "functions") (Object []))]

varSetToVarDec ast =
    case ast of
        VarSet a b -> (VarDeclaration a b)
        _ -> (VarDeclaration (Lit "bad") (Lit "shouldnothappen"))
    
initialVariablesDeclaration =
    List.map varSetToVarDec initialVariables

recur =
    (CallFunction (Lit "setTimeout") [(Lit "recur"), (Lit "4")])
        
loopFunctionBody =
    (Begin (initialVariables ++
                [CallFunction (Lit "sleep") [(Lit "4")]
                ,CallFunction (Lit "onTick") [(Lit "state")]
                ,CallFunction (Lit "update")
                    [(Lit "state")
                    ,handleContinuations (CallFunction (Get (Lit "functions") (Lit "main")) [])
                    ,(Lit "time")]]))

        
loopAST =
    (while (Lit "true")
         loopFunctionBody)
       

astHead =
    (getValueFunctionAST ::
         (globals ++ initialVariablesDeclaration ++ Compiler.Song.javascriptFuncs))


compileOneFunction funcTuple =
    (Set (Lit "functions") (Lit (Tuple.first funcTuple)) (compileFunction (Tuple.second funcTuple)))
    
    
        
compileFunctions compModel =
    (List.map compileOneFunction (Dict.toList compModel))

             
compileToAST : CompModel -> AST
compileToAST compModel =
    Begin (astHead ++
               (compileFunctions compModel)
               ++ [loopAST])
               
