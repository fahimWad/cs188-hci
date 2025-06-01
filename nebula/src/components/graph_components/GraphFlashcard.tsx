import React, { useState, useId } from "react";
import { FlashcardData } from "../flashcard_components/Flashcard";
//
// Copy of Flashcard component but with specific stuff for the graph representation
//

interface FlashcardProps {
  card: FlashcardData;
  isActive: boolean;
  selected: boolean;
  editing: boolean;
  flipped: boolean;
  onSelect: () => void;
  onEdit: (id: string | number | null) => void;
  onFlip: () => void;
}

const GraphFlashcard: React.FC<FlashcardProps> = ({
  card,
  selected,
  isActive,
  editing,
  flipped,
  onSelect,
  onFlip,
}) => {
  const autoId = useId();
  const id = card.id ?? autoId;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editing) onSelect();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    let cardID = card.id;
    document.location.hash = `flashcard-${cardID}`;
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`
      relative group
      bg-neutral-2 rounded-xl shadow-md
      max-w-[20rem]
      flex items-center justify-center
      cursor-pointer px-8 py-12 text-center text-white
      transition
      overflow-auto
      whitespace-pre-wrap
      break-words
      ring-4 ease-in-out duration-200 
      ${isActive ? "ring-primary-3" : "ring-transparent"}
      `}
    >
      <span
        className={`
        text-lg
        ${selected ? "font-bold" : "font-light"}
      `}
        style={{ maxWidth: "100%" }}
      >
        {flipped ? card.back : card.front}
      </span>
    </div>
  );
};

export default GraphFlashcard;
