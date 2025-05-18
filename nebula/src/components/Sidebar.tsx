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
        <div className="sidebar" style={{
            width: 280,
            background: "#F4F4F4",
            borderRadius: 24,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            boxSizing: "border-box"
        }}>
            {/* Top Chevron */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>➤</span>
            </div>
            {/* Search Bar */}
            <div style={{
                background: "#fff",
                borderRadius: 12,
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                marginBottom: 16
            }}>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        border: "none",
                        outline: "none",
                        marginLeft: 8,
                        background: "transparent",
                        width: "100%",
                        fontSize: 16
                    }}
                />
            </div>
            {/* Card List */}
            <div style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 16
            }}>
                {cards
                    .filter(card => card.text.toLowerCase().includes(search.toLowerCase()))
                    .map(card => (
                        <div
                            key={card.id}
                            onClick={() => setSelected(card.id)}
                            style={{
                                background: selected === card.id ? "#fff" : "#F4F4F4",
                                borderRadius: 16,
                                padding: "20px 16px",
                                boxShadow: selected === card.id ? "0 0 0 2px #C6C6F8" : "0 1px 4px rgba(0,0,0,0.03)",
                                fontWeight: selected === card.id ? 700 : 400,
                                fontSize: 18,
                                color:
                                    selected === card.id ? "#222" : "#888",
                                cursor: "pointer",
                                position: "relative",
                                minHeight: 48,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >       
                            <span>{card.text}</span>
                            {card.text === "semiconservative model" && (
                                <span style={{ display: "flex", gap: 8 }}>
                                    <span style={{ cursor: "pointer" }}>🗑️</span>
                                    <span style={{ cursor: "pointer" }}>✏️</span>
                                    <span style={{ cursor: "pointer" }}>📋</span>
                                </span>
                            )}
                        </div>
                    ))}
            </div>
            {/* Add Button */}
            <button
                style={{
                    background: "#E0E0E0",
                    border: "none",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    cursor: "pointer"
                }}
            >
                <span style={{ fontSize: 24 }}>➕</span>
            </button>
        </div>
    );
}
export default Sidebar;