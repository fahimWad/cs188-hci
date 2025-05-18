import React from 'react';
import Sidebar from '../components/Sidebar';

const Flashcard: React.FC = () => {
    return (
        <div style={{ display: 'flex', height: '100vh'}}>
            <div style={{ flex: 1, padding: '2rem' }}>
            {/* Flashcard page content goes here */}
            </div>
            <Sidebar />
        </div>
    );
};

export default Flashcard;