module MusicTheoryTests exposing (..)

import Expect exposing (Expectation)
import Dict exposing (Dict)
import Test exposing (..)
import MusicTheory

letterDict : Test
letterDict =
    describe "letterDict"
        [test "1 example"
             (\_ -> (Expect.equal
                         (Just ["Cs", "Db"])
                         (Dict.get 1 MusicTheory.letterDictWithSharpsFlats)))
        ,test "0 example"
             (\_ -> (Expect.equal
                         (Just ["Bs", "C"])
                         (Dict.get 0 MusicTheory.letterDictWithSharpsFlats)))
        ,test "mod example"
            (\_ -> (Expect.equal
                        (modBy 12 -1)
                        11))
         ]


