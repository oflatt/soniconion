module Compiler.CompileBuiltIn exposing (buildWave, buildUnary, buildJavascriptCall, buildUnaryWithDefault, buildUnaryWithSingleLead)
    
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
        [] -> [")"]
        (arg::[]) -> [buildValue arg, ")"]
        (arg::args) -> buildValue arg :: op :: (buildUnaryMultiple args op)

buildGeneralUnary defaultValue singleArgumentLead expr =
    stackPush
    (case expr.children of
         [] -> defaultValue
         (arg::[]) -> ("(" ++ singleArgumentLead ++ buildValue arg ++ ")")
         _ -> (String.join "" ("(" :: (buildUnaryMultiple expr.children expr.functionName))))

             
buildUnary expr =
    buildGeneralUnary "0" "" expr
                                          
buildUnaryWithDefault default expr =
    buildGeneralUnary default "" expr

buildUnaryWithSingleLead lead expr =
    buildGeneralUnary "0" lead expr

buildJavascriptCall funcName expr =
    let values = String.join "," (List.map buildValue expr.children)
    in
        stackPush
        (String.join ""
             [funcName, "(", values, ")"])
                                          
