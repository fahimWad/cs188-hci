import { PdfHighlighter, PdfLoader } from "react-pdf-highlighter";
import React from "react";
import "react-pdf-highlighter/dist/style.css"
const PdfDisplay: React.FC = () => {
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
                onSelectionFinished={() => null}
                highlightTransform={() => null}
                highlights={[]}
              />
            </div>
          )}
        </PdfLoader>
      </div>
    );
  };
export default PdfDisplay