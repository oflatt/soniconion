module Model exposing (..)

import Url
import Browser
import Browser.Navigation as Nav
import Dict exposing (Dict)

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

type alias BuiltInSpec = (String, ArgList)
type alias BuiltInList = List BuiltInSpec

-- infinite has a minimum number of args
type ArgList = Finite (List String)
             | Infinite Int

waveList : List BuiltInSpec
waveList =
           [("sine", Finite ["duration", "frequency"])
           ,("sleep", Finite [])]
specialFunctionList = [("join", Infinite 0)
                      ,("sequence", Infinite 0)]
builtInFunctionList : BuiltInList
builtInFunctionList = waveList ++ specialFunctionList
                      

-- maps function names to a list of arg names
builtInFunctions : Dict String ArgList
builtInFunctions =
    Dict.fromList builtInFunctionList
waveFunctions = Dict.fromList waveList
specialFunctions = Dict.fromList builtInFunctionList
        

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
                   ,program : Onion}

getindexurl url =
    let str = (Url.toString url)
    in
    (String.slice 0 ((String.length str)-(String.length url.path)) str)


type alias Flags = {innerWindowWidth : Int,
                   innerWindowHeight : Int,
                   outerWindowWidth : Int,
                   outerWindowHeight : Int}

sine = (Call 1 (BuiltInE (BuiltIn [Const 1, Const 440] "sine")))
sine2 = (Call 2 (BuiltInE (BuiltIn [Const 2, Const 640] "sine")))
join = (Call 3 (BuiltInE (BuiltIn [Output 1, Output 2] "join")))
play = (Call 1092392 (PlayE (Play (Output 3))))
       
-- play is assumed to be at the end
initialProgram : Onion
initialProgram = [[sine
                  ,sine2
                  ,join
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
