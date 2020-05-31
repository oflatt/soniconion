module MusicTheory exposing (namedFrequencies, letterDictWithSharpsFlats)

import Dict exposing (Dict)
import Utils exposing (dictAppend)
import Debug exposing (log)

letterDict =
    Dict.fromList
        [(0, ["C"])
        ,(1, [])
        ,(2, ["D"])
        ,(3, [])
        ,(4, ["E"])
        ,(5, ["F"])
        ,(6, [])
        ,(7, ["G"])
        ,(8, [])
        ,(9, ["A"])
        ,(10, [])
        ,(11, ["B"])]

        
getThisSharps index letter =
    ((modBy 12 (index + 1)), (letter ++ "s"))
getThisFlats index letter =
    ((modBy 12 (index - 1)), (letter ++ "b"))

addSharpsFlats : Dict Int (List String) -> Int -> Dict Int (List String)
addSharpsFlats dict index =
    if index < 12
    then
        case Dict.get index dict of
            Just letters ->
                Utils.dictAppendAll
                    (Utils.dictAppendAll (addSharpsFlats dict (index + 1))
                         (List.map (getThisSharps index) letters))
                    (List.map (getThisFlats index) letters)
            Nothing -> log "bad sharps flats" dict
    else dict

        
letterDictWithSharpsFlats =
    addSharpsFlats letterDict 0



-- half step offsets from C0
offsetToFrequency offset =
    440.0 * (2.0 ^ (((toFloat offset) - (4*12+9)) / 12.0))
        
offsetLimit = 12 * 8

tupleReversed a b = (b, a)

offsetToOctave offset =
    offset // 12

namedFrequenciesForOffset offset =
    let frequency = offsetToFrequency offset
        maybeLetters = Dict.get (modBy 12 offset) letterDictWithSharpsFlats
        octave = String.fromInt (offsetToOctave offset)
    in
        case maybeLetters of
            Just letters ->
                List.map (tupleReversed frequency)
                    (List.map (\letter -> (letter++octave)) letters)
            Nothing -> log "bad get names music" []

namedFrequencies =
    (List.concatMap namedFrequenciesForOffset (List.range 0 offsetLimit))
