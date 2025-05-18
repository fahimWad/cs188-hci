import { PdfHighlighter, PdfLoader } from "react-pdf-highlighter";
import React from "react";
const PdfDisplay: React.FC = () => {
    return (
      <div
        style={{
          height: "100vh",
          width: "75vw",
          position: "relative", // <-- gives context
        }}
      >
        <PdfLoader
          url="https://arxiv.org/pdf/1708.08021.pdf"
          beforeLoad={<div>heehee loading</div>}
        >
          {(pdfDocument) => (
            <div
              style={{
                position: "absolute", // <-- MUST be absolute
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