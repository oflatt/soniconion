module Model exposing (..)

import Url
import Browser
import Browser.Navigation as Nav

type Msg = MouseOver PageName
         | MouseLeave PageName
         | LinkClicked Browser.UrlRequest
         | PageChange String
         | UrlChanged Url.Url
         | WindowResize Int Int

urlToPageName url =
    if url.path == "/" then
        "Home"
    else
        (String.slice 1 (String.length url.path) url.path)


type alias PageName = String
type alias MousePos = (Float, Float)

type alias Id = Int
type alias Constant = Int
-- id of function output or a constant
type Input = Output Id
           | Const Constant

type alias Onion = List Function
type alias Function = List Expr
type alias Expr = {id: Id
                  ,inputs: List Input
                  ,funcName: String}
    
type alias Model = {currentPage: PageName
                   ,highlightedButton: PageName
                   ,urlkey : Nav.Key
                   ,url : Url.Url
                   ,indexurl : String
                   ,windowWidth : Int
                   ,windowHeight : Int
                   ,program : Onion}

getindexurl url =
    let str = (Url.toString url)
    in
    (String.slice 0 ((String.length str)-(String.length url.path)) str)


type alias Flags = {innerWindowWidth : Int,
                   innerWindowHeight : Int,
                   outerWindowWidth : Int,
                   outerWindowHeight : Int}


initialProgram = [[(Expr 1 [Const 1, Const 440] "sine")
                  ,(Expr 2 [Output 1] "play")
                  ]
                 ] 
 
initialModel : Flags -> Url.Url -> Nav.Key -> (Model, Cmd Msg)
initialModel flags url key = ((Model
                                   (urlToPageName url)
                                   "none"
                                   key url
                                   (getindexurl url)
                                   flags.innerWindowWidth
                                   flags.innerWindowHeight
                                   initialProgram),
                                  Cmd.none)
