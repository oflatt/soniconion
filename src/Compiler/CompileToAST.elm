module Compiler.CompileToAST exposing (compileToAST, getCacheValue)
import Compiler.CompModel exposing (CompModel, Method, Expr, AST(..), CompileExprFunction(..), systemValues)
import Utils

javascriptHead =
    String.join
        ""
        [
         "var startTime = getTime();"
        ,"function step(state){" -- the big loop function begins
        ,"var cache = [];"
        ,"var functions = [];"
        ,"var notes = [];"
        ,"var time = getTime()-startTime;"
        ]


javascriptTail =
    String.join
        ""
        [
         "update(state, notes);" -- update updates the playing synthesizers in javascript code
        ,"function recur() {" -- recur func with state
        ,"step(state);"
        ,"}"
        ,"window.setTimeout(recur, 0);"
        ,"}"
        ,"step(makeInitialState());" -- start the anim loop
        ]

cacheIsNull ast =
    Unary "==" (Literal "null") (CacheRef ast)

updateCache astForIndex =
    CacheUpdate astForIndex (CallFunction (FunctionRef astForIndex) [])
        
getValueFunctionAST =
    VarDeclaration (Literal "getValueAt")
        (Function ["cacheI"]
                  [(VarDeclaration (Literal "res") (Literal "null"))
                  ,(If
                    (cacheIsNull (Literal "cacheI"))
                    (Begin
                         [(updateCache (Literal "cacheI"))
                         ,(CacheRef (Literal "cacheI"))])
                    (CacheRef (Literal "cacheI")))]
                  (Literal "res"))

getCacheValue ast =
    CallFunction (Literal "getValueAt") [ast]
        
initialVariables =
    [VarSet (Literal "cache") (Literal "[]")
    ,VarSet (Literal "notes") (Literal "[]")
    ,VarSet (Literal "time") (Unary "-" (Literal "getTime()") (Literal "startTime"))
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
    Begin
    (getValueFunctionAST ::
         (globals ++ initialVariablesDeclaration))

pushSystemValue sysVal =
    CachePush (Literal (Tuple.second sysVal))

systemValuesAST : AST
systemValuesAST =
        Begin (List.map pushSystemValue systemValues)

loopFunctionBody =
    [Begin initialVariables
    ,CallFunction (FunctionRef (Literal "functions.length")) []
    ,CallFunction (Literal "update") [(Literal "state"), (Literal "notes")]
    ,VarDeclaration (Literal "recur") (Function [] [] (CallFunction (Literal "step") [(Literal "state")]))]

loopFunctionAST =
    VarDeclaration (Literal "step")
        (Function ["state"]
             loopFunctionBody
             (CallFunction (Literal "window.setTimeout") [(Literal "recur"), (Literal "0")]))
            
loopAST =
    Begin
        [loopFunctionAST
        ,CallFunction (Literal "step") [(CallFunction  (Literal "makeInitialState") [])]
        ]
            
       
wrapFunction ast =
    case ast of
        Begin subexprs ->
            case Utils.last subexprs of
                Nothing -> Function [] [] Empty
                Just final -> 
                    Function [] (List.take ((List.length subexprs)-1) subexprs) final
        subexpr -> Function [] [] subexpr


            
compileExpr expr =
    (FunctionsPush
         (wrapFunction
              (case expr.compileExprFunction of
                   CompileExprFunction func -> func expr)))
            
compileMethod method =
    Begin (List.map compileExpr method)
            

compileFunctions compModel =
    case compModel of
        [method] -> compileMethod method
        _ -> Empty -- do not support multiple methods yet

compileToAST : CompModel -> AST
compileToAST compModel =
    Begin [astHead
          ,(compileFunctions compModel)
          ,loopAST]
