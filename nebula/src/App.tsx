import React from 'react';
import logo from './logo.svg';
// import './App.css';
// import FlashcardPage from './pages/FlashcardPage';
import PdfDisplay from './pages/PdfDisplay';
import Sidebar from './components/Sidebar';
function App() {
  return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <PdfDisplay />
    </div>
  );
}

export default App;
