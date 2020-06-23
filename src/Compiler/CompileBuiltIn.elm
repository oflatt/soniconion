module Compiler.CompileBuiltIn exposing (buildWave, buildUnary, buildJavascriptCall, buildUnaryWithDefault
                                        ,buildUnaryWithSingleLead, buildIf, buildFuncCall, buildJoin
                                        ,buildAppend, handleContinuations, buildTailFuncCall)
    
import Compiler.CompModel exposing (Expr, Method, CompModel, Value(..), AST(..), litInt, litFloat
                                   ,getLit, getAnchor, CompileExprFunction, argName, while, true, false)
import Compiler.CompileFunction exposing (getCacheValue)
import Compiler.Song exposing (makeLit, append, addSine, join)


buildValue val =
    case val of
        StackIndex i ->
            getCacheValue (litInt i)
        ConstV c ->
            makeLit (litFloat c)
        FArg index ->
            (Lit (argName index))
        ScriptVariable str ->
            makeLit (Lit str)

buildIf expr =
    case expr.children of
        (cond::thenValue::elseValue::[]) ->
            (If (getLit (buildValue cond) "anchor")
                 (buildValue thenValue)
                 (buildValue elseValue))
        _ -> Empty -- fail silently
                
buildWave : Expr -> AST
buildWave expr =
    case expr.children of
        (time::frequency::duration::[]) ->
            addSine (buildValue time) (buildValue frequency) (buildValue duration)
        _ -> Empty -- fail silently


             
buildUnaryRest children op =
    case children of
        [] -> Empty -- should not happen
        (arg::[]) -> (getLit (buildValue arg) "anchor")
        args -> (Unary op
                     (List.map
                          (\arg ->
                               (getLit (buildValue arg) "anchor"))
                          args))

buildGeneralUnary defaultValue singleArgumentLead expr =
    (case expr.children of
         [] -> makeLit (Lit defaultValue)
         (arg::[]) ->
             case singleArgumentLead of
                 "" -> (buildValue arg)
                 lead -> (Let [("tmp", (buildValue arg))]
                              (CopySet (Lit "tmp")
                                   [("anchor", (SingleOp lead (getLit (Lit "tmp") "anchor")))]))
         (arg::args) ->
             (Let [("tmp", (buildValue arg))]
                  (CopySet (Lit "tmp")
                       [("anchor"
                        ,(Unary expr.functionName
                              [(getLit (Lit "tmp") "anchor")
                              ,(buildUnaryRest args expr.functionName)]))])))

handleContinuations ast =
    Begin
        [VarDeclaration (Lit "cont") ast
        ,while (ArrRef (Lit "cont") (litInt 0))
            (VarSet (Lit "cont") (CallFunction (ArrRef (Lit "cont") (litInt 1)) []))
        ,(ArrRef (Lit "cont") (litInt 1))]
        
buildFuncCall : Expr -> AST
buildFuncCall expr =
    handleContinuations (buildLiteralFuncCall expr)

buildTailFuncCall expr =
    Arr [true, Function [] (buildLiteralFuncCall expr)]
        
buildLiteralFuncCall expr =
    CallFunction (getLit (Lit "functions") expr.functionName) (List.map buildValue expr.children)
             
buildUnary expr =
    buildGeneralUnary "0" "" expr
                                          
buildUnaryWithDefault default expr =
    buildGeneralUnary default "" expr

buildUnaryWithSingleLead lead expr =
    buildGeneralUnary "0" lead expr

            
buildJavascriptCall funcName expr =
    makeLit (CallFunction (Lit funcName) (List.map getAnchor (List.map buildValue expr.children)))

appendAll : (List AST) -> (AST -> AST -> AST) -> AST
appendAll songs func =
    case songs of
        [] -> (buildValue (ConstV 0))
        [song] -> song
        (song::rest) ->
            func song (appendAll rest func)
        
buildAppend expr =
    appendAll (List.map buildValue expr.children) append


buildJoin expr =
     appendAll (List.map buildValue expr.children) join
