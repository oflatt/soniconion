port module Main exposing (main)


import Model exposing (..)
import View exposing (view)
import Update exposing (update)

import Task
import Browser
import Browser.Events
import Browser.Dom
import Browser.Navigation as Nav
import Css exposing (..)
import Html
import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)
import Url
import Url.Builder
import Tuple


import Debug exposing (log)
import Json.Encode as E


main : Program Flags Model Msg
main =
    Browser.application
        { view = view
        , subscriptions = subscriptions
        , update = update
        , init = initialModel
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }



-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
    Browser.Events.onResize WindowResize


                      
