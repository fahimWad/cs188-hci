
import React from 'react';
import { FaArrowsRotate } from "react-icons/fa6";

interface FlipButtonProps {
  onClick: () => void;
  isActive: boolean;
}
export default function FlipButton({ onClick, isActive }:FlipButtonProps) {
  return (
    <button
      className={`translate-x-1/4 text-primary-3 font-size-sm ${isActive ? 'opacity-100 cursor-pointer' : 'opacity-50'}`}
        type="button"
        onClick={onClick}
        disabled={!isActive}
        aria-disabled={!isActive}
        aria-label="Flip"
        title="Flip"
    >
      <FaArrowsRotate />
    </button>
  );
}