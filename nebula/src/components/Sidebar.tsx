import React, { useState } from 'react';
import IconComponent from './IconComponent';
import { IoSearch } from "react-icons/io5";

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

    // Filter cards based on search (case-insensitive direct word search)
    const filteredCards = search
        ? cards.filter(card =>
            card.text.toLowerCase().startsWith(search.toLowerCase())
        )
        : cards;

    // Optionally, auto-select the first match when searching
    React.useEffect(() => {
        if (search && filteredCards.length > 0) {
            setSelected(filteredCards[0].id);
        }
    }, [search]);

    return (
        <div className="sidebar bg-[#A5A5A5] rounded-3xl w-[300px] p-8 flex flex-col h-screen box-border gap-4">
            <div className="flex items-center mb-4">
                <div className="flex items-center bg-white rounded-lg px-4 py-2 w-full">
                    <IconComponent icon={IoSearch} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="ml-2 outline-none bg-transparent w-full"
                    />
                </div>
            </div>
            {filteredCards.map(card => (
                <div
                    key={card.id}
                    className={`bg-white rounded-xl shadow-md flex items-center justify-center h-20 cursor-pointer px-8 py-12 text-center ${
                        selected === card.id ? "border-4 border-[#e3dffc]": "border-4 border-transparent"
                    }`}
                    onClick={() => setSelected(card.id)}
                >
                    <span className={`text-gray-800 text-lg ${selected === card.id ? "font-bold" : "font-medium"}`}>{card.text}</span>
                </div>
            ))}
            {filteredCards.length === 0 && (
                <div className="text-gray-500 text-center mt-4">No results found.</div>
            )}
        </div>
    );
}
export default Sidebar;