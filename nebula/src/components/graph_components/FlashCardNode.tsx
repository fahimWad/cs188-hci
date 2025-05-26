import { useState, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import Flashcard, {FlashcardData} from "../flashcard_components/Flashcard";

const leftShift = { left: 1 };
const rightShift = { right: 0, left: 188 };

interface FlashCardNodeData {
    card: FlashcardData;
}

interface FlashCardNodeProps {
    data: FlashCardNodeData;
    isConnectable: boolean;
    selected?: boolean;
}

export default function FlashCardNode({ data, isConnectable, selected = false }: FlashCardNodeProps) {
  const [isActive, setIsActive] = useState(false);
  const [editing, setEditing] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const handleSelect = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  const handleEdit = useCallback((id: string | number | null) => {
    setEditing(!editing);
  }, [editing]);

  const handleFlip = useCallback(() => {
    setFlipped(!flipped);
  }, [flipped]);

  return (
    <div className="text-updater-node">
{/* top left handle/connection point: a */}
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={leftShift}
        isConnectable={isConnectable}
      />
{/* top middle handle/connection point: b */}
      <Handle
        type="source"
        position={Position.Top}
        id="b"
        isConnectable={isConnectable}
      />
{/* top right handle/connection point: c */}
      <Handle
        type="source"
        position={Position.Top}
        id="c"
        style={rightShift}
        isConnectable={isConnectable}
      />
{/* left handle/connection point: d */}
      <Handle
        type="source"
        position={Position.Left}
        id="d"
        // style={handleStyle}
        isConnectable={isConnectable}
      />
{/* right handle/connection point: e */}
      <Handle
        type="target"
        position={Position.Right}
        id="e"
        // style={handleStyle}
        isConnectable={isConnectable}
      />
      {/* <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div> */}
{/* bottom left handle/connection point: f */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="f"
        style={leftShift}
        isConnectable={isConnectable}
      />
{/* bottom middle connection point: g */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="g"
        isConnectable={isConnectable}
      />
{/* bottom right connection point: h */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="h"
        style={rightShift}
        isConnectable={isConnectable}
      />
      {/* The actual FlashCard component */}
      <Flashcard
        card={data.card}
        isActive={isActive}
        selected={selected}
        editing={editing}
        flipped={flipped}
        onSelect={handleSelect}
        onEdit={handleEdit}
        onFlip={handleFlip}
      />
    </div>
  );
}
