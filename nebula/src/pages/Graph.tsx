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
import LabeledEdge from "../components/graph_components/LabeledEdge";
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
import PopupAnnotation from "../components/graph_components/PopupAnnotation";

/* ──────────────────────────────────────────────────────────────
   1.  Define a typed node for our flash‑cards and annotations
   ────────────────────────────────────────────────────────────── */
type FlashCardNodeType = Node<{ card: FlashcardData }, "flashCard">;
type AnnotationNodeType = Node<
	{ content: string; icon?: string },
	"annotation"
>;
type AllNodeTypes = FlashCardNodeType | AnnotationNodeType;
type LabeledEdgeType = Edge<{ label?: string }>;

interface FlowCanvasProps {
	flashCards: Array<FlashcardData>;
}

const AnnotationNodeWrapper: React.FC<{
	data: { content: string; icon?: string };
	id: string;
}> = ({ data, id }) => {
	return (
		<AnnotationNode
			className="bg-yellow-100 border border-yellow-300 rounded-lg shadow-sm"
			onDoubleClick={() => (document.location.hash = id)}
		>
			<AnnotationNodeContent>{data.content}</AnnotationNodeContent>
			{data.icon && <AnnotationNodeIcon>{data.icon}</AnnotationNodeIcon>}
		</AnnotationNode>
	);
};
function isAnnotationNode(node: Node): node is AnnotationNodeType {
	return node.type === "annotation";
}

function isFlashCardNode(node: Node): node is FlashCardNodeType {
	return node.type === "flashCard";
}
// Initial flash‑cards -> initial nodes

function cardsToNodes(cards: Array<FlashcardData>): FlashCardNodeType[] {
	return cards.map((c, i) => ({
		id: `flashcard-${c.id ?? i}`,
		type: "flashCard",
		position: { x: 120 + i * 260, y: 120 },
		data: { card: c, type: "flashCard" as const },
	}));
}

// Register custom nodes
const nodeTypes = {
	flashCard: FlashCardNode,
	annotation: AnnotationNodeWrapper,
};

const edgeTypes = {
	labeled: LabeledEdge,
};

// The canvas component
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
		(connection) => {
			// Create a labeled edge with default label
			const newEdge: LabeledEdgeType = {
				...connection,
				id: `edge-${connection.source}-${
					connection.target
				}-${Date.now()}`,
				type: "labeled",
				data: { label: "relates to" },
			};
			setEdges((eds) => [...eds, newEdge]);
		},
		[setEdges]
	);

  const proOptions = { hideAttribution: true };
	return (
		<div style={{ height: 800 }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
        proOptions={proOptions}
				fitView
				style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF' }}
        translateExtent={[[ -1e6, -1e6 ], [ 1e6, 1e6 ]]}  /* virtually unlimited panning */
			/>
		</div>
	);
};

const Graph: React.FC = () => {
	const { flashcards: flashCards, setNodes, nodes } = useAppContext(); // Get flashcards from context
	const [open, setOpen] = useState(false); // State for "add node" button icon
	const [editingAnnotation, setEditingAnnotation] = useState<boolean>(false);
	const toggleOpen = () => {
		setOpen((prev) => !prev);
	};

	const modifyCard = (newFlashcard: FlashcardData) => {
		// For editing in the popup flashcard view
		setNodes((prevNodes) =>
			prevNodes.map((node) => {
				if (isAnnotationNode(node)) return node; // Filter against annotations
				const newNode = node as FlashCardNodeType;
				if (newNode.data.card.id !== newFlashcard.id) return node;
				return {
					...newNode,
					data: { ...newNode.data, card: newFlashcard },
				};
			})
		);
	};
	const modifyAnnotation = (
		data: { content: string; icon?: string },
		id: string
	) => {
		console.log("awefasdf");
		console.log(data);
		console.log(id);
		setNodes((prevNodes) =>
			prevNodes.map((node) => {
				if (isFlashCardNode(node)) return node; // Filter against flashcards
				if (node.id !== id) return node;

				return {
					...node,
					data: {
						...node.data,
						content: data.content,
						icon: data.icon,
					},
				};
			})
		);
	};
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
				icon: "", // No icon for now
			},
		};

		setNodes((prevNodes) => [...prevNodes, newAnnotation]);
		setOpen(false);
	}, [setNodes]);
	// Pop up card logic
	const [currentPopupCard, setCurrentPopupCard] = useState<FlashcardData>({
		id: "",
		front: "",
		back: "",
	});
	const [currentAnnotation, setCurrentAnnotation] =
		useState<AnnotationNodeType>({
			id: "",
			type: "annotation",
			position: { x: 0, y: 0 },
			data: { content: "" },
		});
	const [popupCardShown, setShown] = useState<boolean>(false);
	const showPopupCard = useCallback(
		(id: string, type: string) => {
			if (type == "Node") {
				const foundCard = nodes.find(
					(node): node is FlashCardNodeType => {
						return (
							isFlashCardNode(node) && node.data.card.id === id
						);
					}
				);
				setCurrentPopupCard(
					foundCard?.data.card ?? { id: "", front: "", back: "" }
				);
				setEditingAnnotation(false);
			} else if (type == "Annotation") {
				const foundCard = nodes.find(
					(node): node is AnnotationNodeType => {
						return isAnnotationNode(node) && node.id == id;
					}
				) ?? {
					id: "",
					type: "annotation",
					position: { x: 0, y: 0 },
					data: { content: "" },
				};
				console.log(foundCard);
				setCurrentAnnotation(foundCard);
				setEditingAnnotation(true);
			}

			setShown(true);
		},
		[nodes]
	);
	useEffect(() => {
		const handleHash = () => {
			const hash = window.location.hash;
			if (hash.includes("#flashcard-")) {
				const id = window.location.hash.replace(/^#flashcard-/, "");
				if (id) showPopupCard(id, "Node");
			} else if (hash.includes("#graphnode-")) {
				const id = window.location.hash.replace(/^#/, ""); // DO NOT GET JUST THE UNIQUE IDENTIFIER FOR ANNOTATIONS
				console.log("HASH");
				console.log(id);
				if (id) showPopupCard(id, "Annotation");
			}
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
						{editingAnnotation ? (
							<PopupAnnotation
								annotationData={currentAnnotation.data}
								id={currentAnnotation.id}
								onConfirm={modifyAnnotation}
								shown={popupCardShown}
								onDelete={() => undefined}
								closeModal={() => {
									setShown(false);
									document.location.hash = "";
								}}
								annotation={editingAnnotation}
							/>
						) : (
							<PopupFlashcard
								flashcard={currentPopupCard}
								onFlip={() => undefined} // TODO: Implement. REMOVE BEFORE COMMIT
								onConfirm={modifyCard}
								onDelete={() => undefined}
								shown={popupCardShown}
								closeModal={() => {
									setShown(false);
									console.log("CLOSE MODAL");
									document.location.hash = "";
								}}
								annotation={editingAnnotation}
							/>
						)}
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
