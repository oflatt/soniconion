module ViewVariables exposing (..)
import Css exposing (..)

pageColor = (rgb 247 247 222)
pageBackgroundColor = (rgb 229 229 208)



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
funcInitialX = toolbarWidth+functionXSpacing
funcInitialY = functionYSpacing

blockHeight = 50
functionHeaderHeight = blockHeight
blockSpacing = blockHeight // 6
-- this does not factor in the space for the lines, but is acurate for a block without lines
blockSpace = blockHeight + blockSpacing

lineXSpace = blockHeight // 2
lineWidth = "4"
lineSpaceBeforeBlock = blockSpacing*3 // 2
               
nodeRadius = blockHeight // 7
inputPadding = nodeRadius * 3
inputSpacing = nodeRadius * 1



outputNodeY = blockHeight - nodeRadius

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

blockColor = "rgb(50, 214, 232)"
textInputColor = (rgb 186 232 188)
textInputColorVariable = (rgb 108 230 113)
errorColor = (rgb 255 150 150)


functionHeaderSquareY = functionHeaderHeight-blockHeight+nodeRadius
