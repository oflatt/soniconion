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

handelFpsResult res =
    case res of
        Ok num -> FpsChange num
        Err err -> NoOp
handelRunningResult res =
    case res of
        Ok num -> RunningChange num
        Err err -> NoOp
                   
fpsChangeDecoder =
    (Decode.decodeValue
             (Decode.field "fps" Decode.int)) >> handelFpsResult

runningChangeDecoder =
    (Decode.decodeValue
         (Decode.field "running" Decode.bool)) >> handelRunningResult


type Msg = MouseOver String
         | MouseLeave String
         | KeyboardInput KeyboardEvent
         | LinkClicked Browser.UrlRequest
         | PageChange String
         | UrlChanged Url.Url
         | ScrollChange Pos
         | FpsChange Int
         | RunningChange Bool
         | WindowResize Int Int
         | PlayOnion Onion
         | StopSound
         | MouseMoved MousePos
         | MouseRelease


         | HeaderOutputHighlight Id Int
         | HeaderOutputUpdate Id Int String
         | HeaderOutputClick Id Int
         | HeaderOutputRightClick Id Int
         | HeaderNameClick Function (Int, Int)
         | HeaderClick Function (Int, Int)
         | HeaderNameHighlight Id
         | HeaderNameUpdate Id String
         | HeaderAddOutput Id Int
         | HeaderAddOutputRightClick Id Int
         
           
         | BlockClick Block Id (Int, Int)
         | BlockNameClick Block Id (Int, Int)
         | InputClick Id Int
         | OutputClick Id
         | InputHighlight Id Int
         | OutputHighlight Id
         | InputRightClick Id Int
         | OutputRightClick Id
         | BlockNameHighlight Id
         | InputUpdate Id Int String
         | BlockNameUpdate Id String
           
         | SpawnBlock Block (Int, Int)-- when you click a block in the toolbar put it in hand
         | SpawnFunction String (Int, Int)
         | SetError String
         | SilentDomError (Result Dom.Error ())
         | NoOp



docpages : List String
docpages = ["Tutorial"]
pageNames : List String
pageNames = ["Home", "Unused"] ++ docpages

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
           | FunctionArg Int
           | Hole

type alias Onion = List Function
type alias Function = { name: String
                      , id: Id
                      , args: List Input
                      , blocks: List Block}

nodeInputId blockid inputindex =
    "i" ++ (String.fromInt blockid) ++ "-" ++ (String.fromInt inputindex)
nodeOutputId blockid =
    "o" ++ (String.fromInt blockid)
nodeNameId blockid =
    "n" ++ (String.fromInt blockid)

headerNodeId functionid index =
    "h" ++ (String.fromInt functionid) ++ "-" ++ (String.fromInt index)
headerNameId functionid =
    "hn" ++ (String.fromInt functionid)

    
makeMain id blocks =
    makeFunc id blocks "main"

makeMainFromCalls id calls =
    makeFunc id (List.map CallBlock calls) "main"

makeFuncFromCalls id calls name =
    makeFunc id (List.map CallBlock calls) name
makeFunc id blocks name =
    (constructFunction id name blocks)

constructFunction id name blocks =
    (Function name id [] blocks)
        
getId block =
    case block of
        CallBlock c -> c.id
        StaffBlock s -> s.id

getInputs : Block -> List Input
getInputs block =
    case block of
        CallBlock c -> c.inputs
        _ -> []

getFunctionName block =
    case block of
        CallBlock c -> c.functionName
        _ -> ""

setFunctionName block name =
    case block of
        CallBlock c -> CallBlock {c | functionName = name}
        other -> other

setInputs : Block -> List Input -> Block
setInputs block inputs =
    case block of
        CallBlock c -> CallBlock {c | inputs = inputs}
        other -> other

getBlockById id func =
    case func of
        [] -> Nothing
        (block::blocks) ->
            if (getId block) == id
            then Just block
            else getBlockById id blocks
               
type alias Call = {id: Id
                  ,inputs: List Input
                  ,functionName: String
                  ,outputText: String}

type alias Note = {middleCOffset: Int
                  ,timeOffset: Int -- in sixteenth notes
                  ,noteDuration: Int} -- 0 is sixteeth note, 1 is eighth, ect

type alias Staff = {id: Id
                   ,notes: List Note
                   ,outputText: String}

type Block = CallBlock Call
           | StaffBlock Staff

type MouseSelection = BlockSelected Id Block (Int, Int) -- id of function it came from,
                                -- the svg offset on the block of the mouse cursor when it clicked the block
                    | FunctionSelected Function (Int, Int)-- the function in hand and the svg offset of cursor when clicked
                    | InputSelected Id Int -- id of block and index of input
                    | NameSelected Id
                    | OutputSelected Id
                    | FunctionOutputSelected Id Int
                    | FunctionNameSelected Id
                    | NoneSelected

type alias MouseState = {mouseX : Int
                        ,mouseY : Int
                        ,scrollX : Int
                        ,scrollY : Int
                        ,mouseSelection : MouseSelection}
                        
    
type alias ErrorBox = {error : String}

type alias Model = {currentPage: PageName
                   ,fps: Int
                   ,isRunning : Bool
                   ,highlightedButton: String
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


emptyMouseState = (MouseState
                       0
                       0
                       0
                       0
                       NoneSelected)
                      
initialProgram : Onion
initialProgram = [makeMain 0 []]

initialCommand flags url key = ((initialModel flags url key), Cmd.none)
                 
initialModel : Flags -> Url.Url -> Nav.Key -> Model
initialModel flags url key = (Model
                                  (urlToPageName url)
                                  0
                                  False
                                  "none"
                                  key url
                                  (getindexurl url)
                                  flags.innerWindowWidth
                                  flags.innerWindowHeight
                                  initialProgram
                                  emptyMouseState
                                  Nothing
                                  1)
                             
