import React from "react";
import logo from "./logo.svg";
// import './App.css';
// import FlashcardPage from './pages/FlashcardPage';
//import PdfDisplay from './pages/PdfDisplay2';
import PdfDisplay from "./components/flashcard_components/PdfDisplay";
import Sidebar from "./components/flashcard_components/Sidebar";
import Flow from "./components/graph_components/Graph";
import { ReactFlowProvider } from "reactflow";
function App() {
  return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <Flow></Flow>
    </div>
  );
}

export default App;
