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
                           let oldMouse = model.mouseState
                               newMouse =
                                   {oldMouse | mousePressedp = False}
                           in
                               ({model |
                                     mouseState = newMouse}
                               ,Cmd.none)
                       MouseMoved pos ->
                           let oldMouse = model.mouseState
                               newMouse =
                                   {oldMouse |
                                        mouseX = pos.x,
                                        mouseY = pos.y}
                           in
                               ({model |
                                     mouseState = newMouse}
                               , Cmd.none)
                       Clicked id ->
                           let oldMouse = model.mouseState
                               newMouse = {oldMouse |
                                               mousePressedp = True,
                                               selectedId = id}
                           in
                               ({model |
                                     mouseState = newMouse}
                               ,Cmd.none)
                       PlaySound ->
                           (model
                           ,runSound (onionToJson model.program))
                       WindowResize newWidth newHeight ->
                           ({model |
                                 windowWidth = newWidth,
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

                                                  
