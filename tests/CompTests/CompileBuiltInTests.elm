module CompTests.CompileBuiltInTests exposing (..)


import Expect exposing (Expectation)
import Test exposing (..)


import Compiler.CompileBuiltIn exposing (buildUnary)
import Compiler.CompModel exposing (Value(..), Expr, CompileExprFunction(..))


buildUnaryTest =
    describe "buildUnary"
        [test "basic + two arguments"
             (\_ ->
                  (Expect.equal
                       ((buildUnary "")
                            (Expr "+" 0 [(ConstV 0.5), (ConstV 0.5)] (CompileExprFunction (buildUnary ""))))
                       "(0.5+0.5)"))]

