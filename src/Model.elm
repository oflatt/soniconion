module Model exposing (..)

import Browser.Dom as Dom
import Url
import Browser
import Browser.Navigation as Nav
import Dict exposing (Dict)
import Keyboard.Event exposing (KeyboardEvent)

import Json.Decode as Decode

type alias Error = String
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
         | KeyboardInput KeyboardEvent
         | LinkClicked Browser.UrlRequest
         | PageChange String
         | UrlChanged Url.Url
         | WindowResize Int Int
         | PlaySound
         | MouseMoved MousePos
         | MouseRelease
         | BlockClick Id
         | InputClick Id Int
         | OutputClick Id
         | InputHighlight Id Int
         | OutputHighlight Id
         | InputRightClick Id Int
         | OutputRightClick Id
         | SpawnBlock String -- when you click a block in the toolbar put it in hand
         | SetError String
         | InputUpdate Id Int String
         | SilentDomError (Result Dom.Error ())


pageNames : List String
pageNames = ["Home", "Unused"]
           
urlToPageName url =
    if (String.length url.path) > 1
    then
        let potentialName = (String.slice 1 (String.length url.path) url.path)
        in
         if List.member potentialName pageNames
         then potentialName
         else "Home"  
    else "Home"


type alias PageName = String
--type alias MousePos = (Float, Float)

type alias Id = Int

-- id of function output or a constant
type Input = Output Id
           | Text String
           | Hole

type alias Onion = List Function
type alias Function = List Call    



getCallById id func =
    case func of
        [] -> Nothing
        (call::calls) ->
            if call.id == id
            then Just call
            else getCallById id calls
               
type alias Call = {id: Id
                  ,inputs: List Input
                  ,functionName: String
                  ,outputText: String}

-- id needs to be unique to the Onion
constructCall : Id -> String -> Call
constructCall id functionName =
    (Call id [] functionName "")
    
type MouseSelection = BlockSelected Id
                    | InputSelected Id Int -- id of block and index of input
                    | OutputSelected Id
                    | NoneSelected

type alias MouseState = {mouseX : Int
                        ,mouseY : Int
                        ,mouseSelection : MouseSelection}

type alias ErrorBox = {error : String}

type alias Model = {currentPage: PageName
                   ,highlightedButton: PageName
                   ,urlkey : Nav.Key
                   ,url : Url.Url
                   ,indexurl : String
                   ,windowWidth : Int
                   ,windowHeight : Int
                   ,program : Onion
                   ,mouseState : MouseState
                   ,errorBoxMaybe : Maybe ErrorBox}

getindexurl url =
    let str = (Url.toString url)
    in
    (String.slice 0 ((String.length str)-(String.length url.path)) str)


type alias Flags = {innerWindowWidth : Int,
                   innerWindowHeight : Int,
                   outerWindowWidth : Int,
                   outerWindowHeight : Int}

       
-- play is assumed to be at the end
initialProgram : Onion
initialProgram = [[(Call 80 [Text "0", Text "440", Text "2"] "sine" "")
                  ,(Call 98 [Output 80, Text "600", Text "1"] "sine" "")
                  ,(Call 82 [Output 80, Text "400", Text "1"] "sine" "")
                  ,(Call 23 [Output 98, Text "300", Text "1"] "sine" "")
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
                                   initialProgram
                                   (MouseState
                                        0
                                        0
                                        NoneSelected)
                                   Nothing),
                                   Cmd.none)
