module Main exposing (main)


import Model exposing (..)
import View exposing (view)
import Update exposing (update, scrollChange, fpsChange, runningChange)

import Task
import Browser
import Browser.Events
import Browser.Dom
import Browser.Navigation as Nav
import Keyboard.Event exposing (KeyboardEvent, decodeKeyboardEvent)
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
import Json.Decode as Decode


main : Program Flags Model Msg
main =
    Browser.application
        { view = view
        , subscriptions = subscriptions
        , update = update
        , init = initialCommand
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
    [ Browser.Events.onResize WindowResize
    , Browser.Events.onMouseMove (Decode.map MouseMoved mouseDecoder)
    , Browser.Events.onMouseUp (Decode.succeed MouseRelease)
    , Browser.Events.onKeyDown (Decode.map KeyboardInput decodeKeyboardEvent)
    , scrollChange scrollChangeDecoder
    , fpsChange fpsChangeDecoder
    , runningChange runningChangeDecoder]

    -- mouse down handled by svg objects and buttons
