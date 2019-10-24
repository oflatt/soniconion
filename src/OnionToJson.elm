module OnionToJson exposing (onionToJson)
import Model exposing (..)
import Utils

import Debug exposing (log)
import Json.Encode as Encode
import Dict exposing (Dict)
import Tuple
import List
import Result exposing (andThen)




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
                                             

                                  
specialMatched : Call -> Dict Id Call -> List Encode.Value -> ArgList -> Result Error Encode.Value
specialMatched call callDict inputsJson argumentNames =    
    case call.waveType of
        "join" -> 
            Ok (Encode.object ([
                     ("type", Encode.string "together")
                    ,("notes", Encode.list identity inputsJson
                     )
                    ]))
        "sequence" ->
            Ok (Encode.object ([
                     ("type", Encode.string "inorder")
                    ,("notes", Encode.list identity inputsJson
                     )
                    ]))
        _ -> Err "Undefined for special built in"  
                     
waveMatched : Call -> Dict Id Call -> List Encode.Value -> ArgList -> Result Error Encode.Value
waveMatched call callDict inputsJson argumentNames =
    case argumentNames of
        Finite argStrings ->
            (inputTuples inputsJson argStrings)
                |> andThen
                   (\tuples ->
                        Ok (Encode.object ([
                                 ("type", Encode.string "note")
                                ,("wave", Encode.string call.waveType)
                        ] ++ tuples)))
        Infinite n ->
            if n <= (List.length inputsJson)
            then
                Ok (Encode.object ([
                         ("type", Encode.string "note")
                        ,("wave", Encode.string call.waveType)
                        ,("args", Encode.list identity inputsJson)
                        ] ))
            else
                Err "Not enough arguments"
                    
callWithInputs : Call -> Dict Id Call -> List Encode.Value -> Result Error Encode.Value
callWithInputs call callDict inputsJson =
    let getWave = Dict.get call.waveType waveFunctions
    in
        case getWave of
            Nothing ->
                let getSpecial = Dict.get call.waveType specialFunctions
                in
                    case getSpecial of
                        Nothing -> Err "Not a built in function"
                        Just specialArgs ->
                            specialMatched call callDict inputsJson specialArgs
            Just waveArgs ->
                waveMatched call callDict inputsJson waveArgs
    
    
callToJson : Call -> Dict Id Call -> Result Error Encode.Value
callToJson call callDict =
    let inputsJsonRes =
            inputsToJson call.inputs callDict
    in
        case inputsJsonRes of
            Err e -> Err e
            Ok o -> callWithInputs call callDict o



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
        
