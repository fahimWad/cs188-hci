// src/App.tsx
import PageNav from "../components/flashcard_components/PageNav";
import { useCallback, useState, useEffect } from "react";
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
import PopupFlashcard from "../components/graph_components/PopupFlashcard";
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
const FlowCanvas: React.FC<FlowCanvasProps> = ({
  flashCards,
}: {
  flashCards: Array<FlashcardData>;
}) => {
  // States
  const [nodes, setNodes] = useState<FlashCardNodeType[]>(
    cardsToNodes(flashCards)
  );
  const [edges, setEdges] = useState<Edge[]>([]);

  // Neccessary graph functions
  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes(
        (nds) => applyNodeChanges(changes, nds as Node[]) as FlashCardNodeType[]
      ),
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
};

const Graph: React.FC = () => {
  const { flashcards: flashCards } = useAppContext(); // Get flashcards from context
  const [currentPopupCard, setCurrentPopupCard] = useState<FlashcardData>({
    id: "",
    front: "",
    back: "",
  });
  const [popupCardShown, setShown] = useState<boolean>(false);
  const showPopupCard = useCallback(
    (id: string) => {
      setCurrentPopupCard(
        flashCards.find((card) => card.id === id) ?? {
          id: "",
          front: "",
          back: "",
        }
      );
      setShown(true);
      console.log("FOUND CARD");
      console.log(flashCards);
      console.log(id);
      console.log(flashCards.find((card) => card.id == id));
    },
    [flashCards]
  );

  useEffect(() => {
    const handleHash = () => {
      const id = window.location.hash.replace(/^#flashcard-/, "");
      if (id) showPopupCard(id);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [showPopupCard]);
  return (
    <div>
      <PageNav />

      {flashCards.length > 0 ? (
        <div>
          <ReactFlowProvider>
            <FlowCanvas flashCards={flashCards} />
          </ReactFlowProvider>
          <PopupFlashcard
            flashcard={currentPopupCard}
            onFlip={() => undefined}
            onConfirm={() => undefined}
            onDelete={() => undefined}
            shown={popupCardShown}
          ></PopupFlashcard>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">No flashcards available. Create some!</p>
        </div>
      )}
    </div>
  );
};
export default Graph;
