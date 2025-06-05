import React from "react";
import { FlashcardData } from "./Flashcard";
import FlipButton from "./FlipButton";
import ConfirmButton from "./ConfirmButton";
import DeleteButton from "./DeleteButton";

interface FloatingFlashcardProps {
	flashcard: FlashcardData;
	onFlip: () => void;
	onConfirm: () => void;
	onDelete: () => void;
}
// simple mac detection
const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

// inside your key handler:
function handleKeyDown(e: React.KeyboardEvent) {
	const modKey = isMac ? e.metaKey : e.ctrlKey;
	const isBold = modKey && e.key.toLowerCase() === "b";

	if (isBold) {
		// do your “bold” action…
		e.preventDefault();
		document.execCommand("bold");
	}
}

const FloatingFlashcard: React.FC<FloatingFlashcardProps> = ({
	flashcard,
	onFlip,
	onConfirm,
	onDelete,
}) => {
	//   // Only render if there is text to show.
	//   if (!flashcard || (!flashcard.front && !flashcard.back)) return null;
	const [flipped, setFlipped] = React.useState(false);
	const [editable, setEditable] = React.useState(false);
	const [hover, setHover] = React.useState(false);

	return (
		<div
			className="
			bg-transparent text-white-50 rounded-xl w-full h-[200px]
			[perspective:1000px] [-webkit-perspective:1000px]
			flex flex-col
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
                    absolute inset-0 flex flex-col
                    bg-neutral-2 border border-primary-3 rounded-xl shadow
                    text-xl font-bold
                    [transform:rotateX(0deg)] [-webkit-transform:rotateX(0deg)]
                    [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
                    "
				>
					{/* Flashcard header */}
					<div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-neutral-2 rounded-t-xl">
						{/* Delete Button (top left) */}
						<DeleteButton
							color="red"
							onClick={onDelete}
							isVisible={hover}
							isActive={flashcard.front.length > 0}
						/>
						{/* Flip and Confirm buttons (top right) */}
						<div className="flex gap-2">
							<ConfirmButton
								isActive={
									flashcard.front.length > 0 &&
									flashcard.back.length > 0
								}
								onClick={() => {
									onConfirm();
									setFlipped(false);
								}}
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

					<div className="flex-1 overflow-y-scroll py-4 pt-8 px-2">
						{flashcard.front.length > 0 ? (
							<div
								contentEditable={
									editable ? "plaintext-only" : false
								}
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
								className="min-h-full flex items-center justify-center"
								style={{ direction: "ltr" }}
							>
								<p className="text-center p-2 text-white cursor-pointer decoration-4 decoration-primary-3">
									{flashcard.front}
								</p>
							</div>
						) : (
							<div className="flex items-center justify-center h-full">
								<div className="text-center">
									<p className="font-bold">New Term</p>
									<span className="text-sm font-light">
										Select text from PDF
									</span>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Flashcard back */}
				<div
					className="
                    absolute inset-0 flex flex-col
                    bg-neutral-2 border border-primary-3 rounded-xl shadow
                    text-xl font-bold
                    [transform:rotateX(180deg)] [-webkit-transform:rotateX(180deg)]
                    [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
                    "
				>
					{/* Flashcard header */}
					<div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 py-2 bg-neutral-2 rounded-t-xl">
						{/* Delete Button (top left) */}
						<DeleteButton
							color="red"
							onClick={onDelete}
							isVisible={hover}
							isActive={flashcard.back.length > 0}
						/>
						{/* Front text */}
						<div className="flex-1 flex items-center justify-center overflow-hidden mx-2 ">
							<span className="truncate text-white text-base font-semibold">
								{flashcard.front}
							</span>
						</div>
						{/* Flip and Confirm buttons (top right) */}
						<div className="flex gap-2">
							<ConfirmButton
								isActive={
									flashcard.front.length > 0 &&
									flashcard.back.length > 0
								}
								onClick={() => {
									onConfirm();
									setFlipped(false);
								}}
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
					<div className="flex-1 overflow-y-auto py-4 pt-8 px-2">
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
								className="w-full"
								style={{ direction: "ltr" }}
							>
								<p className="text-left text-sm [&_b]:font-bold font-light p-2 text-white cursor-pointer decoration-4 decoration-primary-3">
									{flashcard.back}
								</p>
							</div>
						) : (
							<div className="flex items-center justify-center h-full">
								<p className="text-center font-light">
									Select text from PDF
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FloatingFlashcard;
