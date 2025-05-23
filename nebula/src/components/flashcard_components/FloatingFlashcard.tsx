import React from "react";
import { FlashcardData } from "./Flashcard";
import QuickButton from "./QuickButton";
interface FloatingFlashcardProps {
  flashcard: FlashcardData;
  onFlip: () => void;
  onConfirm: () => void;
  //onDelete: () => void;
}

const FloatingFlashcard: React.FC<FloatingFlashcardProps> = ({
  flashcard,
  onFlip,
  onConfirm,
  //onDelete
}) => {

  //   // Only render if there is text to show.
  //   if (!flashcard || (!flashcard.front && !flashcard.back)) return null;
  const [flipped, setFlipped] = React.useState(false);
  return (
  <div className="fixed bottom-4 left-1/2  transform -translate-x-1/2 lg:translate-x-40 bg-white p-4 rounded shadow-lg z-50 ring-[#CCC4FF] ring-4 w-[400px] h-[300px] [perspective:1000px] flex flex-col">
      <div className="relative w-full flex justify-between">
        <QuickButton
          btnText="Delete"
          onClick={() => {}}
        />
        
        {flipped && 
          <div>
            {flashcard.front.length > 25
            ? flashcard.front.slice(0, 22) + '...'
            : flashcard.front}
          </div>
        }

        <QuickButton
          btnText="Confirm"
          onClick={onConfirm}
        />
      </div>
      <div
        className={`relative w-full h-full transition-transform duration-700 mt-2 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateX(180deg)]" : ""
        }`}
        onClick={() => {
            onFlip();
            setFlipped((prev) => !prev);
        }}
        onDoubleClick={() => {
            console.log("Edit mode")
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center
                    bg-white border rounded-lg shadow
                    text-xl font-bold
                    [backface-visibility:hidden]"
        >
          {flashcard.front}
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center
                    bg-indigo-200 border rounded-lg shadow
                    text-xl font-bold
                    [transform:rotateX(180deg)]
                    [backface-visibility:hidden]"
        >
          {flashcard.back}
        </div>
      </div>
    </div>
  );
};

export default FloatingFlashcard;
