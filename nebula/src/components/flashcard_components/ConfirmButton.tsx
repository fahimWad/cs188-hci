import React from "react";
interface FlipButtonProps {
  onClick: any; // I do not care this is bad syntax, fix it later
}

export default function ConfirmButton({ onClick }: FlipButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        relative        /* enables z-index to work */
        z-[300]         /* above the sidebar’s 200 */
        px-4 py-2
        border border-gray-300
        rounded-md
        bg-green-500
        text-white
        text-sm
        hover:bg-green-600
        transition
      "
    >
      Y
    </button>
  );
}
