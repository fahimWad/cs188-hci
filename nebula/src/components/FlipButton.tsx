
import React from 'react';
import { FaArrowsRotate } from "react-icons/fa6";

interface FlipButtonProps {
  onClick: () => void;
}
export default function FlipButton({ onClick}:FlipButtonProps) {
  return (
    <button
      className='p-0.5 mr-2 rounded-lg border-2 border-[#CCC4FF] bg-transparent hover:bg-[#CCC4FF] font-size-sm cursor-pointer'
        type="button"
        onClick={onClick}
        aria-label="Flip"
        title="Flip"
    >
      <FaArrowsRotate />
    </button>
  );
}