import { FaPlus } from "react-icons/fa";

/* … same imports + code above … */

const AddNodeButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Add Node"
    title="Add Node"
    className="
      absolute bottom-4 right-4
      z-50
      p-3 rounded-full shadow-lg
      bg-primary-2 text-black focus:outline-none
      hover:scale-105 transition
    "
  >
    <FaPlus className="w-6 h-6 text-white" />
  </button>
);

export default AddNodeButton;