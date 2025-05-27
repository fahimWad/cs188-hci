import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
// import FlashcardPage from './pages/FlashcardPage';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PdfDisplay from './pages/PdfDisplay.tsx';
import Graph from './pages/Graph.tsx';
import { CustomHighlight } from './components/flashcard_components/Highlights.tsx';
import { FlashcardData } from './components/flashcard_components/Flashcard.tsx';
import LandingPage from './pages/LandingPage.tsx';

function App() {
  const [highlights, setHighlights] = useState<Array<CustomHighlight>>([]); // Actual array storing highlights
  const [flashcards, setFlashcards] = useState<Array<FlashcardData>>([]); // Array storing flashcard information
  
  return (
    <Router>
      <Routes>
        {/* For dev only; delete later once we have landing */}
        <Route path="/" element={<LandingPage />} />
        
        <Route path = "/pdf" element={<PdfDisplay
            highlights={highlights}
            setHighlights={setHighlights}
            flashcards={flashcards}
            setFlashcards={setFlashcards} />} 
          />
        <Route path="/graph" element={<Graph 
            flashCards={flashcards} />} 
          />
        {/* <Route path="/flashcards" element={<FlashcardPage />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
