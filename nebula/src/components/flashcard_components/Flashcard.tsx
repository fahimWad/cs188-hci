import React, { useState, useId } from 'react';
import { CustomHighlight } from './Highlights';

export interface FlashcardData {
  id?: number;
  front: string;
  back: string;
}

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

const Flashcard: React.FC<FlashcardProps> = ({
  card,
  selected,
  isActive,
  editing,
  flipped,
  onSelect,
  onEdit,
  onFlip,
}) => {
  const autoId = useId();
  const id = card.id ?? autoId;

  const [frontText, setFrontText] = useState(card.front);
  const [backText, setBackText]   = useState(card.back);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editing) onSelect();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editing) onFlip();
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`
      relative group
      bg-white rounded-xl shadow-md
      h-20 flex items-center justify-center
      cursor-pointer px-8 py-12 text-center
      transition
      ring-4 ease-in-out duration-200
      ${isActive ? "ring-[#CCC4FF]" : "ring-transparent"}`}

    >
      <span
      className="
        absolute top-2 right-2 flex gap-2
        opacity-0 group-hover:opacity-100 transition-opacity
      "
      onClick={e => e.stopPropagation()}
      >
      <button className="cursor-pointer">🗑️</button>
      <button className="cursor-pointer">📋</button>
      </span>

      {/* cannot edit in sidebar view */}
      <span className={`text-lg ${selected ? 'font-bold' : 'font-light'}`}>
        {flipped ? backText : frontText}
      </span>
    </div>
  );
};

export default Flashcard;