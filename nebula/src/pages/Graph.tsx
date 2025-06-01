// src/App.tsx
import PageNav from "../components/flashcard_components/PageNav";

import { useCallback, useEffect, useState } from "react";

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

import AddNodeButton from "../components/graph_components/AddNodeButton";
import PopupFlashcard from "../components/graph_components/PopupFlashcard";
import AddFlashcardButton from "../components/graph_components/AddFlashcardButton";
import AddAnnotationButton from "../components/graph_components/AddAnnotationButton";
import {
	AnnotationNode,
	AnnotationNodeContent,
	AnnotationNodeIcon,
} from "../components/graph_components/AnnotationNode";

/* ──────────────────────────────────────────────────────────────
   1.  Define a typed node for our flash‑cards and annotations
   ────────────────────────────────────────────────────────────── */
type FlashCardNodeType = Node<{ card: FlashcardData }, "flashCard">;
type AnnotationNodeType = Node<
	{ content: string; icon?: string },
	"annotation"
>;
type AllNodeTypes = FlashCardNodeType | AnnotationNodeType;

interface FlowCanvasProps {
	flashCards: Array<FlashcardData>;
}

const AnnotationNodeWrapper: React.FC<{
	data: { content: string; icon?: string };
}> = ({ data }) => {
	return (
		<AnnotationNode className="bg-yellow-100 border border-yellow-300 rounded-lg shadow-sm">
			<AnnotationNodeContent>{data.content}</AnnotationNodeContent>
			{data.icon && <AnnotationNodeIcon>{data.icon}</AnnotationNodeIcon>}
		</AnnotationNode>
	);
};

/* ──────────────────────────────────────────────────────────────
   2.  Initial flash‑cards → initial nodes
   ────────────────────────────────────────────────────────────── */

function cardsToNodes(cards: Array<FlashcardData>): FlashCardNodeType[] {
	return cards.map((c, i) => ({
		id: `flashcard-${c.id ?? i}`,
		type: "flashCard",
		position: { x: 120 + i * 260, y: 120 },
		data: { card: c, type: "flashCard" as const },
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
	const { nodes, setNodes, edges, setEdges } = useAppContext();

	// Update nodes when flashCards change
	useEffect(() => {
		if (flashCards.length > 0) {
			const flashcardNodes = cardsToNodes(flashCards);
			setNodes((prevNodes) => [
				...prevNodes.filter(
					(node) => !node.id.startsWith("flashcard-")
				),
				...flashcardNodes,
			]);
		}
	}, [flashCards, setNodes]);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) =>
			setNodes(
				(nds) =>
					applyNodeChanges(changes, nds as Node[]) as AllNodeTypes[]
			),
		[setNodes]
	);

	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges]
	);

	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges]
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
	const { flashcards: flashCards, setNodes, nodes } = useAppContext(); // Get flashcards from context
	const [open, setOpen] = useState(false); // State for "add node" button icon

	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const addFlashcard = useCallback(() => {
		// Generate a random position for the new node
		const position = {
			x: Math.random() * 400 + 100,
			y: Math.random() * 300 + 200,
		};

		const id = Date.now().toString();

		const newGraphNode: FlashCardNodeType = {
			id: `graphnode-${id}`,
			type: "flashCard",
			position,
			data: {
				card: {
					id: `${id}`,
					front: "New Concept",
					back: "Add description...",
				},
			},
		};

		setNodes((prevNodes) => [...prevNodes, newGraphNode]);
		setOpen(false);
	}, [setNodes]);

	const addAnnotation = useCallback(() => {
		// Placeholder for adding an annotation
		const position = {
			x: Math.random() * 400 + 100,
			y: Math.random() * 300 + 200,
		};

		const id = Date.now().toString();

		const newAnnotation: AnnotationNodeType = {
			id: `graphnode-${id}`,
			type: "annotation",
			position,
			data: {
				content: "Add your annotation here...",
				icon: "📝", // Example icon, can be replaced with an actual icon component
			},
		};

		setNodes((prevNodes) => [...prevNodes, newAnnotation]);
		setOpen(false);
	}, [setNodes]);

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
			console.log(flashCards.find((card) => card.id === id));
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
			<ReactFlowProvider>
				{nodes.length > 0 || flashCards.length > 0 ? (
					<div>
						<FlowCanvas flashCards={flashCards} />
						<PopupFlashcard
							flashcard={currentPopupCard}
							onFlip={() => undefined}
							onConfirm={() => undefined}
							onDelete={() => undefined}
							shown={popupCardShown}
							closeModal={() => {
								setShown(false);
							}}
						/>
					</div>
				) : (
					<div className="flex items-center justify-center h-screen">
						<p className="text-gray-500">
							No flashcards available. Create some!
						</p>
					</div>
				)}
				{/* Floating Action Buttons */}
				<AddNodeButton onClick={toggleOpen} isOpen={open} />
				<AddFlashcardButton onClick={addFlashcard} isVisible={open} />
				<AddAnnotationButton onClick={addAnnotation} isVisible={open} />
			</ReactFlowProvider>
		</div>
	);
};
export default Graph;
