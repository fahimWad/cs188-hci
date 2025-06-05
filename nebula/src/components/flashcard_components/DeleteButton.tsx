import React from "react";
import { IoMdTrash } from "react-icons/io";

type DeleteButtonProps = {
	onClick: () => void;
	color: string;
	disabled?: boolean;
	children?: React.ReactNode;
	isVisible?: boolean;
	isActive?: boolean;
};

const colorClassMap: { [key: string]: string } = {
	red: "text-red-500 -translate-x-1/4",
	lavender: "border-primary-3 bg-primary-3 text-white text-xl", // no hovering animation, just override solid color for sidebar
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
	onClick,
	color,
	isVisible,
	isActive,
}) => (
	<button
		className={`
            p-0.5 rounded-lg
            ${isActive ? "opacity-100 cursor-pointer" : "opacity-50"}
            ${colorClassMap[color] || ""}
        `}
		type="button"
		onClick={onClick}
		aria-label="Delete"
		title="Delete"
		disabled={!isActive}
		aria-disabled={!isActive}
	>
		<IoMdTrash />
	</button>
);

export default DeleteButton;
