import { PdfHighlighter, PdfLoader, ScaledPosition, AreaHighlight, PdfSelection, PdfHighlighterUtils } from "react-pdf-highlighter-extended";
import React, {useRef, useState} from "react";
import { getID,getNewID } from "../utils/flashCardID";
import "react-pdf-highlighter/dist/style.css"
import Flashcard, { FlashcardData } from "../components/Flashcard";
import FloatingFlashcard from "../components/FloatingFlashcard";
import Sidebar from "../components/Sidebar";
import { TextHighlight } from "react-pdf-highlighter-extended";
import { CustomHighlight } from "../components/Highlights";
import HighlighterContainer from "./HighlighterContainer";

const PdfDisplay: React.FC = () => {
    const [highlights, setHighlights] = useState<Array<CustomHighlight>>([]) // Actual array storing highlights
    const [front, switchSide] = useState<boolean>(true) // false = selecting back of flashcard, true = selecting front of flashcard
    const [flashcards, setFlashcards] = useState<Array<FlashcardData>>([]) // Array storing flashcard information
    const [currentFlashcard, setCurFlashcard] = useState<FlashcardData>({front:"",back:""})
    const highlighterUtilsRef = useRef<PdfHighlighterUtils | null>(null);
    const addHighlight = (highlight: CustomHighlight) => {
        const newHighlight: CustomHighlight = {...highlight, id: String(getID())}
        setHighlights((pastHighlights) => {
            return [newHighlight, ...pastHighlights]
        })
    }
    return (
      <div className="relative w-screen h-screen">
        <div className="w-3/4 h-full absolute left-0 top-0">
          <PdfLoader document="/designPDF.pdf">
            {(pdfDocument) => (
              <div className="absolute inset-0">
                <PdfHighlighter
                  pdfDocument={pdfDocument}
                  utilsRef={(_pdfHighlighterUtils) => {
                    highlighterUtilsRef.current = _pdfHighlighterUtils;
                  }}
                  enableAreaSelection={(mouseEvent: MouseEvent) => mouseEvent.ctrlKey}
                  onSelection={(
                    selection: PdfSelection
                  ) => {
                    selection.makeGhostHighlight()
                  }}
                  highlights={highlights}
                >
                  <HighlighterContainer></HighlighterContainer>
                  </PdfHighlighter>
              </div>
            )}
          </PdfLoader>
        </div>
      </div>
    );
  };
export default PdfDisplay