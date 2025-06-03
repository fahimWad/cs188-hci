import React from 'react';
import { IoMdTrash } from "react-icons/io";

type DeleteButtonProps = {
    onClick: () => void;
    color: string;
    disabled?: boolean;
    children?: React.ReactNode;
    isVisible?: boolean;
};

const colorClassMap: { [key: string]: string } = {
    red: 'text-red-500 -translate-x-1/4',
    lavender: 'border-primary-3 bg-primary-3 text-white text-xl',          // no hovering animation, just override solid color for sidebar
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
    onClick,
    color,
    isVisible,
}) => (
    <button
        className={`
            p-0.5 rounded-lg
            cursor-pointer
            opacity-100
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