import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface FlipButtonProps {
  onClick: () => void;
  isActive: boolean;
}
export default function ConfirmButton({ onClick, isActive }: FlipButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`p-0.5 rounded-lg border-2 border-green-500 text-white text-xl bg-transparent aria-label='Confirm' ${isActive ? 'opacity-100 hover:bg-green-500 cursor-pointer' : 'opacity-50'}`}
      title="Confirm"
      disabled={!isActive}
      aria-disabled={!isActive}
      aria-label="Confirm"
    >
      <IoMdCheckmark />
    </button>
  );
}
