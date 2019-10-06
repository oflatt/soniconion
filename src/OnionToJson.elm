module OnionToJson exposing (onionToJson)
import Model exposing (..)
import Utils

import Debug exposing (log)
import Json.Encode as Encode
import Dict exposing (Dict)
import Tuple
import List

callHash : Function -> Dict Id Call -> Dict Id Call
callHash func dict =
    case func of
        [] -> dict
        (e::es) -> callHash es
                   (Dict.insert e.id e dict)
    
    
-- assume the last element is the play

inputToJson : Input -> Dict Id Call -> Encode.Value
inputToJson input callDict =
    case input of
        -- TODO handle error of node missing 
        Output id ->
            case Dict.get id callDict of
                Just call -> callToJson call callDict
                Nothing -> Encode.object [] -- Very bad
        Const c -> Encode.int c

inputsToJson : (Input, Input) -> Dict Id Call -> (Encode.Value, Encode.Value)
inputsToJson inputs callDict =
    (inputToJson (Tuple.first inputs) callDict
    ,inputToJson (Tuple.second inputs) callDict)

waveToJson wave callDict =
    let inputsJson =
            inputsToJson wave.inputs callDict
    in
        Encode.object [
             ("type", Encode.string wave.waveType)
            ,("duration", (Tuple.first inputsJson))
            ,("frequency", (Tuple.second inputsJson))
             ]

playToJson play callDict =
    -- TODO make less assumptions, check not literal ect
    inputToJson play.input callDict

exprToJson : Expr -> Dict Id Call -> Encode.Value
exprToJson expr callDict =
    case expr of
        WaveE wave -> waveToJson wave callDict
        PlayE play -> playToJson play callDict
            
callToJson : Call -> Dict Id Call -> Encode.Value
callToJson call callDict =
    exprToJson call.expr callDict
        

functionToJson : Function -> Encode.Value
functionToJson function =
    let callDict =
            callHash function Dict.empty
    in
        -- Assume play is the last element
        case (Utils.last function) of
            Just playCall -> callToJson playCall callDict
            Nothing -> Encode.object []
    
        
onionToJsonList : Onion -> List Encode.Value
onionToJsonList onion =
    case onion of
        [] -> []
        (f::fs) -> (functionToJson f) :: (onionToJsonList fs)
        
onionToJson : Onion -> Encode.Value
onionToJson onion =
    Encode.list identity (onionToJsonList onion)


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
        
