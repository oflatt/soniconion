module OnionToJson exposing (onionToJson)
import Model exposing (..)
import Utils

import Debug exposing (log)
import Json.Encode as Encode
import Dict exposing (Dict)
import Tuple
import List



type alias Error = String

callHash : Function -> Dict Id Call -> Dict Id Call
callHash func dict =
    case func of
        [] -> dict
        (e::es) -> callHash es
                   (Dict.insert e.id e dict)
    
    
-- assume the last element is the play

inputToJson : Input -> Dict Id Call -> Result Error Encode.Value
inputToJson input callDict =
    case input of
        -- TODO handle error of node missing 
        Output id ->
            case Dict.get id callDict of
                Just call -> (callToJson call callDict)
                Nothing -> Err ("Invalid key in dict")
        Const c -> Ok (Encode.string (String.fromFloat c))
        Hole -> Err("Incomplete program")

inputsToJson : List Input -> Dict Id Call -> Result Error (List Encode.Value)
inputsToJson inputs callDict =
        case inputs of
            [] -> Ok []
            (i::is) -> let ires
                               = inputToJson i callDict
                           rest = inputsToJson is callDict
                       in
                           Result.map2
                               (\a b -> a :: b)
                               ires
                               rest

inputTuples : List Encode.Value -> List String -> Result Error (List (String, Encode.Value))
inputTuples inputs names =
    let mbRest =
            Maybe.map2
                (\a b -> Result.toMaybe (inputTuples a b))
                (List.tail inputs)
                (List.tail names)
    in
        
        case mbRest of
            Nothing -> Ok []
            Just rest -> 
                let res = Maybe.map3
                          (\a b c -> (b, a) :: c)
                          (List.head inputs)
                          (List.head names)
                              rest
                in
                    case res of
                        Nothing -> Err "Bad input tuples"
                        Just r -> Ok r
                                             
                                             
builtInMatched : BuiltIn -> Dict Id Call -> List Encode.Value -> List String -> Result Error Encode.Value
builtInMatched builtIn callDict inputsJson argumentNames =
    let res = (inputTuples inputsJson argumentNames)
    in
      case res of
          Err e -> Err e
          Ok o -> Ok (Encode.object ([
                           ("type", Encode.string "note")
                          ,("wave", Encode.string builtIn.waveType)
                          ] ++ o))
                  
                  
builtInWithInputs : BuiltIn -> Dict Id Call -> List Encode.Value -> Result Error Encode.Value
builtInWithInputs builtIn callDict inputsJson =
    let argCount = Dict.get builtIn.waveType builtInFunctions
    in
        case argCount of
            Nothing -> Err "Not a built in func"
            Just argC ->
                    builtInMatched builtIn callDict inputsJson argC
    
    
builtInToJson : BuiltIn -> Dict Id Call -> Result Error Encode.Value
builtInToJson builtIn callDict =
    let inputsJsonRes =
            inputsToJson builtIn.inputs callDict
    in
        case inputsJsonRes of
            Err e -> Err e
            Ok o -> builtInWithInputs builtIn callDict o


playToJson : Play -> Dict Id Call -> Result Error Encode.Value
playToJson play callDict =
    -- TODO error in const case
    case play.input of
        Const c -> Err "Play got a const"
        Hole -> Err "Incomplete program - Play requires a value"
        Output o -> (inputToJson play.input callDict)

exprToJson : Expr -> Dict Id Call -> Result Error Encode.Value
exprToJson expr callDict =
    case expr of
        BuiltInE builtIn -> builtInToJson builtIn callDict
        PlayE play -> playToJson play callDict
            
callToJson : Call -> Dict Id Call -> Result Error Encode.Value
callToJson call callDict =
    exprToJson call.expr callDict
        

functionToJson : Function -> Result Error Encode.Value
functionToJson function =
    let callDict =
            callHash function Dict.empty
    in
        case (Utils.last function) of
            Just playCall -> callToJson playCall callDict
            Nothing -> Err "Last element missing"
    

                       -- TODO multiple functions
onionToJsonList : Onion -> Result Error Encode.Value
onionToJsonList onion =
    case onion of
        [] -> Err "Empty program"
        (f::fs) -> functionToJson f
            
        
onionToJson : Onion -> Encode.Value
onionToJson onion =
    let json =
            onionToJsonList onion
    in
        let printignore =
                case json of
                    Err e -> log "Compile error: " e
                    Ok o -> "Dummy"
        in
            case json of
                Err e -> Encode.object [] -- do nothing since it errored
                Ok o ->
                    Encode.object [
                         ("type", Encode.string "inorder")
                        , ("notes", Encode.list identity [o])
                        ]


 --      Test Json
        
twoNotesList = Encode.list Encode.object [
                
                     [ ("type", Encode.string "note")
                     , ("duration", Encode.string "1")
                     , ("frequency", Encode.string "440")
                     ]
                
               ,
                     [ ("type", Encode.string "note")
                     , ("duration", Encode.string "2")
                     , ("frequency", Encode.string "600")
                     ]               
               ]

twoNotesList2 = Encode.list Encode.object [
                
                     [ ("type", Encode.string "note")
                     , ("duration", Encode.string "1")
                     , ("frequency", Encode.string "F5")
                     ]
                
               ,
                     [ ("type", Encode.string "note")
                     , ("duration", Encode.string "3")
                     , ("frequency", Encode.string "D5")
                     ]
                
               
               ]

testTogether = Encode.object [
                ("type", Encode.string "together")
                    ,("notes",
                      twoNotesList2
                     )
                    ]


testJson =
    Encode.object [ ("type", Encode.string "inorder")
                  ,("notes", Encode.list identity [
                         Encode.object
                             [ ("type", Encode.string "inorder")
                             , ("notes", twoNotesList)]
                        ,testTogether
                        ])]
        
