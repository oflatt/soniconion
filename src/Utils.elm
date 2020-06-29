module Utils exposing (..)

import Dict exposing (Dict)
import Css exposing (rgba)

darkenInt amount int =
    min (max 0 (int-amount)) 255

darken amount color =
    (rgba (darkenInt amount color.red) (darkenInt amount color.green) (darkenInt amount color.blue) color.alpha)

splitLast : List t -> Maybe (List t, t)
splitLast func =
    case func of
        [] -> Nothing
        [a] -> Just ([], a)
        (c::cs) ->
            case splitLast cs of
                Just (rest, final) -> Just (c::rest, final)
                Nothing -> Nothing -- can't happen
                
                


last : List t -> Maybe t
last func =
    case func of
        [] -> Nothing
        [a] -> Just a
        (c::cs) -> last cs

findBy list key =
    case list of
        [] -> Nothing
        (first::rest) ->
            if (key first) then Just first else findBy rest key

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

dictAppend : Dict comparable (List b) -> comparable -> b -> Dict comparable (List b)
dictAppend dict key val =
    Dict.update key
        (\maybeoldlist ->
             (case maybeoldlist of
                  Just oldlist -> Just (val :: oldlist)
                  Nothing -> Just [val]))
        dict

dictAppendAll : Dict comparable (List b) -> List (comparable, b) -> Dict comparable (List b)
dictAppendAll dict list =
    case list of
        [] -> dict
        (ele::eles) -> dictAppend (dictAppendAll dict eles) (Tuple.first ele) (Tuple.second ele)


resultMap func list =
    case list of
        [] -> Ok []
        (first::rest) ->
            Result.map2
                (::)
                (func first)
                (resultMap func rest)
