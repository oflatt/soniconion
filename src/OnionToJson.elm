module OnionToJson exposing (onionToJson)
import Model exposing (..)

import Json.Encode as Encode

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
        
