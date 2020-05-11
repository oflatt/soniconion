module ViewVariables exposing (..)
import Css exposing (..)

pageColor = (rgb 247 247 222)
pageBackgroundColor = (rgb 229 229 208)



-- By pixel attributes ------------------------------------------
scrollbarWidth = 40
titleHeight = 90
buttonHeight = 50
svgYpos = titleHeight + buttonHeight
programWidth windowWidth = windowWidth - (2*scrollbarWidth)
-- height of the html object, but might scroll bigger
programHeight windowHeight = windowHeight - svgYpos - scrollbarWidth


                             
-- svg attributes ------------------------------------------------
viewportWidth = 1000 -- defines the coordinate space
-- viewport Height doesn't matter because we scroll down

toolbarWidth windowWidth = viewportWidth // 4
                                           
functionXSpacing = 100

blockHeight = 50
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

inputHeight = floor ((toFloat nodeRadius) * 2.5)

inputFontSizePercent = 0.85
charOverestimatePercent = 0.5
characterOverestimate = (toFloat inputHeight) * inputFontSizePercent * charOverestimatePercent
numCharactersToInputWidth numChars = floor (characterOverestimate * (toFloat (numChars+1)))

blockTextHeight = floor ((toFloat blockHeight) * 0.4)
blockCharacterOverestimate = (toFloat blockTextHeight) * charOverestimatePercent
blockTextXPadding = floor blockCharacterOverestimate

callTextBlockSize text =
    (floor (blockCharacterOverestimate * (toFloat (String.length text))))
        + 2 * blockTextXPadding
                    
toolbarProportion = 0.25

blockColor = "rgb(50, 214, 232)"
textInputColor = (rgb 186 232 188)
textInputColorVariable = (rgb 108 230 113)
errorColor = (rgb 255 150 150)
