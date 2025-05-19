import React from "react";
import { FlashcardData } from "./Flashcard";

interface FloatingFlashcardProps {
  flashcard: FlashcardData;
}

const FloatingFlashcard: React.FC<FloatingFlashcardProps> = ({ flashcard }) => {
//   // Only render if there is text to show.
//   if (!flashcard || (!flashcard.front && !flashcard.back)) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 translate-x-40 bg-white p-4 rounded shadow-lg z-50 ring-[#CCC4FF] ring-4 w-[400px] h-[300px]">
      <h3 className="font-bold">Current Flashcard</h3>
      <p className="mt-2">
        <span className="font-semibold">Front:</span> {flashcard.front}
      </p>
      <p className="mt-1">
        <span className="font-semibold">Back:</span> {flashcard.back}
      </p>
    </div>
  );
};

export default FloatingFlashcard;