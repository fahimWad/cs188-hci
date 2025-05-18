import React from 'react';
import Sidebar from '../components/Sidebar';

const Flashcard: React.FC = () => {
    return (
        <div className="flex flex-row h-screen">
            <div className="flex-1 bg-gray-100 p-4">
                <h1 className="text-2xl font-bold mb-4">Flashcard</h1>
                <p className="text-gray-700">This is the flashcard page.</p>
            </div>
            <Sidebar />
        </div>
    );
};

export default Flashcard;