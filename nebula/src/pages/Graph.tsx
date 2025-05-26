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

/* ──────────────────────────────────────────────────────────────
   1.  Define a typed node for our flash‑cards
   ────────────────────────────────────────────────────────────── */
type FlashCardNodeType = Node<{ card: FlashcardData }, "flashCard">;

/* ──────────────────────────────────────────────────────────────
   2.  Initial flash‑cards → initial nodes
   ────────────────────────────────────────────────────────────── */
const seedCards: FlashcardData[] = [
  { id: "1", front: "Noun", back: "person, place, or thing" },
  { id: "2", front: "Verb", back: "an action" },
];

function cardsToNodes(cards: FlashcardData[]): FlashCardNodeType[] {
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
function FlowCanvas() {
  const [nodes, setNodes] = useState<FlashCardNodeType[]>(cardsToNodes(seedCards));
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

function Graph(){
  return (
    <ReactFlowProvider>
        <FlowCanvas />
    </ReactFlowProvider>
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
