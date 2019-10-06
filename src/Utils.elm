module Utils exposing (..)


last : List t -> Maybe t
last func =
    case func of
        [] -> Nothing
        [a] -> Just a
        (c::cs) -> last cs
