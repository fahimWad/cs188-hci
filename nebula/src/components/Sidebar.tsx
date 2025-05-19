// Sidebar.tsx
import React, { useState } from 'react';
import IconComponent from './IconComponent';
import Flashcard, { FlashcardData } from './Flashcard';
import CollapseButton from './CollapseButton';

const initialCards: FlashcardData[] = [
  { id: 1, front: 'origins of replication',  back: 'definition or answer' },
  { id: 2, front: 'dispersive model',        back: 'definition or answer' },
  { id: 3, front: 'conservative model',      back: 'definition or answer' },
  { id: 4, front: 'semiconservative model',  back: 'definition or answer' },
  { id: 5, front: "Chargaff’s rules",        back: 'definition or answer' },
  { id: 6, front: 'Transformation',          back: 'definition or answer' },
];

const Sidebar: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [editingId,  setEditingId]  = useState<string | number | null>(null);
  const [flippedId,  setFlippedId]  = useState<string | number | null>(null);
  const [search,     setSearch]     = useState('');

  // ------------------------------------------------------------
  // global “click blank area”  →  reset everything
  // ------------------------------------------------------------
  const handleSidebarBlankClick = () => {
    setSelectedId(null);
    setEditingId(null);
    setFlippedId(null);
  };

  // ------------------------------------------------------------
  // search filter
  // ------------------------------------------------------------
  const filtered = initialCards.filter(c =>
    c.front.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="sidebar bg-[#A5A5A5] rounded-3xl w-[300px] p-8 flex flex-col gap-4 h-screen"
      //onClick={handleSidebarBlankClick}
    >
      {/* --- search input -------------------------------------------------- */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
      />

      {/* --- flashcard list ------------------------------------------------ */}
      <div className="flex flex-col gap-4 overflow-y-auto">
        {filtered.map(card => (
          <Flashcard
            key={card.id ?? card.front /* fallback for missing ids */}
            card={card}
            selected={selectedId === (card.id ?? card.front)}
            editing={editingId === (card.id ?? card.front)}
            flipped={flippedId === (card.id ?? card.front)}
            /* actions passed down */
            onSelect={() => setSelectedId(card.id ?? card.front)}
            onEdit={id => setEditingId(id)}                  // id or null
            onFlip={() =>
              setFlippedId(prev =>
                prev === (card.id ?? card.front) ? null : (card.id ?? card.front)
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;