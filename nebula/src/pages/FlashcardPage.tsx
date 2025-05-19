import React from 'react';
import Sidebar from '../components/Sidebar';

const FlashcardPage: React.FC = () => {
    return (
        <div className="flex flex-row h-screen">
            <div className="flex-1 bg-gray-100 p-4">
            </div>
            <Sidebar />
        </div>
    );
};

export default FlashcardPage;