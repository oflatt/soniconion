module CompTests.CompileBuiltInTests exposing (..)


import Expect exposing (Expectation)
import Test exposing (..)


import Compiler.CompileBuiltIn exposing (buildUnaryWithDefault)
import Compiler.CompModel exposing (Value(..), Expr, CompileExprFunction(..))


plusTest arguments result =
    (\_ ->
                  (Expect.equal
                       ((buildUnaryWithDefault "0")
                            (Expr "+" 0 arguments (CompileExprFunction (buildUnaryWithDefault "0"))))
                       ("stack.push(" ++ result ++ ");")))

buildUnaryTest =
    describe "buildUnary"
        [test "basic + two arguments"
             (plusTest [(ConstV 0.5), (ConstV 0.5)] "(0.5+0.5)")
        ,test "no arguments"
            (plusTest [] "0")]

