import React, { useCallback, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  ReactFlow,
  applyNodeChanges,
  Background,
  Controls,
} from "reactflow";

import FlashcardNode from "./FlashcardNode";

const nodeTypes = { flashcard: FlashcardNode }; // This is neccessary
const initialNodes = [
  {
    id: "asdf",
    type: "flashcard",
    position: { x: 50, y: 100 },
    data: { color: "#ff0072" },
  },
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      onNodesChange={(changes) =>
        setNodes((nds) => applyNodeChanges(changes, nds))
      }
      onEdgesChange={(changes) =>
        setEdges((eds) => applyEdgeChanges(changes, eds))
      }
    >
      <Background variant="lines" />
      <Controls />
    </ReactFlow>
  );// React flow has a lot of other props, do research for other features
}
export default Flow; // Please rename later
