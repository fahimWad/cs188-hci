import React from "react";
import { FlashcardData } from "./Flashcard";
import QuickButton from "./FlipButton";
interface FloatingFlashcardProps {
  flashcard: FlashcardData;
  onFlip: any; // I do not care this is bad syntax, fix it later
}

const FloatingFlashcard: React.FC<FloatingFlashcardProps> = ({
  flashcard,
  onFlip,
}) => {
  //   // Only render if there is text to show.
  //   if (!flashcard || (!flashcard.front && !flashcard.back)) return null;
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 translate-x-40 bg-white p-4 rounded shadow-lg z-50 ring-[#CCC4FF] ring-4 w-[400px] h-[300px] [perspective:1000px]">
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateX(180deg)]" : ""
        }`}
      >
        <div
          className="absolute inset-0 flex items-center justify-center
                    bg-white border rounded-lg shadow
                    text-xl font-bold
                    [backface-visibility:hidden]"
        >
          Front: {flashcard.front}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center
                    bg-indigo-200 border rounded-lg shadow
                    text-xl font-bold
                    [transform:rotateX(180deg)]
                    [backface-visibility:hidden]"
        >
          Back: {flashcard.back}
        </div>
      </div>
      <QuickButton
        onClick={() => {
          onFlip();
          setFlipped((prev) => !prev);
        }}
      ></QuickButton>
    </div>
  );
};

export default FloatingFlashcard;
