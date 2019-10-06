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
         | PlaySound

urlToPageName url =
    if url.path == "/" then
        "Home"
    else
        (String.slice 1 (String.length url.path) url.path)


type alias PageName = String
type alias MousePos = (Float, Float)

type alias Id = Int
type alias Constant = Float
-- id of function output or a constant
type Input = Output Id
           | Const Constant
           | Hole

type alias Onion = List Function
type alias Function = List Call

type alias Wave = {inputs: (Input, Input)
                  ,waveType: String}
type alias Play = {input: Input}
type Expr = WaveE Wave
          | PlayE Play
          
type alias Call = {id: Id,
                   expr: Expr}
    
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

sine = (Call 1 (WaveE (Wave (Const 1, Const 440) "sine")))
play = (Call 2 (PlayE (Play (Output 1))))
       
-- play is assumed to be at the end
initialProgram : Onion
initialProgram = [[sine
                  ,play]
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
