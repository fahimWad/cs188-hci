import {
  PdfHighlighter,
  PdfLoader,
  ScaledPosition,
  AreaHighlight,
  PdfSelection,
  PdfHighlighterUtils,
  GhostHighlight,
} from "react-pdf-highlighter-extended";
import React, { useRef, useState, useEffect } from "react";
import { getID, getNewID } from "../utils/flashCardID";
import "react-pdf-highlighter/dist/style.css";
import Flashcard, { FlashcardData } from "../components/flashcard_components/Flashcard";
import Sidebar from "../components/flashcard_components/Sidebar";
import PageNav from "../components/flashcard_components/PageNav";
import { CustomHighlight } from "../components/flashcard_components/Highlights";
import HighlighterContainer from "../components/flashcard_components/HighlighterContainer";

interface PdfDisplayProps {
  highlights: Array<CustomHighlight>; // Array of highlights to be displayed
  setHighlights: React.Dispatch<React.SetStateAction<Array<CustomHighlight>>>; // Function to update highlights
  flashcards: Array<FlashcardData>; // Array of flashcards
  setFlashcards: React.Dispatch<React.SetStateAction<Array<FlashcardData>>>; // Function to update flashcards
}

const PdfDisplay: React.FC<PdfDisplayProps> = ({ highlights, setHighlights, flashcards, setFlashcards }) => {
  const [front, switchSide] = useState<boolean>(true); // false = selecting back of flashcard, true = selecting front of flashcard
  const [pendingFlashcardId, setPendingFlashcardId] = useState<number | null>(
    null
  ); // ID of flashcard being edited
  const createNewFlashcard = () => {
    const newID: number = getNewID();
    setPendingFlashcardId(newID);
    return { front: "", back: "", id: String(newID) };
  };
  const [currentFlashcard, setCurFlashcard] =
    useState<FlashcardData>(createNewFlashcard);
  const highlighterUtilsRef = useRef<PdfHighlighterUtils | null>(null);

  const addHighlight = (highlight: GhostHighlight) => {
    const highlightId = pendingFlashcardId ?? getID();
    // Use to actually save highlight
    const newHighlight: CustomHighlight = {
      ...highlight,
      side: front ? "front" : "back",
      flashcardID: highlightId,
      id: String(highlightId),
      active: true,
    };
    // DEBUGGING
    console.log("Adding highlight:", newHighlight);
    setHighlights((pastHighlights) => {
      return [newHighlight, ...pastHighlights];
    });
  };

  const handleConfirm = () => {
    setFlashcards((prev) => [...prev, currentFlashcard]);
    console.log(currentFlashcard.id);
    setCurFlashcard(createNewFlashcard());
    switchSide(true); // Always front when moving on to new flashcard
    unactiveHighlights();
  };
  const unactiveHighlights = () => {
    highlights.forEach((highlight: CustomHighlight) => {
      highlight.active = false;
    });
  };
  const activateHighlights = (flashcardId: number) => {
    setHighlights((prev) =>
      prev.map((h) =>
        h.flashcardID === flashcardId
          ? { ...h, active: true }
          : { ...h, active: false }
      )
    );

    setPendingFlashcardId(null);
    switchSide(true); // reset to front
  };

  const handleDelete = () => {
    setFlashcards((prev) =>
      prev.filter(
        (card) =>
          card.front !== currentFlashcard.front ||
          card.back !== currentFlashcard.back
      )
    );
    setPendingFlashcardId(null);
    
    if (front) {
      // Clear front text and remove only front highlights for this flashcard
      setCurFlashcard((prev) => ({ ...prev, front: "" }));
      setHighlights((prev) =>
        prev.filter(
          (h) =>
            String(h.flashcardID) !== currentFlashcard.id ||
            h.side !== "front"
        )
      );
    } else {
      // Clear back text and remove only back highlights for this flashcard
      setCurFlashcard((prev) => ({ ...prev, back: "" }));
      setHighlights((prev) =>
        prev.filter(
          (h) =>
            String(h.flashcardID) !== currentFlashcard.id ||
            h.side !== "back"
        )
      );
    }
    // setCurFlashcard({ front: "", back: "", id: String(getNewID()) });
  };

  useEffect(() => {
    const onHashChange = () => {
      const id = parseInt(document.location.hash.slice("#highlight-".length));
      if (!Number.isNaN(id)) activateHighlights(id);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [activateHighlights]);

  return (
    <div className="relative w-screen h-screen">
      {/* <div className="absolute top-0 left-0 h-full w-[100px] z-[100] bg-secondary-1"> */}
        {/* page nav */}
      <PageNav />
      {/* </div> */}
      <div className="h-full relative w-[80vw] overflow-hidden p-0">
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
                    const newId = pendingFlashcardId ?? getNewID();
                    setPendingFlashcardId(newId);
                    const nextFlashcard = {
                      id: String(newId),
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
                      id: String(pendingFlashcardId ?? getID()),
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
                    // console.log(flashcards);
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
      <div className="fixed top-0 right-0 h-full w-[400px] z-[200]">
        <Sidebar
          cards={flashcards}
          setCards={setFlashcards}
          setHighlights={setHighlights}
          highlights={highlights}
          flashcard={[currentFlashcard]}
          onFlip={() => {
            switchSide((prev) => !prev);
          }}
          onConfirm={handleConfirm}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
export default PdfDisplay;
