module CompTests.OnionToExprTests exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)

import TestModel exposing (testFunction)
    
import Compiler.OnionToExpr exposing (onionToCompModel)
import Compiler.CompModel exposing (Value(..), Expr)
import Model exposing (Call, Input(..))



onionToCompModelTest =
    describe "onionToCompModel"
        [test "basic example"
             (\_ ->
                  (Expect.equal
                       (onionToCompModel [[(Call 0 [] "sine")]])
                       (Ok [[(Expr "sine" 0 [])]])))
        ,test "basic example with constant arg"
             (\_ ->
                  (Expect.equal
                       (onionToCompModel [[(Call 0 [(Const 2)] "sine")]])
                       (Ok [[(Expr "sine" 0 [(ConstV 2)])]])))

        ,test "test function"
            (\_ ->
                 (Expect.equal
                      (onionToCompModel [testFunction])
                      (Ok
                      [
                       [(Expr "sine" TestModel.sine.id [(ConstV 1)
                                                       ,(ConstV 440)])
                       ,(Expr "sine" TestModel.sine2.id [(ConstV 2)
                                                        ,(ConstV 640)])
                       ,(Expr "join" TestModel.join.id [(StackIndex 0)
                                                       ,(StackIndex 1)])
                       ,(Expr "play" TestModel.play.id [(StackIndex 2)])
                       ]
                      ])))
        ]
