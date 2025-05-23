import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface FlipButtonProps {
  onClick: () => void;
}
export default function ConfirmButton({ onClick }: FlipButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="p-0.5 rounded-lg border-2 border-green-500 text-white text-xl bg-transparent hover:bg-green-500 cursor-pointer aria-label='Confirm'"
      title="Confirm"
    >
      <IoMdCheckmark />
    </button>
  );
}
