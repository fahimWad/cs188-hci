// Flashcard.tsx
import React, { useState, useId } from 'react';

export interface FlashcardData {
  id?: number | string;
  front: string;
  back: string;
}

interface FlashcardProps {
  card: FlashcardData;
  selected: boolean;
  editing: boolean;
  flipped: boolean;
  onSelect: () => void;
  onEdit: (id: string | number | null) => void;
  onFlip: () => void;
}

/**
 * Single card component
 * ------------------------------------------------------------
 *  • Single‑click   → onSelect()
 *  • Double‑click   → onFlip()
 *  • ✏️ icon        → onEdit(id)
 *  • save button    → onEdit(null)
 *  • Stops event propagation so the sidebar handler doesn’t fire
 */
const Flashcard: React.FC<FlashcardProps> = ({
  card,
  selected,
  editing,
  flipped,
  onSelect,
  onEdit,
  onFlip,
}) => {
  /* fallback id for cards created without explicit ids */
  const autoId = useId();
  const id = card.id ?? autoId;

  /* local text state (only for the edit form) */
  const [frontText, setFrontText] = useState(card.front);
  const [backText, setBackText]   = useState(card.back);

  // ----------------------------------------------------------------------
  // click / double‑click logic
  // ----------------------------------------------------------------------
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
        ${selected ? 'ring-2 ring-blue-400' : ''}
      `}
    >

        <span
          className="
            absolute top-2 right-2 flex gap-2
            opacity-0 group-hover:opacity-100 transition-opacity
          "
          onClick={e => e.stopPropagation()} /* keep card click unchanged */
        >
          <button className="cursor-pointer">🗑️</button>

          {/* start editing */}
          <button
            className="cursor-pointer"
            onClick={() => {onSelect(); onEdit(id)}}
          >
            ✏️
          </button>

          <button className="cursor-pointer">📋</button>
        </span>

      {/* -------------------------------------------------- content */}
      {editing ? (
        <div className="w-full">
          <input
            className="border rounded w-full mb-1 px-2 py-1"
            value={frontText}
            onChange={e => setFrontText(e.target.value)}
          />
          <input
            className="border rounded w-full px-2 py-1"
            value={backText}
            onChange={e => setBackText(e.target.value)}
          />
          <button
            className="mt-1 text-sm underline"
            onClick={e => {
              e.stopPropagation();
              /* here you could POST to a backend, etc. */
              onEdit(null);           // leave edit mode
            }}
          >
            save
          </button>
        </div>
      ) : (
        <span className={`text-lg ${selected ? 'font-bold' : 'font-light'}`}>
          {flipped ? backText : frontText}
        </span>
      )}
    </div>
  );
};

export default Flashcard;