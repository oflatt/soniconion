module Compiler.ASTToJavascript exposing (aSTToJavascript)
import Utils
import Compiler.CompModel exposing (AST(..))

javascriptCommas args =
    (String.join "," (List.map aSTToJavascript  args))

javascriptFunction argNames body =
    String.join ""
        ["function("
        ,(String.join "," argNames)
        ,"){"
        ,"return "
        ,aSTToJavascript body
        ,"}"
         ]

javascriptElse elseCase =
    case aSTToJavascript elseCase of
        "" -> ""
        str -> "else { return " ++ str ++ "}"
        
javascriptIf bool thenCase elseCase =
    String.join ""
        ["(function() { if("
        ,aSTToJavascript bool
        ,") {"
        ,"return "
        ,aSTToJavascript thenCase
        ,"}"
        ,javascriptElse elseCase
        ,"}())"]

javascriptFor var check increment body =
    String.join ""
        ["for("
        ,aSTToJavascript var
        ,";"
        ,aSTToJavascript check
        ,";"
        ,aSTToJavascript increment
        ,") {"
        ,aSTToJavascript body
        ,"}"]
        
javascriptBegin commands =
    case Utils.splitLast commands of
        Just (beforeFinal, final) ->
            String.join ""
                ["(function(){"
                ,(String.join ";" (List.map aSTToJavascript beforeFinal))
                ,";"
                ,(case final of
                      VarSet _ _ -> ""
                      VarDeclaration _ _ -> ""
                      _ -> "return ")
                ,(aSTToJavascript final)
                ,"}())"]
        Nothing -> ""
        

javascriptField field =
    String.join ":" [(Tuple.first field), (aSTToJavascript (Tuple.second field))]
        
javascriptObject fields =
    "{" ++ (String.join ","
                (List.map javascriptField fields)) ++ "}"

javascriptCopyObject objectAst =
    String.join ""
        ["Object.assign({},"
        ,aSTToJavascript objectAst
        ,")"]
    
        
javascriptCopySet object fields =
    String.join ""
        ["Object.assign("
        ,javascriptCopyObject object
        ,","
        ,javascriptObject fields
        ,")"]

javascriptGet object field =
    String.join "." [(aSTToJavascript object), (aSTToJavascript field)]

javascriptArray elements =
    "[" ++ (String.join "," (List.map aSTToJavascript elements)) ++ "]"

javascriptArrayRef array pos =
    String.join ""
        [aSTToJavascript array
        ,"["
        ,aSTToJavascript pos
        ,"]"]

javascriptLet vars body =
    aSTToJavascript (Begin
                         ((List.map (\var -> (VarDeclaration (Lit (Tuple.first var)) (Tuple.second var)))
                                 vars) ++ [body]))

javascriptSet object field value =
    String.join ""
        [aSTToJavascript object
        ,"."
        ,aSTToJavascript field
        ," = "
        ,aSTToJavascript value]
                   
aSTToJavascript astArgument =
    case astArgument of
        Empty -> ""
        Lit str -> str
        
        Object fields -> javascriptObject fields
        CopySet object fields -> javascriptCopySet object fields
        Get object field -> javascriptGet object field
        Set object field value -> javascriptSet object field value

        Arr elements -> javascriptArray elements
        ArrRef array pos -> javascriptArrayRef array pos

        Begin commands ->
            javascriptBegin commands
        Let vars body ->
            javascriptLet vars body
                
                
        CallFunction funcName args ->
            (String.join ""
                 [aSTToJavascript funcName
                 ,"("
                 ,javascriptCommas args
                 ,")"])
        Function argNames body ->
            javascriptFunction argNames body
        For var check increment body ->
            javascriptFor var check increment body

                
        VarDeclaration varName varBody ->
            String.join " "
                ["let"
                ,aSTToJavascript varName
                ,"="
                ,aSTToJavascript varBody]
        VarSet varName varBody ->
            String.join " "
                [aSTToJavascript varName
                ,"="
                ,aSTToJavascript varBody]
        

        CachePush ast ->
            "cache.push(" ++ (aSTToJavascript ast) ++ ")"
        CacheUpdate index ast ->
            String.join ""
                ["cache["
                ,aSTToJavascript index
                ,"]"
                ," = "
                ,aSTToJavascript ast]

        CacheRef index ->
            "cache[" ++ (aSTToJavascript index) ++ "]"

        If cond thenCase elseCase ->
            javascriptIf cond thenCase elseCase

        Unary op args ->
            "(" ++ (String.join op (List.map aSTToJavascript args)) ++ ")"
               
        SingleOp op arg ->
            "(" ++ op ++ (aSTToJavascript arg) ++ ")"
        
            
        
