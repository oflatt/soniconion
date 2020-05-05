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

blockWidth = 200
blockHeight = blockWidth // 3
blockSpacing = blockHeight // 3
-- this does not factor in the space for the lines, but is acurate for a block without lines
blockSpace = blockHeight + blockSpacing


funcNameFontHeight = blockHeight // 2
             

lineXSpace = blockHeight // 2
lineWidth = "4"
lineSpaceBeforeBlock = blockSpacing // 2
               
nodeRadius = blockHeight // 8
nodePadding = nodeRadius * 4
nodeSpacing = nodeRadius * 6
              
outputNodeY = blockHeight - nodeRadius
outputNodeX = blockWidth // 2

indexToNodeX index = index * nodeSpacing + nodePadding

inputWidth = (nodeSpacing - nodeRadius)
inputHeight = nodeRadius * 2
                     
toolbarProportion = 0.25

blockColor = "rgb(50, 214, 232)"
errorColor = (rgb 255 150 150)
