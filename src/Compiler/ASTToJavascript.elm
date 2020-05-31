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
                      _ -> "return ")
                ,(aSTToJavascript final)
                ,"}())"]
        Nothing -> ""

javascriptBeginThunk commands =
    String.join ""
        ["(function(){"
        ,(String.join ";" (List.map aSTToJavascript commands))
        ,"}())"]
        

                   
aSTToJavascript astArgument =
    case astArgument of
        Empty -> ""
        Literal str -> str
        
        Begin commands ->
            javascriptBegin commands
        BeginThunk commands ->
            javascriptBeginThunk commands
                
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
        

        CachePushNull ->
            "cache.push(null)"
        CachePush ast ->
            "cache.push(" ++ (aSTToJavascript ast) ++ ")"
        CacheUpdate index ast ->
            String.join ""
                ["cache["
                ,aSTToJavascript index
                ,"]"
                ," = "
                ,aSTToJavascript ast]
        NotesPush frequency ->
            String.join ""
                ["notes.push({frequency:"
                ,aSTToJavascript frequency
                ,"})"]
        FunctionsPush ast ->
            "functions.push(" ++ (aSTToJavascript ast) ++ ")"


        CacheRef index ->
            "cache[" ++ (aSTToJavascript index) ++ "]"
        FunctionRef index ->
            "functions[" ++ (aSTToJavascript index) ++ "]"

        If cond thenCase elseCase ->
            javascriptIf cond thenCase elseCase

        Unary op args ->
            "(" ++ (String.join op (List.map aSTToJavascript args)) ++ ")"
               
        SingleOp op arg ->
            "(" ++ op ++ (aSTToJavascript arg) ++ ")"
        
            
        
