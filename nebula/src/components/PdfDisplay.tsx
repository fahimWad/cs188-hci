import {
  PdfHighlighter,
  PdfLoader,
  ScaledPosition,
  AreaHighlight,
  PdfSelection,
  PdfHighlighterUtils,
  GhostHighlight,
} from "react-pdf-highlighter-extended";
import React, { useRef, useState } from "react";
import { getID, getNewID } from "../utils/flashCardID";
import "react-pdf-highlighter/dist/style.css";
import Flashcard, { FlashcardData } from "../components/Flashcard";
import FloatingFlashcard from "../components/FloatingFlashcard";
import Sidebar from "../components/Sidebar";
import { CustomHighlight } from "../components/Highlights";
import HighlighterContainer from "./HighlighterContainer";
const PdfDisplay: React.FC = () => {
  const [highlights, setHighlights] = useState<Array<CustomHighlight>>([]); // Actual array storing highlights
  const [front, switchSide] = useState<boolean>(true); // false = selecting back of flashcard, true = selecting front of flashcard
  const [flashcards, setFlashcards] = useState<Array<FlashcardData>>([]); // Array storing flashcard information
  const [currentFlashcard, setCurFlashcard] = useState<FlashcardData>({
    front: "",
    back: "",
  });
  const highlighterUtilsRef = useRef<PdfHighlighterUtils | null>(null);
  const addHighlight = (highlight: GhostHighlight) => {
    // Use to actually save highlight
    const newHighlight: CustomHighlight = {
      ...highlight,
      side: front ? "front" : "back",
      flashcardID: getID(),
      id: String(getID()),
      active: true,
    };
    setHighlights((pastHighlights) => {
      return [newHighlight, ...pastHighlights];
    });
  };
  const handleConfirm = () => {
    setFlashcards((prev) => [...prev, currentFlashcard]);
    setCurFlashcard({
      front: "",
      back: "",
    });
    switchSide((prev) => true);
  };

  const handleDelete = () => {
    setFlashcards((prev) =>
      prev.filter(
        (card) =>
          card.front !== currentFlashcard.front ||
          card.back !== currentFlashcard.back
      )
    );
    setCurFlashcard({ front: "", back: "" });
  }
  return (
    <div className="relative w-screen h-screen">
      <div className="h-full absolute left-0 top-0 w-screen overflow-hidden">
        <PdfLoader document="/designPDF.pdf">
          {(pdfDocument) => (
            <div className="absolute inset-0">
              <PdfHighlighter
                pdfDocument={pdfDocument}
                utilsRef={(_pdfHighlighterUtils) => {
                  highlighterUtilsRef.current = _pdfHighlighterUtils;
                }}
                enableAreaSelection={(mouseEvent: MouseEvent) =>
                  mouseEvent.altKey
                }
                onSelection={(selection: PdfSelection) => {
                  if (front) {
                    const nextFlashcard = {
                      front: [
                        currentFlashcard.front ?? "",
                        (currentFlashcard.front ?? "").trimEnd().length
                          ? " "
                          : "",
                        selection.content.text ?? selection.content.image ?? "",
                      ].join(""), // Add to current back of flashcard (appending space if no space)
                      back: currentFlashcard.back ?? "",
                    };
                    setCurFlashcard(nextFlashcard);
                    //switchSide((side) => !side);
                  } else if (!front) {
                    const completeFlashcard = {
                      id: getNewID(),
                      front: currentFlashcard.front ?? "",
                      back: [
                        currentFlashcard.back ?? "",
                        (currentFlashcard.back ?? "").trimEnd().length
                          ? " "
                          : "",
                        selection.content.text ?? selection.content.image ?? "",
                      ].join(""), // Add to current back of flashcard (appending space if no space)
                    };
                    setCurFlashcard(completeFlashcard);
                    //switchSide((side) => !side);
                    console.log(flashcards);
                  }
                  addHighlight(selection.makeGhostHighlight());
                }}
                highlights={highlights}
              >
                <HighlighterContainer></HighlighterContainer>
              </PdfHighlighter>
            </div>
          )}
        </PdfLoader>
      </div>
      <FloatingFlashcard
        flashcard={currentFlashcard}
        onFlip={() => {
          switchSide((prev) => !prev);
        }}
        onConfirm= {handleConfirm}
        onDelete= {handleDelete}
      />
      <div className="absolute top-0 right-0 h-full w-[300px] z-[200]">
        <Sidebar cards={flashcards} setCards={setFlashcards} />
      </div>
    </div>
  );
};
export default PdfDisplay;
