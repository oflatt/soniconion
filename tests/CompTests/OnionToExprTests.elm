module CompTests.OnionToExprTests exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)

import TestModel exposing (testFunction)

import BuiltIn exposing (builtInFunctions, waveCompiler)
import Dict exposing (Dict)
import Compiler.OnionToExpr exposing (onionToCompModel)
import Compiler.CompModel exposing (Value(..), Expr)
import Compiler.CompModel as CompModel
import Model exposing (Call, Input(..))

numSystemValues = List.length CompModel.systemValues

makeExpr name id values =
    case Dict.get name builtInFunctions of
        Just builtInSpec -> (Expr name id values builtInSpec.compileExprFunction)
        Nothing -> (Expr "bad" -200 [] waveCompiler)
    
                  
onionToCompModelTest =
    describe "onionToCompModel"
        [test "basic example with constant arg"
             (\_ ->
                  (Expect.equal
                       (onionToCompModel [[(Call 0 [(Text "2")] "+" "")]])
                       (Ok [[(makeExpr "+" 0 [(ConstV 2)])]])))

        ,test "test function"
            (\_ ->
                 (Expect.equal
                      (onionToCompModel [testFunction])
                      (Ok
                      [
                       [(makeExpr "sine" TestModel.sine.id [(ConstV 1)
                                                           ,(ConstV 440)
                                                           ,(ConstV 1)])
                       ,(makeExpr "sine" TestModel.sine2.id [(ConstV 2)
                                                            ,(ConstV 640)
                                                            ,(ConstV 2)])
                       ,(makeExpr "+" TestModel.join.id [(StackIndex (numSystemValues + 0))
                                                        ,(StackIndex (numSystemValues + 1))])
                       ,(makeExpr "+" TestModel.plus.id [(StackIndex (numSystemValues + 2))])
                       ]
                      ])))
        ]
