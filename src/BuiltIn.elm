module BuiltIn exposing (allBuiltInAsFunction, callFromSpec, constructCall, builtInFunctions, builtInFunctionList
                        ,specialFunctionList, waveFunctions, specialFunctions, ArgList, builtInVariables)
import MusicTheory
import Dict exposing (Dict)
import Model exposing (Function, Call, Input(..), Id)

-- infinite has a min number of args with the names of the args
-- then the name of the rest of the args
type ArgList = Finite (List String)
             | Infinite (List String) String


type alias BuiltInSpec = (String, ArgList)
type alias BuiltInList = List BuiltInSpec

waveList : List BuiltInSpec
waveList = [("sine", Finite ["time", "frequency", "duration"])]



specialFunctionList = [("join", Infinite [] "sounds")
                      ,("play", Finite ["arg"])] -- join will be removed
builtInFunctionList : BuiltInList
builtInFunctionList = waveList ++ specialFunctionList


-- maps function names to a list of arg names
builtInFunctions : Dict String ArgList
builtInFunctions =
    Dict.fromList builtInFunctionList
waveFunctions = Dict.fromList waveList
specialFunctions = Dict.fromList builtInFunctionList



builtInVariables : Dict String Float
builtInVariables =
    Dict.fromList
        MusicTheory.namedFrequencies

callFromSpec spec id =
    constructCall id (Tuple.first spec)

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
        Just argList ->
            case argList of
                Infinite firstArgs restArgs -> callWithHoles id functionName (List.length firstArgs)
                Finite args -> callWithHoles id functionName (List.length args)
        Nothing -> callWithHoles id functionName 0
