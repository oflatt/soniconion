module Utils exposing (..)


last : List t -> Maybe t
last func =
    case func of
        [] -> Nothing
        [a] -> Just a
        (c::cs) -> last cs

listToStringListRest : List Int -> String
listToStringListRest l =
    case l of
        [] -> ""
        (i::is) -> "," ++ (String.fromInt i) ++ listToStringListRest is
                   
listToStringList : List Int -> String
listToStringList l =
    case l of
        [] -> ""
        (i::is) -> (String.fromInt i) ++ listToStringListRest is
