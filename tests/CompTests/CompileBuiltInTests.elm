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


