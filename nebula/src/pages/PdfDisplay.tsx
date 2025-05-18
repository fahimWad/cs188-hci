import { PdfHighlighter, PdfLoader,IHighlight,NewHighlight, ScaledPosition, Highlight, AreaHighlight } from "react-pdf-highlighter";
import React, {useState} from "react";
import { getID } from "../utils/flashCardID";
import "react-pdf-highlighter/dist/style.css"
const PdfDisplay: React.FC = () => {
    const [highlights, setHighlights] = useState<Array<IHighlight>>([])
    const addHighlight = (highlight: NewHighlight) => {
        const newHighlight: IHighlight = {...highlight, id: String(getID())}
        setHighlights((pastHighlights) => {
            return [newHighlight, ...pastHighlights]
        })
    }
    return (
      <div
        style={{
          height: "100vh",
          width: "75vw",
          position: "relative", // positioning context
        }}
      >
        <PdfLoader url="/examplePDF.pdf" beforeLoad={<div>heehee loading</div>}>
          {(pdfDocument) => (
            <div
              style={{
                position: "absolute", // ← THIS is crucial
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(mouseEvent: MouseEvent) =>
                  mouseEvent.ctrlKey
                }
                onScrollChange={() => {}}
                scrollRef={() => {}}
                onSelectionFinished={(pos:ScaledPosition,content:{text?:string, image?:string}) =>
                     {
                        addHighlight({position:pos, content:content, comment:{text: "wa", emoji:""}})
                        return null
                        }
                    }
                    highlightTransform={(highlight, index, setTip, hideTip, viewportToScaled, screenshot, isScrolledTo) => {
                        const isTextHighlight = !highlight.content?.image;
                      
                        return isTextHighlight ? (
                          <Highlight
                            key={index}
                            isScrolledTo={isScrolledTo}
                            position={highlight.position}
                            comment={highlight.comment}
                          />
                        ) : (
                          <AreaHighlight
                            key={index}
                            isScrolledTo={isScrolledTo}
                            highlight={highlight}
                            onChange={(boundingRect) => {
                              // Optionally update highlight on resize
                            }}
                          />
                        );
                      }}
                highlights={highlights}
              />
            </div>
          )}
        </PdfLoader>
      </div>
    );
  };
export default PdfDisplay