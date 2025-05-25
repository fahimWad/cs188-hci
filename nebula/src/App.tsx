import React from 'react';
import logo from './logo.svg';
import './App.css';
// import FlashcardPage from './pages/FlashcardPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PdfDisplay from './pages/PdfDisplay.tsx';
import Graph from './pages/Graph.tsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/pdf" element={<PdfDisplay />} />
        <Route path="/graph" element={<Graph />} />
        {/* <Route path="/flashcards" element={<FlashcardPage />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
