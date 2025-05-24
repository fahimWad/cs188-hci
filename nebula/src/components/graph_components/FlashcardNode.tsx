import { useCallback } from "react";
import { Handle, Position, NodeProps } from "reactflow";

export default function FlashcardNode({ data, isConnectable }: NodeProps) {
  return (
    <div className="rounded p-2 text-white" style={{ background: data.color }}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <input
        type="color"
        value={data.color}
        readOnly
        className="cursor-pointer"
      />
    </div>
  );
}
