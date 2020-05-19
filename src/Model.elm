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

type alias Pos =
    { xpos : Int
    , ypos : Int}

mouseDecoder : Decode.Decoder MousePos
mouseDecoder = 
    Decode.map2 MousePos
        (Decode.field "clientX" Decode.int)
        (Decode.field "clientY" Decode.int)
            
handelScrollResult scrollRes =
    case scrollRes of
        Ok res -> ScrollChange res
        Err err -> NoOp
            
scrollChangeDecoder =
    (Decode.decodeValue
        (Decode.map2 Pos
             (Decode.field "xpos" Decode.int)
             (Decode.field "ypos" Decode.int))) >> handelScrollResult
            

type Msg = MouseOver PageName
         | MouseLeave PageName
         | KeyboardInput KeyboardEvent
         | LinkClicked Browser.UrlRequest
         | PageChange String
         | UrlChanged Url.Url
         | ScrollChange Pos
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
         | BlockNameHighlight Id
         | BlockNameClick Id
         | InputUpdate Id Int String
         | BlockNameUpdate Id String
           
         | SpawnBlock String -- when you click a block in the toolbar put it in hand
         | SetError String
         | SilentDomError (Result Dom.Error ())
         | NoOp


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
type alias Function = { name: String
                      , args: List Input
                      , calls: List Call}

makeMain calls =
    (Function "main" [] calls)


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

type MouseSelection = BlockSelected Id
                    | InputSelected Id Int -- id of block and index of input
                    | NameSelected Id
                    | OutputSelected Id
                    | NoneSelected

type alias MouseState = {mouseX : Int
                        ,mouseY : Int
                        ,scrollX : Int
                        ,scrollY : Int
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
                   ,errorBoxMaybe : Maybe ErrorBox
                   ,idCounter : Int}

getindexurl url =
    let str = (Url.toString url)
    in
    (String.slice 0 ((String.length str)-(String.length url.path)) str)


type alias Flags = {innerWindowWidth : Int,
                   innerWindowHeight : Int,
                   outerWindowWidth : Int,
                   outerWindowHeight : Int}

       
initialProgram : Onion
initialProgram = [makeMain []]

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
                                        0
                                        0
                                        NoneSelected)
                                   Nothing
                                   0),
                                   Cmd.none)
