import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface FlipButtonProps {
  onClick: () => void;
  isActive: boolean;
  isVisible: boolean;
}
export default function ConfirmButton({ onClick, isActive, isVisible }: FlipButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-green-500 aria-label='Confirm' opacity-0 ${isActive ? 'cursor-pointer' : ''} ${isVisible && isActive ? 'opacity-100' : ''}`}
      title="Confirm"
      disabled={!isActive}
      aria-disabled={!isActive}
      aria-label="Confirm"
    >
      <IoMdCheckmark />
    </button>
  );
}
