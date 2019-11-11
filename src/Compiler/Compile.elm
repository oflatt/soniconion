module Compiler.Compile exposing (compile, compileOnion)

import Compiler.CompModel exposing (Expr, Method, CompModel, Value(..))
import Compiler.OnionToExpr exposing (onionToCompModel)
import Array exposing (Array)

type alias CompiledBuffer = Array String

buildSchedule : Float -> String
buildSchedule time =
    String.join
        ""
        ["var synth = new Tone.Synth().toMaster();"
         ,"Tone.Transport.schedule(function(s_time){"
        ,"synth.triggerAttackRelease(440, 2, s_time)"-- TODO replace with content passed in
        ,"},"
        ,String.fromFloat time
        ,");"]
    
javascriptHead = "Tone.Transport.stop();Tone.Transport.cancel();"
javascriptTail = "Tone.Transport.start('+0', '0');"
                 
-- compiles a model of a program into a javascript string
compile : CompModel -> String
compile compModel =
    String.join
        ""
        [
         javascriptHead
        ,buildSchedule 1
        ,javascriptTail
         ]


compileOnion onion =
    case onionToCompModel onion of
        Ok compModel ->
            Ok (compile compModel)
        Err e -> Err e
