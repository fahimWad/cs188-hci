import { FaTag } from "react-icons/fa";

interface AddAnnotationButtonProps {
	onClick: () => void;
	isVisible: boolean;
}

const AddAnnotationButton: React.FC<AddAnnotationButtonProps> = ({
	onClick,
	isVisible,
}) => (
	<button
		type="button"
		onClick={onClick}
		aria-label="Add Annotation"
		title="Add Annotation"
		className={`
      absolute bottom-4 right-20
      z-40
      p-3 rounded-full shadow-lg
      bg-green-500 text-white
      focus:outline-none
      hover:scale-105 transition-all duration-300
      ${
			isVisible
				? "opacity-100 translate-x-0"
				: "opacity-0 translate-x-4 pointer-events-none"
		}
    `}
	>
		<FaTag className="w-4 h-4" />
	</button>
);

export default AddAnnotationButton;
