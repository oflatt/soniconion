module View exposing (view)

import Model exposing (..)
import ViewVariables
import DrawProgram exposing (drawProgram)
import TitleBar exposing (makeTitle)


import Docs.Tutorial exposing (makeTutorialPage)

import Browser
import Css exposing (..)

import Html.Styled exposing (..)
import Html.Styled.Attributes exposing (css, href, src, rel)
import Html.Styled.Events exposing (onClick, onMouseOver, onMouseLeave)
import Html.Attributes exposing (id)
import Svg
import Svg.Attributes

import Debug exposing (log)


               

view : Model -> Browser.Document Msg
view model =
    {title = "Sonic Onion"
    , body =
         [toUnstyled
              (case model.currentPage of
                   "Home" -> (makeHomePage model)
                   "Unused" -> (makeUnusedPage model)
                   "Docs" -> (makeDocsPage model)
                   "Tutorial" -> (makeTutorialPage model)
                   _ -> text "error: not a page")
         ]
    }

makeDocsPage model = text "hello"


pageWrapper page model =
    (div [ ]
         [ node "link" [rel "stylesheet"
                       ,href "https://fonts.googleapis.com/css?family=Tangerine"][]
         , node "link" [rel "stylesheet"
                       ,href "https://fonts.googleapis.com/css?family=Raleway"][]
             
             
         ,(makeTitle model)
             
         ,(pagebutton "Home" model)
         ,(pagebutton "Unused" model)
             
         ,div [css[display block
                ,backgroundColor ViewVariables.pageColor]]
             [page]
         ])

makeHomePage model = pageWrapper (programPage model) model
        
makeUnusedPage model =
    pageWrapper (text "") model
                     
pagebutton : PageName -> Model -> Html Msg
pagebutton pageName model =
    let buttonPageColor =
            if pageName == model.currentPage
            then ViewVariables.pageColor
            else ViewVariables.pageBackgroundColor
    in
    button [
         onClick (PageChange pageName)
        ,onMouseOver (MouseOver pageName)
        ,onMouseLeave (MouseLeave pageName)
        ,css
             [width (pct 20)
             ,height (px ViewVariables.buttonHeight)
             ,marginTop (px 10)
             ,marginRight (px 10)
             ,borderTopLeftRadius (px 8)
             ,borderTopRightRadius (px 8)
             ,if pageName == model.highlightedButton
              then border (px 2)
              else border (px 0)
             ,borderColor (rgb 0 0 0)
             ,borderBottomColor buttonPageColor
             ,outline none
             ,borderStyle solid
             ,backgroundColor buttonPageColor
             ,fontFamilies ["Raleway"]
             ,fontSize (px 20)
             ]]
    [text pageName]
        
        
pagedisplay pagename model = if model.currentPage == pagename then display block else display none
                                     
                                     

drawErrorBox errorBox =
    div [css [zIndex (int 2)
             ,borderRadius (px 15)
             ,backgroundColor ViewVariables.errorColor
             ,position fixed
             ,opacity (num 0.75)
             ,pointerEvents none]
        ]
    [
     div [css [margin (px 10)
              ]]
         [text errorBox.error]
    ]
    
    
programPage : Model -> Html Msg
programPage model =
    let programWidth = ViewVariables.toSvgWindowWidth model.windowWidth
        programSectionHeight = ViewVariables.toSvgWindowHeight model.windowHeight
        drawnProgram = (drawProgram
                            model.program
                            model.mouseState
                            programWidth
                            programSectionHeight
                            True)
    in
        div
        [css[display (inlineBlock)]]
        (case model.errorBoxMaybe of
             Nothing -> [drawnProgram]
             Just errorBox ->
                 [drawErrorBox errorBox
                 ,drawnProgram])
            
                
