module OnionToJson exposing (onionToJson, callToJson)
import Model exposing (..)

import Debug exposing (log)
import Json.Encode as Encode
import Dict exposing (Dict)
import Tuple

callHash : Function -> Dict Id Call -> Dict Id Call
callHash func dict =
    case func of
        [] -> dict
        (e::es) -> callHash es
                   (Dict.insert e.id e dict)
    
    
-- assume the last element is the play

inputToJson input =
    case input of
        Output id -> Encode.int 2 -- dummy val
        Const c -> Encode.int c

inputsToJson : (Input, Input) -> (Encode.Value, Encode.Value)
inputsToJson inputs =
    (inputToJson (Tuple.first inputs)
    ,inputToJson (Tuple.second inputs))

waveToJson wave =
    let inputsJson =
            inputsToJson wave.inputs
    in
        Encode.object [
             ("type", Encode.string wave.waveType)
            ,("duration", (Tuple.first inputsJson))
            ,("frequency", (Tuple.second inputsJson))
             ]

exprToJson : Expr -> Encode.Value
exprToJson expr =
    case expr of
        WaveE wave -> waveToJson wave
        PlayE play -> Encode.object []
            
callToJson : Call -> Encode.Value
callToJson call =
    exprToJson call.expr
                       
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

testTogether = Encode.object [
                ("type", Encode.string "together")
                    ,("notes",
                      twoNotesList
                     )
                    ]

onionToJson : Onion -> Encode.Value
onionToJson onion =
    Encode.object [ ("type", Encode.string "inorder")
                  ,("notes", Encode.list identity [
                         Encode.object
                             [ ("type", Encode.string "inorder")
                             , ("notes", twoNotesList)]
                        ,testTogether
                        ])]
        
