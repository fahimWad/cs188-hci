import React from 'react';
import logo from './logo.svg';
import './App.css';
// import FlashcardPage from './pages/FlashcardPage';
//import PdfDisplay from './pages/PdfDisplay2';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PdfDisplay from './components/flashcard_components/PdfDisplay.tsx';
import Graph from './components/graph_components/Graph';
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
    // {/* <div className="App" style={{ display: "flex", height: "100vh" }}>
    //   <PdfDisplay />
    // </div> */}


