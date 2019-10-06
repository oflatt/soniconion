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

inputsToJson : (Input, Input) -> Dict Id Call -> (Result Error Encode.Value, Result Error Encode.Value)
inputsToJson inputs callDict =
        ((inputToJson (Tuple.first inputs) callDict)
        ,(inputToJson (Tuple.second inputs) callDict))

waveToJson : Wave -> Dict Id Call -> Result Error Encode.Value
waveToJson wave callDict =
    let inputsJsonRes =
            inputsToJson wave.inputs callDict
    in
        Result.map2
            (\inputJson1 inputJson2 ->
                Encode.object [
                     ("type", Encode.string "note")
                    ,("wave", Encode.string wave.waveType)
                    ,("duration", inputJson1)
                    ,("frequency", inputJson2)
             ])
            (Tuple.first inputsJsonRes)
            (Tuple.second inputsJsonRes)


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
        WaveE wave -> waveToJson wave callDict
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
        
