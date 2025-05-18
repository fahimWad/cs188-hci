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
        <div className="sidebar bg-red-500 rounded-3xl p-4 flex flex-col h-screen box-border gap-4">
            {cards.map(card => (
            <div
                key={card.id}
                className="bg-black rounded-xl shadow-md flex items-center justify-center h-20 cursor-pointer"
            >
                <span className="text-red-500 text-lg font-bold">{card.text}</span>
            </div>
            ))}
        </div>
    );
}
export default Sidebar;