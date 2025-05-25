import React, { useState } from 'react';
import Flashcard, { FlashcardData } from './Flashcard';
import CollapseButton from './CollapseButton';
import DeleteButton from './DeleteButton';
import { CustomHighlight } from './Highlights';

interface SidebarProps {
    cards: FlashcardData[];
    setCards: React.Dispatch<React.SetStateAction<FlashcardData[]>>;
    setHighlights: React.Dispatch<React.SetStateAction<CustomHighlight[]>>;
    highlights: CustomHighlight[];
}

const Sidebar: React.FC<SidebarProps> = ({ cards, setCards, highlights, setHighlights }) => {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [editingId,  setEditingId]  = useState<string | number | null>(null);
  const [flippedId,  setFlippedId]  = useState<string | number | null>(null);
  const [hoveredId,  setHoveredId]  = useState<string | number | null>(null);
  const [search,     setSearch]     = useState('');

  // ------------------------------------------------------------
  // search filter
  // ------------------------------------------------------------
  const filtered = cards.filter(c =>
    c.front.toLowerCase().includes(search.toLowerCase()) || c.back.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="sidebar bg-secondary-1 w-[300px] h-screen p-8 flex flex-col box-ring gap-4 absolute x-500 y-0 z-100"
    >
      {/* --- search input -------------------------------------------------- */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="rounded-full bg-white-6 text-white-50 px-4 py-2 w-full"
      />

      {/* --- flashcard list with hover ring ------------------------------------------------ */}
      {filtered.length === 0  && 
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-white-25">No flashcards created</p>
        </div>
      }
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
                <div className={`-translate-y-1/4 w-full flex flex-row items-center justify-center ${hoveredId === cardKey ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  <DeleteButton
                  key={cardKey}
                  color='lavender'
                  onClick={() => {
                    setCards(prev => prev.filter(c => (c.id ?? c.front) !== cardKey));
                    setHighlights(prev => prev.filter(h => h.flashcardID !== cardKey));
                    if (selectedId === cardKey) setSelectedId(null);
                    if (editingId === cardKey) setEditingId(null);
                    if (flippedId === cardKey) setFlippedId(null);
                    if (hoveredId === cardKey) setHoveredId(null);
                  }}
                  />
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;