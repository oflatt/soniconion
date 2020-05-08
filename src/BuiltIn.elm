module BuiltIn exposing (allBuiltInAsFunction, callFromSpec, constructCall, builtInFunctions, builtInFunctionList
                        ,ArgList(..) , builtInVariables, BuiltInVariableValue(..), waveCompiler)
import MusicTheory
import Compiler.CompileBuiltIn exposing (buildWave, buildUnary, buildJavascriptCall, buildUnaryWithDefault, buildUnaryWithSingleLead)
import Dict exposing (Dict)
import Model exposing (Function, Call, Input(..), Id)
import Compiler.CompModel exposing (systemValues, CompileExprFunction(..))

-- infinite has a min number of args with the names of the args
-- then the name of the rest of the args
type ArgList = Finite (List String)
             | Infinite (List String) String

type BuiltInVariableValue = Number Float
                          | StackReference Int

type alias BuiltInSpec = {functionName: String
                         ,argList: ArgList
                         ,compileExprFunction: Compiler.CompModel.CompileExprFunction}
type alias BuiltInList = List BuiltInSpec

waveCompiler = CompileExprFunction buildWave
    
waveList : List BuiltInSpec
waveList = [(BuiltInSpec
                 "sine"
                 (Finite ["time", "frequency", "duration"])
                 (CompileExprFunction buildWave))]

unaryList : List BuiltInSpec
unaryList = [(BuiltInSpec "+" (Infinite [] "nums") (CompileExprFunction (buildUnaryWithDefault "0")))
            ,(BuiltInSpec "-" (Infinite ["num"] "nums") (CompileExprFunction (buildUnaryWithSingleLead "-")))
            ,(BuiltInSpec "/" (Infinite ["numerator"] "denominators") (CompileExprFunction buildUnary))
            ,(BuiltInSpec "*" (Infinite [] "nums") (CompileExprFunction (buildUnaryWithDefault "1")))]

javascriptFunctionList =
    [(BuiltInSpec "mod" (Finite ["numerator", "divisor"]) (CompileExprFunction (buildJavascriptCall "mathMod")))
    ]
    
           
builtInFunctionList : BuiltInList
builtInFunctionList = waveList ++ unaryList ++ javascriptFunctionList


nameTuple builtInList =
    (builtInList.functionName, builtInList)
                      
-- maps function names to a list of arg names
builtInFunctions : Dict String BuiltInSpec
builtInFunctions =
    Dict.fromList (List.map nameTuple builtInFunctionList)

makeBuiltInNumber pair =
    ((Tuple.first pair), Number (Tuple.second pair))

makeStackIndices pairs counter =
    case pairs of
        [] -> []
        (pair::rest) -> ((Tuple.first pair), StackReference counter)
                        :: (makeStackIndices rest (counter+1))
              
                   

builtInVariables : Dict String BuiltInVariableValue
builtInVariables =
    Dict.fromList
        ((List.map makeBuiltInNumber MusicTheory.namedFrequencies)
                        ++ (makeStackIndices systemValues 0))
        

callFromSpec : BuiltInSpec -> Id -> Call
callFromSpec spec id =
    constructCall id spec.functionName

-- a function containing calls to all the functions for use in drawing
makeAllFunction : BuiltInList -> Int -> Function
makeAllFunction builtInList counter =
    case builtInList of
        [] -> []
        (spec::specs) -> (callFromSpec spec counter) :: (makeAllFunction specs (counter-1))

allBuiltInAsFunction = makeAllFunction builtInFunctionList -100

callWithHoles id name numHoles =
    Call id (List.repeat numHoles Hole) name ""
                       
-- id needs to be unique to the Onion
constructCall : Id -> String -> Call
constructCall id functionName =
    case Dict.get functionName builtInFunctions of
        Just builtIn ->
            case builtIn.argList of
                Infinite firstArgs restArgs -> callWithHoles id functionName ((List.length firstArgs)+1)
                Finite args -> callWithHoles id functionName (List.length args)
        Nothing -> callWithHoles id functionName 0
