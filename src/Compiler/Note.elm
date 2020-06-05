module Compiler.Note exposing (makeNote)

import Compiler.CompModel exposing (CompModel, Method, Expr, AST(..), CompileExprFunction(..),
                                        forRange, false, true)
import Utils

noteType = Lit "'note'"
makeNote frequency volume =
    Object [("type", noteType), ("frequency", frequency), ("volume", volume)]
