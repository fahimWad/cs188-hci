import React from "react";
import "react-pdf-highlighter-extended"
import { AreaHighlight, TextHighlight, useHighlightContainerContext, usePdfHighlighterContext } from "react-pdf-highlighter-extended";
import { CustomHighlight } from "./Highlights";

// Constants for easy refactor
const PRIMARY_HIGHLIGHTER_COLOR = "rgba(204, 196, 255, 1)"
const SECONDARY_HIGHLIGHTER_COLOR = "rgba(204, 196, 255, 0.25)"
const PAST_HIGHLIGHT_COLOR = "rgba(218, 218, 218, 0.31)"


const HighlighterContainer = () =>{
    const {
        highlight, // The highlight being rendred
        viewportToScaled, // Convert a highlight position to platform agnostic coords (useful for saving edits)
        screenshot, // Screenshot a bounding rectangle
        isScrolledTo, // Whether the highlight has been auto-scrolled to
        highlightBindings, // Whether the highlight has been auto-scrolled to
      } = useHighlightContainerContext<CustomHighlight>();
    const highlightContext = usePdfHighlighterContext()
    let highlighterColor = PAST_HIGHLIGHT_COLOR // Gray color
    if (highlight.active){ // Only if we are currently selecting the highlighter
      if (highlight.side == "front"){
        highlighterColor = PRIMARY_HIGHLIGHTER_COLOR
      }
      else if(highlight.side == "back"){
        highlighterColor = SECONDARY_HIGHLIGHTER_COLOR
      }
    }
    const isText = highlight.type == "text"
    const highlightContainer = isText ? (
        <TextHighlight highlight={highlight} isScrolledTo={isScrolledTo}
        style={{ background: highlighterColor }}></TextHighlight>

    ):(
        <AreaHighlight
          isScrolledTo={isScrolledTo}
          highlight={highlight}
          onChange={(boundingRect) => {
            const edit = {
              position: {
                boundingRect: viewportToScaled(boundingRect),
                rects: [],
              },
              content: {
                image: screenshot(boundingRect),
              },
            };
          }}
          bounds={highlightBindings.textLayer}
          onEditStart={() => undefined}
        />
      );
      return highlightContainer
}
export default HighlighterContainer