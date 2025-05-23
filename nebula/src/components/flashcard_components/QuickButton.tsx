
import React from 'react';
import { text } from 'stream/consumers';
interface QuickButtonProps {
  btnText: string,
  onClick: () => void, // I do not care this is bad syntax, fix it later
}
export default function QuickButton({btnText, onClick}: QuickButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.4rem 0.8rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: 'white',
        cursor: 'pointer',
        fontSize: '0.9rem',
      }}
    >
      {btnText}
    </button>
  );
}