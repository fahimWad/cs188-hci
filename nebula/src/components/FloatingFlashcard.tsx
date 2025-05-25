import React from "react";
import { FlashcardData } from "./Flashcard";
import FlipButton from "./FlipButton";
import ConfirmButton from "./ConfirmButton";
import DeleteButton from "./DeleteButton";

interface FloatingFlashcardProps {
  flashcard: FlashcardData;
  onFlip: () => void;
  onConfirm: () => void;
  onDelete: () => void;
}

const FloatingFlashcard: React.FC<FloatingFlashcardProps> = ({
  flashcard,
  onFlip,
  onConfirm,
  onDelete,
}) => {
  //   // Only render if there is text to show.
  //   if (!flashcard || (!flashcard.front && !flashcard.back)) return null;
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 translate-x-12 bg-secondary-2 text-white-25 p-4 rounded-xl shadow-lg z-50 ring-primary-3 ring-4 w-[400px] h-[300px] [perspective:1000px] flex flex-col">
      {/* Flashcard header */}
      <div className="w-full flex justify-between items-center mb-2">
        {/* Delete Button */}
        <DeleteButton color='red' onClick={onDelete}/>
        {/* Front/back label */}
        {!flipped ? (<p className="font-bold">Front</p>) : (<p className="font-bold">Back</p>)}
        <div>
          {/* Flip button */}
          <FlipButton
            onClick={() => {
              onFlip();
              setFlipped((prev) => !prev);
            }} />
            {/* Confirm button */}
          <ConfirmButton
            onClick={() => {
              onConfirm();
              setFlipped(false);
            }} />
        </div>
        
      </div>
      {/* Flashcard flip section*/}
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateX(180deg)]" : ""
        }`}
      >
        {/* Flashcard front */}
        <div
          className="absolute inset-0 flex items-center justify-center
                    bg-secondary-2 border border-primary-3 rounded-xl shadow
                    text-xl font-bold
                    [backface-visibility:hidden] overflow-auto"
        >
          {flashcard.front.length > 0 ? 
            (
            <p className="text-center p-2 text-white-50">{flashcard.front}</p>
            ) : (
            <p className="text-center p-2 font-light">Select text from PDF</p>
          )}
        </div>
        {/* Flashcard back */}
        <div
          className="absolute inset-0 flex items-center justify-center
                    bg-secondary-2 border border-primary-3 rounded-xl shadow
                    text-xl font-bold
                    [transform:rotateX(180deg)]
                    [backface-visibility:hidden] overflow-auto"
        >
          {flashcard.back.length > 0 ? 
            (
            <p className="text-center p-2 text-white-50">{flashcard.back}</p>
            ) : (
            <p className="text-center p-2 font-light">Select text from PDF</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingFlashcard;
