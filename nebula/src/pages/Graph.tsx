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

function cardsToNodes(
	cards: Array<FlashcardData>,
	existingNodes: AllNodeTypes[] = []
): FlashCardNodeType[] {
	return cards.map((c, i) => {
		const nodeId = `flashcard-${c.id ?? i}`;

		// Try to find existing position for this node
		const existingNode = existingNodes.find((node) => node.id === nodeId);
		const defaultPosition = { x: 120 + i * 260, y: 120 };

		return {
			id: nodeId,
			type: "flashCard",
			position: existingNode?.position || defaultPosition, // Use existing position if available
			data: { card: c, type: "flashCard" as const },
		};
	});
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
			const flashcardNodes = cardsToNodes(flashCards, nodes); // Pass existing nodes
			setNodes((prevNodes) => [
				...prevNodes.filter(
					(node) => !node.id.startsWith("flashcard-")
				),
				...flashcardNodes,
			]);
		}
	}, [flashCards, setNodes]); // Note: don't add 'nodes' to dependencies to avoid infinite loops

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
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onConnect={onConnect}
			nodeTypes={nodeTypes}
			edgeTypes={edgeTypes}
			proOptions={proOptions}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			fitView
			style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF' }}
			translateExtent={[[ -1e6, -1e6 ], [ 1e6, 1e6 ]]}  /* virtually unlimited panning */
		/>
    );
};

const Graph: React.FC = () => {
	const { flashcards: flashCards, setNodes, nodes, setEdges, setHighlights, setFlashcards} = useAppContext(); // Get flashcards from context
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
			const flashcardNodes = cardsToNodes(flashCards, nodes); // Pass existing nodes here too
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

	
	const handleDeleteCard = () => {
		// 1) Remove from sidebar array if it’s there (by comparing card.id)
		setFlashcards((prev) =>
			prev.filter((card) => card.id !== currentPopupCard.id)
		);

		// 2) Remove any highlights for that flashcard
		setHighlights((prev) =>
			prev.filter(
			(h) =>
				String(h.flashcardID) !== currentPopupCard.id || h.side !== "front"
			)
		);
		setHighlights((prev) =>
			prev.filter(
			(h) =>
				String(h.flashcardID) !== currentPopupCard.id || h.side !== "back"
			)
		);

		// 3) Find the actual node in `nodes` whose data.card.id matches currentPopupCard.id
		//    This works whether the node’s ID was "flashcard-…" or "graphnode-…".
		const nodeToDelete = nodes.find(
			(node): node is FlashCardNodeType =>
			isFlashCardNode(node) && node.data.card.id === currentPopupCard.id
		);

		if (nodeToDelete) {
			const nodeId = nodeToDelete.id;

			// 4) Remove that node from React Flow
			setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));

			// 5) Remove any edges whose source or target was this node
			setEdges((prevEdges) =>
			prevEdges.filter(
				(edge) => edge.source !== nodeId && edge.target !== nodeId
			)
			);
		}

		// 6) Close the popup, clear its state, and reset the hash so it won’t reopen
		setCurrentPopupCard({ id: "", front: "", back: "" });
		setShown(false);
		document.location.hash = "";
	};

	const handleDeleteAnnotation = () => {
		// Since annotation nodes always store their own ID as `node.id`, we can delete by that directly:
		const annotationId = currentAnnotation.id;

		// 1) Remove the annotation node from `nodes`
		setNodes((prevNodes) =>
			prevNodes.filter((node) => node.id !== annotationId)
		);

		// 2) Remove any edges attached to that annotation
		setEdges((prevEdges) =>
			prevEdges.filter(
			(edge) => edge.source !== annotationId && edge.target !== annotationId
			)
		);

		// 3) Clear annotation‐popup state, close the modal, and reset the hash
		setCurrentAnnotation({
			id: "",
			type: "annotation",
			position: { x: 0, y: 0 },
			data: { content: "" },
		});
		setShown(false);
		document.location.hash = "";
	};




	return (
		<div className="flex flex-col h-screen">
			<PageNav />
			<ReactFlowProvider>
				{nodes.length > 0 || flashCards.length > 0 ? (
					<div className="relative flex-1">
						<FlowCanvas flashCards={flashCards} />
						{editingAnnotation ? (
							<PopupAnnotation
								annotationData={currentAnnotation.data}
								id={currentAnnotation.id}
								onConfirm={modifyAnnotation}
								shown={popupCardShown}
								onDelete={handleDeleteAnnotation}
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
								onDelete={handleDeleteCard}
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
