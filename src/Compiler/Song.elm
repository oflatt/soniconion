module Compiler.Song exposing (makeLit, append, addSine, javascriptFuncs, join)

import Compiler.CompModel exposing (CompModel, Method, Expr, AST(..), CompileExprFunction(..),
                                        forRange, false, true, litFloat, maximum, sum, litInt, getLit)

import Compiler.Note exposing (makeNote)

import Utils
import Dict exposing (Dict)

songType = Lit "'song'"
           
litFunc lit = Function [] lit
getAnchor val = (Get val (Lit "anchor"))

noteSongFunc : AST
noteSongFunc =
    VarDeclaration (Lit "noteSong")
        (Function ["time", "frequency", "duration"]
             (Object [("type", songType)
                     ,("children", Arr [litFunc (makeNote (Lit "frequency") (litFloat 1))])
                     ,("time", Lit "time")
                     ,("anchor", Lit "duration")
                     ,("duration", Lit "duration")]))
              
noteSong : AST -> AST -> AST -> AST
noteSong time frequency duration =
    CallFunction (Lit "noteSong") [getAnchor time, getAnchor frequency, getAnchor duration]

makeLit : AST -> AST
makeLit literal =
    CallFunction (Lit "noteSong") [(litInt 0) ,(litInt 0) , literal]

appendFunc =
    VarDeclaration (Lit "append")
        (Function ["song1", "song2"]
             (Object [("type", songType)
                     ,("children"
                      ,(Arr [litFunc (Lit "song1")
                              ,litFunc (CopySet (Lit "song2")
                                            [("time", sum [(getLit (Lit "song2") "time")
                                                          ,(getLit (Lit "song1") "anchor")])])]))
                     ,("time", (litInt 0))
                     ,("anchor", sum [(getLit (Lit "song1") "anchor"), (getLit (Lit "song2") "anchor")])
                     ,("duration", maximum [(getLit (Lit "song1") "duration")
                                           ,(sum [(getLit (Lit "song2") "duration"), (getLit (Lit "song2") "time")])])]))


        
append : AST -> AST -> AST
append song1 song2 =
    CallFunction (Lit "append") [song1, song2]

joinFunc =
    VarDeclaration (Lit "join")
        (Function ["song1", "song2"]
             (If (Unary ">" [(getAnchor (Lit "song1")), (getAnchor (Lit "song2"))])
                  (append (CopySet (Lit "song2") [("anchor", (litInt 0))]) (Lit "song1"))
                  (append (CopySet (Lit "song1") [("anchor", (litInt 0))]) (Lit "song2"))))
            
join song1 song2 =
    CallFunction (Lit "join") [song1, song2]
        
addSine : AST -> AST -> AST -> AST
addSine song frequency duration =
    append song (CallFunction (Lit "noteSong") [(litInt 0), (getAnchor frequency), (getAnchor duration)])


javascriptFuncs =
    [appendFunc, noteSongFunc, joinFunc]
