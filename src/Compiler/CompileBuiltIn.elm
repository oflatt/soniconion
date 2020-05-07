module Compiler.CompileBuiltIn exposing (buildWave, buildUnary)
    
import Compiler.CompModel exposing (Expr, Method, CompModel, Value(..))

buildValue val =
    case val of
        StackIndex i ->
            "stack[" ++ (String.fromInt i) ++ "]"
        ConstV c ->
            String.fromFloat c

stackPush str =
    String.join "" ["stack.push(", str, ");"]

                
buildWave : Expr -> String
buildWave expr =
    case expr.children of
        (time::frequency::duration::[]) ->
            let timeStr = buildValue time
                frequencyStr = buildValue frequency
                durationStr = buildValue duration
                endStr = "(" ++ timeStr ++ "+" ++ durationStr ++ ")"
            in
                String.join
                    ""
                    [
                     stackPush endStr
                    ,"if(time>"
                    ,timeStr
                    ," && time<"
                    ,endStr
                    ,"){"
                        
                    ,"notes.push({frequency: "
                    ,frequencyStr
                    ,"});"

                    ,"}"
                    ]
        _ -> "" -- fail silently

buildUnaryMultiple children op =
    case children of
        [] -> [""]
        (arg::[]) -> [buildValue arg]
        (arg::args) -> buildValue arg :: op :: (buildUnaryMultiple args op)
        
             
buildUnary expr =
    case expr.children of
        [] -> "" -- fail silently, we checked before
        (arg::[]) -> stackPush (expr.functionName ++ " " ++ buildValue arg)
        _ -> String.join "" (buildUnaryMultiple expr.children expr.functionName)
                                          
        
                                          
