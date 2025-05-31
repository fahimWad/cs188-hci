// src/App.tsx
import PageNav from "../components/flashcard_components/PageNav";
import { useCallback, useState } from "react";
import {
  ReactFlowProvider,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Node,
  type Edge,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import FlashCardNode from "../components/graph_components/FlashCardNode";
import type { FlashcardData } from "../components/flashcard_components/Flashcard";
import { useAppContext } from "../context/AppContext";

/* ──────────────────────────────────────────────────────────────
   1.  Define a typed node for our flash‑cards
   ────────────────────────────────────────────────────────────── */
type FlashCardNodeType = Node<{ card: FlashcardData }, "flashCard">;

interface FlowCanvasProps {
    flashCards: Array<FlashcardData>;
}
/* ──────────────────────────────────────────────────────────────
   2.  Initial flash‑cards → initial nodes
   ────────────────────────────────────────────────────────────── */
// const seedCards: FlashcardData[] = [
//   { id: "1", front: "Noun", back: "person, place, or thing" },
//   { id: "2", front: "Verb", back: "an action" },
// ];

function cardsToNodes(cards: Array<FlashcardData>): FlashCardNodeType[] {
  return cards.map((c, i) => ({
    id: `flashcard-${c.id ?? i}`,
    type: "flashCard",
    position: { x: 120 + i * 260, y: 120 },
    data: { card: c },
  }));
}

/* React‑Flow renders custom nodes based on this map */
const nodeTypes = { flashCard: FlashCardNode };

/* ──────────────────────────────────────────────────────────────
   3.  The canvas component
   ────────────────────────────────────────────────────────────── */
const FlowCanvas: React.FC<FlowCanvasProps> = ({ flashCards }: {flashCards: Array<FlashcardData>}) => {
  const [nodes, setNodes] = useState<FlashCardNodeType[]>(cardsToNodes(flashCards));
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds as Node[]) as FlashCardNodeType[]),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div style={{ height: 800 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{ backgroundColor: "#FFFFFF" }}
      />
    </div>
  );
}

const Graph: React.FC = () =>{
  const { flashcards: flashCards } = useAppContext(); // Get flashcards from context
  return (
    <div>
        <PageNav />
        {flashCards.length > 0 ? (<ReactFlowProvider>
            <FlowCanvas flashCards={flashCards}/>
        </ReactFlowProvider>
        ) : (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">No flashcards available. Create some!</p>
            </div>
        )}
    </div>
  );
}
export default Graph;

/* ──────────────────────────────────────────────────────────────
   4.  Plain‑vanilla App component
   ────────────────────────────────────────────────────────────── */
// export default function App() {
//   return (
//     <ReactFlowProvider>
//       <div className="bg-red-500 w-24 h-24 m-4" />
//       <FlowCanvas />
//     </ReactFlowProvider>
//   );
// }
