import React, { useState } from 'react';

const cards = [
    { id: 1, text: "origins of replication" },
    { id: 2, text: "dispersive model" },
    { id: 3, text: "conservative model" },
    { id: 4, text: "semiconservative model" },
    { id: 5, text: "Chargaff’s rules" },
    { id: 6, text: "Transformation" },
];

const Sidebar: React.FC = () => {
    const [selected, setSelected] = useState(1);
    const [search, setSearch] = useState("");


    return (
        <div className="sidebar bg-[#A5A5A5] rounded-3xl w-[300px] p-8 flex flex-col h-screen box-border gap-4">
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
            </div>
            {cards.map(card => (
                <div
                key={card.id}
                className="bg-white rounded-xl shadow-md flex items-center justify-center h-20 cursor-pointer px-8 py-12 text-center"
                onClick={() => setSelected(card.id)}
                >
                <span className={`text-gray-800 text-lg ${selected === card.id ? "font-bold" : "font-light"}`}>{card.text}</span>
                </div>
            ))}
        </div>
    );
}
export default Sidebar;