port module Update exposing (update)

import Model exposing (..)
import OnionToJson exposing (onionToJson, callToJson)
import Debug exposing (log)

import Url
import Url.Builder
import Browser
import Browser.Events
import Browser.Dom
import Browser.Navigation as Nav
import Json.Encode as Encode

port testprint : Int -> Cmd msg

port runSound : Encode.Value -> Cmd msg

-- UPDATE

changeUrl : Model -> Url.Url -> PageName -> (Model, Cmd Msg)
changeUrl model newurl newPage =
    ( { model | currentPage = newPage
         ,url = newurl}
       , Nav.pushUrl model.urlkey (Url.toString newurl)
       )

changeByName model pageName =
    let newurl =
            case (Url.fromString
                      (String.append
                           model.indexurl
                           (Url.Builder.absolute
                                [pageName] []))) of
                Nothing ->
                    model.url
                Just url -> url

    in changeUrl model newurl pageName

         
update : Msg -> Model -> (Model, Cmd Msg)
update msg model = case msg of
                       PlaySound ->
                           (model
                           ,runSound (callToJson sine))
                       WindowResize newWidth newHeight ->
                           ({model | windowWidth = newWidth,
                                                  windowHeight = newHeight},
                                Cmd.none)
                       LinkClicked urlRequest ->
                           case urlRequest of
                               Browser.Internal url ->
                                   (changeByName model (urlToPageName url))
                                       
                               Browser.External href ->
                                   ( model, Nav.load href )

                       PageChange pageName ->
                           let result = (changeByName model pageName)
                           in result
                                        

                       UrlChanged url ->
                           ((Tuple.first (changeByName model (urlToPageName url))),
                           Cmd.none)
                       
                       MouseOver pageName ->
                           ({model | highlightedButton = pageName},
                                testprint (2))
                       MouseLeave pageName -> if pageName == model.highlightedButton
                                              then ({model | highlightedButton = "none"}, Cmd.none)
                                              else (model, Cmd.none)

                                                  
