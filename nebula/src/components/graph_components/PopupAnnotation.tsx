import React from "react";
import { FlashcardData } from "../flashcard_components/Flashcard";
import FlipButton from "../flashcard_components/FlipButton";
import ConfirmButton from "../flashcard_components/ConfirmButton";
import DeleteButton from "../flashcard_components/DeleteButton";

interface PopupAnnotationProps {
  annotationData: { content: string; icon?: string };
  id: string;
  onConfirm: (
    newAnnotation: { content: string; icon?: string },
    id: string
  ) => void;
  onDelete: () => void;
  shown: boolean;
  closeModal: () => void;
  annotation: boolean;
}
// Detects if mac
const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

function handleKeyDown(e: React.KeyboardEvent) {
  const modKey = isMac ? e.metaKey : e.ctrlKey;
  const isBold = modKey && e.key.toLowerCase() === "b";

  if (isBold) {
    e.preventDefault();
    document.execCommand("bold");
  }
}

const PopupAnnotation: React.FC<PopupAnnotationProps> = ({
  annotationData,
  id,
  onConfirm,
  onDelete,
  shown,
  closeModal,
  annotation,
}) => {
  const [content, setContent] = React.useState(annotationData.content);
  const [baseText, setBase] = React.useState(annotationData.content);
  React.useEffect(() => {
    // For instant change of state when the content is changed outside of the component
    if (shown) {
      setContent(annotationData.content);
    }
  }, [annotationData, shown]);
  React.useEffect(() => {
    if (shown) setBase(annotationData.content);
  }, [shown, annotationData.content]);
  const confirm = () => {
    onConfirm({ ...annotationData, content: content }, id);
    closeModal();
  };
  if (!shown) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Back‑drop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Card */}
      <div className="relative z-50 w-[22rem] max-w-[90vw] rounded-xl bg-neutral-2 border border-primary-3 shadow p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {/* Delete */}
          <DeleteButton color="red" onClick={onDelete} />

          {/* Optional icon */}
          {annotationData.icon && (
            <span className="text-2xl">{annotationData.icon}</span>
          )}
        </div>

        {/* Editable content */}
        <div
          contentEditable
          suppressContentEditableWarning
          className="min-h-[6rem] whitespace-pre-wrap break-words outline-none cursor-text"
          onInput={(e) => setContent(e.currentTarget.textContent ?? "")}
          onKeyDown={handleKeyDown}
        >
          {baseText}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <ConfirmButton
            isActive={content.trim().length > 0}
            onClick={confirm}
            isVisible={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PopupAnnotation;
