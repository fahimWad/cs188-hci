import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const AddNodeButton: React.FC<{ onClick: () => void; isOpen: boolean }> = ({
	onClick,
	isOpen,
}) => (
	<button
		type="button"
		onClick={onClick}
		aria-label={isOpen ? "Close" : "Add Node"}
		title={isOpen ? "Close" : "Add Node"}
		className="
      absolute bottom-4 right-4
      p-3 rounded-full shadow-lg
      bg-primary-2 text-black focus:outline-none
      hover:scale-105 transition
    "
	>
		{isOpen ? (
			<MdClose className="w-6 h-6 text-white" />
		) : (
			<FaPlus className="w-6 h-6 text-white" />
		)}
	</button>
);

export default AddNodeButton;
