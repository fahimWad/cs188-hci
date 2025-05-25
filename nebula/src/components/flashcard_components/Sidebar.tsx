import React, { useState } from 'react';
import IconComponent from './IconComponent';
import Flashcard, { FlashcardData } from './Flashcard.tsx';
import CollapseButton from './CollapseButton';

interface SidebarProps {
    initialCards: FlashcardData[];
}

// const initialCards: FlashcardData[] = [
//   { id: 1, front: 'origins of replication',  back: 'definition or answer' },
//   { id: 2, front: 'dispersive model',        back: 'definition or answer' },
//   { id: 3, front: 'conservative model',      back: 'definition or answer' },
//   { id: 4, front: 'semiconservative model',  back: 'definition or answer' },
//   { id: 5, front: "Chargaff’s rules",        back: 'definition or answer' },
//   { id: 6, front: 'Transformation',          back: 'definition or answer' },
// ];

const Sidebar: React.FC<SidebarProps> = ({ initialCards }) => {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [editingId,  setEditingId]  = useState<string | number | null>(null);
  const [flippedId,  setFlippedId]  = useState<string | number | null>(null);
  const [hoveredId,  setHoveredId]  = useState<string | number | null>(null);
  const [search,     setSearch]     = useState('');

  // ------------------------------------------------------------
  // search filter
  // ------------------------------------------------------------
  const filtered = initialCards.filter(c =>
    c.front.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="sidebar bg-[#878787]/[0.6] rounded-3xl w-[300px] h-screen p-8 flex flex-col box-ring gap-4 absolute x-500 y-0 z-100"
    >
      {/* --- search input -------------------------------------------------- */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="rounded-full px-4 py-2 w-full"
      />

      {/* --- flashcard list with hover ring ------------------------------------------------ */}
      <div className="flex flex-col gap-4 overflow-visible">
        {filtered.map(card => {
          const cardKey = card.id ?? card.front;
          const isActive = selectedId === cardKey || hoveredId === cardKey;
          return (
            <div
              key={cardKey}
              onMouseEnter={() => setHoveredId(cardKey)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Flashcard
                card={card}
                isActive={isActive}
                selected={selectedId === cardKey}
                editing={editingId === cardKey}
                flipped={flippedId === cardKey}
                /* actions passed down */
                onSelect={() => setSelectedId(cardKey)}
                onEdit={id => setEditingId(id)}  // id or null
                onFlip={() =>
                  setFlippedId(prev =>
                    prev === cardKey ? null : cardKey
                  )
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;