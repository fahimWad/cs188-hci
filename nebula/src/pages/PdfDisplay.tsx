import { PdfHighlighter, PdfLoader,IHighlight,NewHighlight, ScaledPosition, Highlight, AreaHighlight } from "react-pdf-highlighter";
import React, {useState} from "react";
import { getID } from "../utils/flashCardID";
import "react-pdf-highlighter/dist/style.css"
import Flashcard, { FlashcardData } from "../components/Flashcard";
import FloatingFlashcard from "../components/FloatingFlashcard";
import Sidebar from "../components/Sidebar";

const PdfDisplay: React.FC = () => {
    const [highlights, setHighlights] = useState<Array<IHighlight>>([]) // Actual array storing highlights
    const [front, switchSide] = useState<boolean>(true) // false = selecting back of flashcard, true = selecting front of flashcard
    const [flashcards, setFlashcards] = useState<Array<FlashcardData>>([]) // Array storing flashcard information
    const [currentFlashcard, setCurFlashcard] = useState<FlashcardData>({front:"",back:""})
    const addHighlight = (highlight: NewHighlight) => {
        const newHighlight: IHighlight = {...highlight, id: String(getID())}
        setHighlights((pastHighlights) => {
            return [newHighlight, ...pastHighlights]
        })
    }
    return (
      <div className="relative w-screen h-screen">
        <div className="w-3/4 h-full absolute left-0 top-0">
          <PdfLoader url="/designPDF.pdf" beforeLoad={<div>heehee loading</div>}>
            {(pdfDocument) => (
              <div className="absolute inset-0">
                <PdfHighlighter
                  pdfDocument={pdfDocument}
                  enableAreaSelection={(mouseEvent: MouseEvent) => mouseEvent.ctrlKey}
                  onScrollChange={() => {}}
                  scrollRef={() => {}}
                  onSelectionFinished={(
                    pos: ScaledPosition,
                    content: { text?: string; image?: string }
                  ) => {
                    console.log(content);
                    console.log(currentFlashcard);
                    if (front) {
                      const nextFlashcard = {
                        front: content.text ?? content.image ?? "",
                        back: "",
                      };
                      setCurFlashcard(nextFlashcard);
                      switchSide((side) => !side);
                    } else if (!front) {
                      const completeFlashcard = {
                        id: getID(),
                        front: currentFlashcard.front,
                        back: content.text ?? content.image ?? "",
                      };
                      setCurFlashcard(completeFlashcard);
                      setFlashcards((prev) => [...prev, completeFlashcard]);
                      switchSide((side) => !side);
                      console.log(flashcards);
                    }
                    addHighlight({
                      position: pos,
                      content: content,
                      comment: { text: "wa", emoji: "" },
                    });
                    return null;
                  }}
                  highlightTransform={(
                    highlight,
                    index,
                    setTip,
                    hideTip,
                    viewportToScaled,
                    screenshot,
                    isScrolledTo
                  ) => {
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
                          // Blank for now
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
        
        {/* Render the floating flashcard under (or atop) the sidebar */}
        <FloatingFlashcard flashcard={currentFlashcard} />
        <div className="absolute top-0 right-0 h-full w-[300px] z-[200]">
          <Sidebar initialCards={flashcards} />
        </div>
      </div>
    );
  };
export default PdfDisplay