module BuiltIn exposing (allBuiltInAsFunction, callFromSpec, constructCall, builtInFunctions, builtInFunctionList
                        ,ArgList(..) , builtInVariables, BuiltInVariableValue(..), waveCompiler, constructBlock
                        )
import MusicTheory
import Compiler.CompileBuiltIn exposing (buildWave, buildUnary, buildJavascriptCall, buildUnaryWithDefault,
                                             buildUnaryWithSingleLead, buildIf, buildJoin, buildAppend)
import Dict exposing (Dict)
import Model exposing (Function, Block(..), Call, Input(..), Id, makeMain, makeMainFromCalls, makeFunc)
import Compiler.CompModel exposing (systemValues, CompileExprFunction(..))
import Model exposing (Staff)

-- infinite has a min number of args with the names of the args
-- then the name of the rest of the args
type ArgList = Finite (List String)
             | Infinite (List String) String

type BuiltInVariableValue = Number Float
                          | StackReference Int
                          | JavaScript String

type alias BuiltInSpec = {functionName: String
                         ,argList: ArgList
                         ,compileExprFunction: Compiler.CompModel.CompileExprFunction}
type alias BuiltInList = List BuiltInSpec

waveCompiler = CompileExprFunction buildWave

generalList : List BuiltInSpec
generalList = [(BuiltInSpec
                    "note"
                    (Finite ["time", "frequency", "duration"])
                    (CompileExprFunction buildWave))
              ,(BuiltInSpec
                    "append"
                    (Infinite [] "songs")
                    (CompileExprFunction buildAppend))
              ,(BuiltInSpec
                    "join"
                    (Infinite [] "songs")
                    (CompileExprFunction buildJoin))
              ,(BuiltInSpec
                    "if"
                    (Finite ["condition", "thenValue", "elseValue"])
                    (CompileExprFunction (buildIf False False)))]

compareUnary op =
    (BuiltInSpec op (Infinite ["leftComparable", "rightComparable"] "comparables") (CompileExprFunction buildUnary))
compareUnaryOpList =
    (List.map compareUnary [">", "<", ">=", "<=", "==", "&&", "||"])
    
unaryList : List BuiltInSpec
unaryList = [(BuiltInSpec "+" (Infinite [] "nums") (CompileExprFunction (buildUnaryWithDefault "0")))
            ,(BuiltInSpec "-" (Infinite ["num"] "nums") (CompileExprFunction (buildUnaryWithSingleLead "-")))
            ,(BuiltInSpec "/" (Infinite ["numerator"] "denominators") (CompileExprFunction buildUnary))
            ,(BuiltInSpec "*" (Infinite [] "nums") (CompileExprFunction (buildUnaryWithDefault "1")))] ++ compareUnaryOpList


javascriptFunctionList =
    [(BuiltInSpec "mod" (Finite ["numerator", "divisor"]) (CompileExprFunction (buildJavascriptCall "mathMod")))]
    
           
builtInFunctionList : BuiltInList
builtInFunctionList = generalList ++ unaryList ++ javascriptFunctionList


nameTuple builtInList =
    (builtInList.functionName, builtInList)
                      
-- maps function names to a list of arg names
builtInFunctions : Dict String BuiltInSpec
builtInFunctions =
    Dict.fromList (List.map nameTuple builtInFunctionList)

makeBuiltInNumber pair =
    ((Tuple.first pair), Number (Tuple.second pair))              
                   
makeJavascriptBuiltIn pair =
    ((Tuple.first pair), JavaScript (Tuple.second pair))

        
builtInVariables : Dict String BuiltInVariableValue
builtInVariables =
    Dict.fromList
        ((List.map makeBuiltInNumber MusicTheory.namedFrequencies)
                        ++ (List.map makeJavascriptBuiltIn systemValues))
        

callFromSpec : BuiltInSpec -> Id -> Call
callFromSpec spec id =
    constructCall id spec.functionName

-- a function containing calls to all the functions for use in drawing
makeAllFunction : BuiltInList -> Int -> List Block
makeAllFunction builtInList counter =
    case builtInList of
        [] -> []
        (spec::specs) -> (CallBlock (callFromSpec spec counter)) :: (makeAllFunction specs (counter-1))

makeBuiltInList builtInList counter =
    (StaffBlock (constructStaff counter)) :: (makeAllFunction builtInList (counter-1))
allBuiltInAsFunction = (makeFunc -1 (makeBuiltInList builtInFunctionList -100) "function")

callWithHoles id name numHoles =
    Call id (List.repeat numHoles Hole) name ""
                       
-- id needs to be unique to the Onion
constructCall : Id -> String -> Call
constructCall id functionName =
    case Dict.get functionName builtInFunctions of
        Just builtIn ->
            case builtIn.argList of
                Infinite firstArgs restArgs -> callWithHoles id functionName (max 1 (List.length firstArgs))
                Finite args -> callWithHoles id functionName (List.length args)
        Nothing -> callWithHoles id functionName 0
                   
constructStaff : Id -> Staff
constructStaff id =
    (Staff id [] "")

constructBlock : Id -> Block -> Block
constructBlock id block =
    case block of
       CallBlock call -> CallBlock (constructCall id call.functionName)
       StaffBlock staff -> StaffBlock (constructStaff id)
