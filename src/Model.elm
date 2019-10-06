module Model exposing (..)

import Url
import Browser
import Browser.Navigation as Nav
import Dict exposing (Dict)

import Json.Decode as Decode

type alias MousePos =
    { x : Int
    , y : Int
    }

mouseDecoder : Decode.Decoder MousePos
mouseDecoder = 
    Decode.map2 MousePos
        (Decode.field "clientX" Decode.int)
        (Decode.field "clientY" Decode.int)

type Msg = MouseOver PageName
         | MouseLeave PageName
         | LinkClicked Browser.UrlRequest
         | PageChange String
         | UrlChanged Url.Url
         | WindowResize Int Int
         | PlaySound
         | Move Int
         | MouseMoved MousePos
         | MouseRelease

urlToPageName url =
    if url.path == "/" then
        "Home"
    else
        (String.slice 1 (String.length url.path) url.path)


type alias PageName = String
--type alias MousePos = (Float, Float)

type alias Id = Int
type alias Constant = Float
-- id of function output or a constant
type Input = Output Id
           | Const Constant
           | Hole

type alias Onion = List Function
type alias Function = List Call

type alias BuiltInSpec = (String, (List String))
type alias BuiltInList = List BuiltInSpec
    
builtInFunctionList : BuiltInList
builtInFunctionList = [("sine", ["duration", "frequency"])
                      ,("sleep", [])
                      ,("join", ["wave1", "wave2"])
                      ]

-- maps function names to a list of arg names
builtInFunctions : Dict String (List String)
builtInFunctions =
    Dict.fromList builtInFunctionList
        

type alias BuiltIn = {inputs: List Input
                     ,waveType: String}

type alias Play = {input: Input}
type Expr = BuiltInE BuiltIn
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
                   ,program : Onion
                   ,start_x : Int
                   ,start_y : Int
                   ,dx : Int
                   ,dy : Int
                   ,sel_id : Int
                   ,drag : Bool}

getindexurl url =
    let str = (Url.toString url)
    in
    (String.slice 0 ((String.length str)-(String.length url.path)) str)


type alias Flags = {innerWindowWidth : Int,
                   innerWindowHeight : Int,
                   outerWindowWidth : Int,
                   outerWindowHeight : Int}

sine = (Call 1 (BuiltInE (BuiltIn [Const 1, Const 440] "sine")))
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
                                   initialProgram
                                   0
                                   0
                                   0
                                   0
                                   -1
                                   False),
                                   Cmd.none)
