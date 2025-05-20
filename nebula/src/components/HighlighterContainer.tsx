import React from "react";
import "react-pdf-highlighter-extended"
import { AreaHighlight, TextHighlight, useHighlightContainerContext, usePdfHighlighterContext } from "react-pdf-highlighter-extended";

const HighlighterContainer = () =>{
    const {
        highlight, // The highlight being rendred
        viewportToScaled, // Convert a highlight position to platform agnostic coords (useful for saving edits)
        screenshot, // Screenshot a bounding rectangle
        isScrolledTo, // Whether the highlight has been auto-scrolled to
        highlightBindings, // Whether the highlight has been auto-scrolled to
      } = useHighlightContainerContext();
    const highlightContext = usePdfHighlighterContext()
    const isText = highlight.type == "text"
    const highlightContainer = isText ? (
        <TextHighlight highlight={highlight} isScrolledTo={isScrolledTo}></TextHighlight>

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