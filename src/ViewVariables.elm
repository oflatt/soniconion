module ViewVariables exposing (..)
import Css exposing (..)

pageColor = (rgb 247 247 222)
pageBackgroundColor = (rgb 229 229 208)



-- By pixel attributes
scrollbarWidth = 40
titleHeight = 90
buttonHeight = 50
svgYpos = titleHeight + buttonHeight


-- svg attributes
viewportWidth = 1000 -- defines the coordinate space
-- viewport Height depends on the aspect ratio of the screen, so that the svg
-- aspect ratio matches

blockWidth = 200
blockHeight = blockWidth // 3
blockSpacing = blockHeight // 2
               
nodeRadius = blockSpacing // 4
nodePadding = nodeRadius * 4
nodeSpacing = nodeRadius * 6
              
outputNodeY = blockHeight - nodeRadius
outputNodeX = blockWidth // 2

indexToNodeX index = index * nodeSpacing + nodePadding

toolbarProportion = 0.25

blockColor = "rgb(50, 214, 232)"
              



