module ViewVariables exposing (..)

import Utils exposing (darken)

import Css exposing (rgb)



pageColor = (rgb 247 247 222)
toolbarBackgroundColor = darken 10 pageColor
pageBackgroundColor = darken 20 pageColor



-- By pixel attributes ------------------------------------------
scrollbarWidth = 40
titleHeight = 90
buttonHeight = 50
svgYpos = titleHeight + buttonHeight
toSvgWindowWidth windowWidth = windowWidth - (scrollbarWidth+1)
toSvgWindowHeight windowHeight = windowHeight - svgYpos - buttonHeight

                             
-- svg attributes ------------------------------------------------
-- defines coordinate system for svg drawing
viewportHeight = 500
viewportWidth svgWindowWidth svgWindowHeight = floor (((toFloat svgWindowWidth) / (toFloat svgWindowHeight))
                                                          * (toFloat viewportHeight))


toolbarWidth = 100
                                           
functionXSpacing = 25
functionYSpacing = functionXSpacing
toolbarPadding = functionXSpacing // 2
funcInitialX = functionXSpacing
funcInitialY = functionYSpacing

blockHeight = 50
functionHeaderHeight = blockHeight
blockSpacing = blockHeight // 6

staffBlockHeight = (blockHeight * 8) // 5


lineXSpace = blockHeight // 2
lineWidth = 4
lineSpaceBeforeBlock = blockSpacing*3 // 2
               
nodeRadius = blockHeight // 7
hollowNodeOutlineProportion = 0.25
inputPadding = nodeRadius * 3
inputSpacing = nodeRadius * 1

inputHeight = nodeRadius * 2

inputFontSizePercent = 0.80
charOverestimatePercent = 0.6
characterOverestimate = (toFloat inputHeight) * inputFontSizePercent * charOverestimatePercent
numCharactersToInputWidth numChars = floor (characterOverestimate * (toFloat (numChars+1)))

blockTextInputHeight = blockHeight - (4 * nodeRadius)
blockTextInputYpos = nodeRadius*2
blockCharacterOverestimate = (toFloat blockTextInputHeight) * inputFontSizePercent * charOverestimatePercent
blockTextXPadding = floor blockCharacterOverestimate

callTextBlockSize text =
    (floor (blockCharacterOverestimate * (toFloat (String.length text))))
        + 2 * blockTextXPadding
                    
toolbarProportion = 0.25

staffBackgroundColor = (rgb 255 210 143)
blockColor = "rgb(50, 214, 232)"
textInputColor = (rgb 186 232 188)
textInputColorVariable = (rgb 108 230 113)
errorColor = (rgb 255 150 150)
holeGrey = "rgb(200, 200, 200)"
disabledGrey = rgb 220 220 220


functionHeaderSquareY = functionHeaderHeight-blockHeight+nodeRadius
