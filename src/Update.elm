port module Update exposing (update)

import Model exposing (..)
import OnionToJson exposing (onionToJson)
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

mouse_scale_x : Int -> Int
mouse_scale_x mouse_x = (round ((toFloat mouse_x) * 1.65))
--mouse_scale_x mouse_x = (mouse_x // 5) 

mouse_scale_y : Int -> Int
mouse_scale_y mouse_y = (round ((toFloat mouse_y) * 1.65))
--mouse_scale_y mouse_y = (mouse_y // 5)
         
update : Msg -> Model -> (Model, Cmd Msg)
update msg model = case msg of
                       MouseRelease ->
                           ({model | drag = False}
                           ,Cmd.none)
                       MouseMoved pos ->
                           if model.start_x == -1 then
                               ({model |
                                   start_x = (mouse_scale_x pos.x),
                                   start_y = (mouse_scale_y pos.y),
                                   dx = 0,
                                   dy = 0}
                               , Cmd.none)
                           else
                               ({model |
                                   dx = (mouse_scale_x pos.x) - model.start_x,
                                   dy = (mouse_scale_y pos.y) - model.start_y}
                               , Cmd.none)
                       Move id ->
                           ({model | drag = True, sel_id = id, start_x = -1, start_y = -1}
                           ,(log (String.fromInt id) Cmd.none))
                       PlaySound ->
                           (model
                           ,runSound (onionToJson model.program))
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

                                                  
