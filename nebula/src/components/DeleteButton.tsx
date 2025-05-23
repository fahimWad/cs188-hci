import React from 'react';
import { IoMdTrash } from "react-icons/io";

type DeleteButtonProps = {
    onClick: () => void;
    color: string;
    disabled?: boolean;
    children?: React.ReactNode;
};

const colorClassMap: { [key: string]: string } = {
    red: 'border-red-500 hover:bg-red-500 text-white',
    lavender: 'border-primary-3 bg-primary-3 text-white',          // no hovering animation, just override solid color for sidebar
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
    onClick,
    color,
}) => (
    <button
        className={`
            p-0.5 rounded-lg border-2
            bg-transparent
            transition-colors
            text-xl cursor-pointer
            ${colorClassMap[color] || ''}
        `}
        type="button"
        onClick={onClick}
        aria-label="Delete"
        title="Delete"
    >
        <IoMdTrash />
    </button>
);

export default DeleteButton;