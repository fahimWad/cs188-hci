import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PdfDisplay from './pages/PdfDisplay.tsx';
import Graph from './pages/Graph.tsx';
import LandingPage from './pages/LandingPage.tsx';
import { AppProvider } from './context/AppContext.tsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* For dev only; delete later once we have landing */}
          <Route path="/" element={<LandingPage />} />
          
          <Route path = "/pdf" element={<PdfDisplay />} 
            />
          <Route path="/graph" element={<Graph />} 
            />
          {/* <Route path="/flashcards" element={<FlashcardPage />} /> */}
        </Routes>
      </Router>
    </AppProvider>
  );
}
export default App;
