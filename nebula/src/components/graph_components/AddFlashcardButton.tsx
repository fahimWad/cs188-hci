import { FaPlus } from "react-icons/fa";

interface AddFlashcardButtonProps {
	onClick: () => void;
	isVisible: boolean;
}

const AddFlashcardButton: React.FC<AddFlashcardButtonProps> = ({
	onClick,
	isVisible,
}) => (
	<button
		type="button"
		onClick={onClick}
		aria-label="Add Flashcard"
		title="Add Flashcard"
		className={`
      absolute bottom-20 right-4
      z-40
      p-3 rounded-full shadow-lg
      bg-blue-500 text-white
      focus:outline-none
      hover:scale-105 transition-all duration-300
      ${
			isVisible
				? "opacity-100 translate-y-0"
				: "opacity-0 translate-y-4 pointer-events-none"
		}
    `}
	>
		<FaPlus className="w-4 h-4" />
	</button>
);

export default AddFlashcardButton;
