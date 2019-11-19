module BuiltIn exposing (..)
import Dict exposing (Dict)

-- infinite has a minimum number of args
type ArgList = Finite (List String)
             | Infinite Int


type alias BuiltInSpec = (String, ArgList)
type alias BuiltInList = List BuiltInSpec

waveList : List BuiltInSpec
waveList =
           [("sine", Finite ["time", "frequency", "duration"])]

    
specialFunctionList = [("join", Infinite 0)
                      ,("play", Finite ["sound"])] -- play will be removed
builtInFunctionList : BuiltInList
builtInFunctionList = waveList ++ specialFunctionList
                      

-- maps function names to a list of arg names
builtInFunctions : Dict String ArgList
builtInFunctions =
    Dict.fromList builtInFunctionList
waveFunctions = Dict.fromList waveList
specialFunctions = Dict.fromList builtInFunctionList
