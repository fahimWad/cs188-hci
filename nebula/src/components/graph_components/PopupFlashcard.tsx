import React from "react";
import { FlashcardData } from "../flashcard_components/Flashcard";
import FlipButton from "../flashcard_components/FlipButton";
import ConfirmButton from "../flashcard_components/ConfirmButton";
import DeleteButton from "../flashcard_components/DeleteButton";

interface PopUpFlashcardProps {
  flashcard: FlashcardData;
  onFlip: () => void;
  onConfirm: (newFlashcard: FlashcardData) => void;
  onDelete: () => void;
  shown: boolean;
  closeModal: () => void;
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

const PopupFlashcard: React.FC<PopUpFlashcardProps> = ({
  flashcard,
  onFlip,
  onConfirm,
  onDelete,
  shown,
  closeModal,
}) => {
  //   // Only render if there is text to show.
  //   if (!flashcard || (!flashcard.front && !flashcard.back)) return null;
  const [flipped, setFlipped] = React.useState(false);
  const [editable, setEditable] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    if (shown) {
      setFlipped(false);
    }
  }, [shown]);
  return (
    <div>
      {shown ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div
            className="
			bg-transparent text-white-50 rounded-xl w-[10vw] h-[10vw]
			[perspective:1000px] [-webkit-perspective:1000px]
			flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            z-100
			"
          >
            {/* Flashcard flip section */}
            <div
              className={`
					relative w-full h-full transition-transform duration-700
					[transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]
					ring-primary-3 ring-4 rounded-xl
					${flipped ? "[transform:rotateX(180deg)]" : ""}
				`}
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              {/* Flashcard front */}
              <div
                className="
					absolute inset-0 flex items-center justify-center
					bg-neutral-2 border border-primary-3 rounded-xl shadow
					text-xl font-bold
					[transform:rotateX(0deg)] [-webkit-transform:rotateX(0deg)]
					[backface-visibility:hidden] [-webkit-backface-visibility:hidden]
					overflow-auto
					"
              >
                {/* Flashcard header */}
                <div
                  className={`absolute top-0 left-0 w-full flex justify-between items-center px-4 py-2 z-20 pointer-events-auto`}
                >
                  {/* Delete Button (top left) */}
                  <DeleteButton
                    color="red"
                    onClick={onDelete}
                    isVisible={hover}
                  />
                  {/* Flip and Confirm buttons (top right) */}
                  <div className="flex gap-2">
                    <ConfirmButton
                      isActive={
                        flashcard.front.length > 0 && flashcard.back.length > 0
                      }
                      onClick={() => {
                        onConfirm({
                          id: flashcard.id,
                          front: flashcard.front,
                          back: flashcard.back,
                        });
                        setFlipped(false);
                        closeModal();
                      }}
                      isVisible={hover}
                    />
                    <FlipButton
                      isActive={flashcard.front.length > 0}
                      onClick={() => {
                        onFlip();
                        setFlipped((prev) => !prev);
                      }}
                    />
                  </div>
                </div>

                {flashcard.front.length > 0 ? (
                  <div
                    contentEditable={editable ? "plaintext-only" : false}
                    suppressContentEditableWarning={true}
                    onClick={() => setEditable(true)}
                    onBlur={() => setEditable(false)}
                    onInput={(e) => {
                      const newText = e.currentTarget.textContent;
                      if (newText !== null) {
                        flashcard.front = newText;
                      }
                    }}
                    onKeyDown={handleKeyDown}
                  >
                    <p className="text-center p-2 text-white hover:underline hover:underline-offset-8 cursor-pointer decoration-4 decoration-primary-3">
                      {flashcard.front}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-center font-bold">New Term</p>
                    <span className="text-sm font-light">
                      Select text from PDF
                    </span>
                  </div>
                )}
              </div>

              {/* Flashcard back */}
              <div
                className="
					absolute inset-0 flex items-center justify-center
					bg-neutral-2 border border-primary-3 rounded-xl shadow
					text-xl font-bold
					[transform:rotateX(180deg)] [-webkit-transform:rotateX(180deg)]
					[backface-visibility:hidden] [-webkit-backface-visibility:hidden]
					overflow-auto
					"
              >
                {/* Flashcard header */}
                <div
                  className={`absolute top-0 left-0 w-full flex justify-between items-center px-4 py-2 z-20 pointer-events-auto [transform:rotateX(180deg)]"}`}
                >
                  {/* Delete Button (top left) */}
                  <DeleteButton
                    color="red"
                    onClick={onDelete}
                    isVisible={hover}
                  />
                  {/* Front text */}
                  <div className="flex-1 flex items-center justify-center overflow-hidden mx-2">
                    <span className="truncate text-white text-base font-semibold translate-x-[7%]">
                      {flashcard.front}
                    </span>
                  </div>
                  {/* Flip and Confirm buttons (top right) */}
                  <div className="flex gap-2">
                    <ConfirmButton
                      isActive={
                        flashcard.front.length > 0 && flashcard.back.length > 0
                      }
                      onClick={() => {
                        onConfirm({
                          id: flashcard.id,
                          front: flashcard.front,
                          back: flashcard.back,
                        });
                        closeModal();
                      }}
                      isVisible={hover}
                    />
                    <FlipButton
                      isActive={flashcard.front.length > 0}
                      onClick={() => {
                        onFlip();
                        setFlipped((prev) => !prev);
                      }}
                    />
                  </div>
                </div>
                {flashcard.back.length > 0 ? (
                  <div
                    contentEditable={editable}
                    suppressContentEditableWarning={true}
                    onClick={() => setEditable(true)}
                    onBlur={() => setEditable(false)}
                    onInput={(e) => {
                      const newText = e.currentTarget.textContent;
                      if (newText !== null) {
                        flashcard.back = newText;
                      }
                    }}
                    onKeyDown={handleKeyDown}
                  >
                    <p className="text-left text-sm [&_b]:font-bold font-light p-2 text-white hover:underline hover:underline-offset-8 cursor-pointer decoration-4 decoration-primary-3">
                      {flashcard.back}
                    </p>
                  </div>
                ) : (
                  <p className="text-center p-2 font-light">
                    Select text from PDF
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PopupFlashcard;
