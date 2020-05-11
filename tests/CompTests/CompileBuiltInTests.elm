module CompTests.CompileBuiltInTests exposing (..)


import Expect exposing (Expectation)
import Test exposing (..)


import Compiler.CompileBuiltIn exposing (buildUnaryWithDefault)
import Compiler.CompModel exposing (Value(..), Expr, CompileExprFunction(..), AST(..))


plusTest arguments result =
    (\_ ->
                  (Expect.equal
                       ((buildUnaryWithDefault "0")
                            (Expr "+" 0 arguments (CompileExprFunction (buildUnaryWithDefault "0"))))
                       result))

buildUnaryTest =
    describe "buildUnary"
        [test "basic + two arguments"
             (plusTest [(ConstV 0.5), (ConstV 0.5)]
                  (Unary "+" [(Literal "0.5"), (Literal "0.5")]))
        ,test "no arguments"
            (plusTest [] (Literal "0"))]

