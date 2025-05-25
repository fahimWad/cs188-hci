
import React from 'react';
interface FlipButtonProps {
  onClick: any, // I do not care this is bad syntax, fix it later


}
export default function QuickButton({ onClick}:FlipButtonProps) {
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
      Flip
    </button>
  );
}