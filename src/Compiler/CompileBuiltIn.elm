module Compiler.CompileBuiltIn exposing (buildWave, buildUnary, buildJavascriptCall, buildUnaryWithDefault,
                                             buildUnaryWithSingleLead, buildIf)
    
import Compiler.CompModel exposing (Expr, Method, CompModel, Value(..), AST(..), litInt, litFloat
                                   ,getLit)
import Compiler.CompileFunction exposing (getCacheValue)
import Compiler.Song exposing (makeLit, join, addSine)


buildValue val =
    case val of
        StackIndex i ->
            getCacheValue (litInt i)
        ConstV c ->
            makeLit (litFloat c)
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

             
buildUnary expr =
    buildGeneralUnary "0" "" expr
                                          
buildUnaryWithDefault default expr =
    buildGeneralUnary default "" expr

buildUnaryWithSingleLead lead expr =
    buildGeneralUnary "0" lead expr

            
buildJavascriptCall funcName expr =
    CallFunction (Lit funcName) (List.map buildValue expr.children)
                                          
