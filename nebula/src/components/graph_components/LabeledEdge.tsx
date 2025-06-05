import React, { useState, useCallback } from "react";
import {
	EdgeProps,
	getBezierPath,
	EdgeLabelRenderer,
	Position,
} from "@xyflow/react";
import { useAppContext } from "../../context/AppContext";

export interface LabeledEdgeData {
	label?: string;
}

export interface LabeledEdgeProps {
	id: string; // Unique identifier for the edge
	sourceX: number; // X coordinate of the source node
	sourceY: number; // Y coordinate of the source node
	targetX: number; // X coordinate of the target node
	targetY: number; // Y coordinate of the target node
	sourcePosition: Position; // Position of the source handle
	targetPosition: Position; // Position of the target handle
	style?: React.CSSProperties; // Custom styles for the edge
	data: LabeledEdgeData; // Data associated with the edge
	markerEnd?: string; // Optional marker for the end of the edge
}

export default function LabeledEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	data,
	markerEnd,
}: LabeledEdgeProps) {
	const { edges, setEdges } = useAppContext();
	const [isEditing, setIsEditing] = useState(false);
	const [localLabel, setLocalLabel] = useState(data?.label || "relates to");

	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	const handleLabelClick = useCallback(() => {
		setIsEditing(true);
	}, []);

	const handleLabelChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setLocalLabel(event.target.value);
		},
		[]
	);

	const handleLabelSubmit = useCallback(() => {
		// Update the edge label in the global state
		setEdges((prevEdges) =>
			prevEdges.map((edge) =>
				edge.id === id
					? { ...edge, data: { ...edge.data, label: localLabel } }
					: edge
			)
		);
		setIsEditing(false);
	}, [id, localLabel, setEdges]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				handleLabelSubmit();
			} else if (event.key === "Escape") {
				setLocalLabel(data?.label || "relates to");
				setIsEditing(false);
			}
		},
		[handleLabelSubmit, data?.label]
	);

	const handleBlur = useCallback(() => {
		handleLabelSubmit();
	}, [handleLabelSubmit]);

	return (
		<>
			<path
				id={id}
				style={style}
				className="react-flow__edge-path"
				d={edgePath}
				markerEnd={markerEnd}
			/>
			<EdgeLabelRenderer>
				<div
					style={{
						position: "absolute",
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						fontSize: 12,
						pointerEvents: "all",
					}}
					className="nodrag nopan"
				>
					{isEditing ? (
						<input
							type="text"
							value={localLabel}
							onChange={handleLabelChange}
							onKeyDown={handleKeyDown}
							onBlur={handleBlur}
							autoFocus
							className="bg-white border border-gray-300 rounded px-2 py-1 shadow-sm text-center min-w-[80px]"
							style={{ fontSize: 12 }}
						/>
					) : (
						<div
							onClick={handleLabelClick}
							className="bg-white border border-gray-300 rounded px-2 py-1 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
							title="Click to edit"
						>
							{data?.label || "relates to"}
						</div>
					)}
				</div>
			</EdgeLabelRenderer>
		</>
	);
}
