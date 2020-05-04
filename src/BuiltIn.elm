module BuiltIn exposing (..)
import Dict exposing (Dict)
import Model exposing (Function, Call, constructCall)

-- infinite has a minimum number of args
type ArgList = Finite (List String)
             | Infinite Int


type alias BuiltInSpec = (String, ArgList)
type alias BuiltInList = List BuiltInSpec

waveList : List BuiltInSpec
waveList = [("sine", Finite ["time", "frequency", "duration"])]

    
specialFunctionList = [("join", Infinite 0)
                      ,("play", Finite ["arg"])] -- join will be removed
builtInFunctionList : BuiltInList
builtInFunctionList = waveList ++ specialFunctionList
                      

-- maps function names to a list of arg names
builtInFunctions : Dict String ArgList
builtInFunctions =
    Dict.fromList builtInFunctionList
waveFunctions = Dict.fromList waveList
specialFunctions = Dict.fromList builtInFunctionList


callFromSpec spec id =
    constructCall id (Tuple.first spec)

-- a function containing calls to all the functions for use in drawing
makeAllFunction : BuiltInList -> Int -> Function
makeAllFunction builtInList counter =
    case builtInList of
        [] -> []
        (spec::specs) -> (callFromSpec spec counter) :: (makeAllFunction specs (counter-1))

allBuiltInAsFunction = makeAllFunction builtInFunctionList -1
