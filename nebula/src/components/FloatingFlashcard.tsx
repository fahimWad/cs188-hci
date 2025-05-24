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
		<div className="bg-transparent text-white-50 rounded-xl w-full h-[200px] [perspective:1000px] flex flex-col">
			{/* Flashcard flip section */}
			<div
				className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ring-primary-3 ring-4 rounded-xl ${
					flipped ? "[transform:rotateX(180deg)]" : ""
				}`}
				onMouseEnter={() => {
					setHover(true);
				}}
				onMouseLeave={() => {
					setHover(false);
				}}
			>
				{/* Flashcard front */}
				<div
					className="absolute inset-0 flex items-center justify-center
            bg-secondary-2 border border-primary-3 rounded-xl shadow
            text-xl font-bold
            [backface-visibility:hidden] overflow-auto"
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
									flashcard.front.length > 0 &&
									flashcard.back.length > 0
								}
								onClick={() => {
									onConfirm();
									setFlipped(false);
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
							contentEditable={editable}
							suppressContentEditableWarning={true}
							onClick={() => setEditable(true)}
							onBlur={() => setEditable(false)}
							onInput={(e) => {
								const newText = e.currentTarget.textContent;
								if (newText !== null) {
									flashcard.front = newText;
								}
							}}
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
					className="absolute inset-0 flex items-center justify-center
            bg-secondary-2 border border-primary-3 rounded-xl shadow
            text-xl font-bold
            [transform:rotateX(180deg)]
            [backface-visibility:hidden] overflow-auto"
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
									flashcard.front.length > 0 &&
									flashcard.back.length > 0
								}
								onClick={() => {
									onConfirm();
									setFlipped(false);
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
						>
							<p className="text-left text-sm font-light p-2 text-white hover:underline hover:underline-offset-8 cursor-pointer decoration-4 decoration-primary-3">
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
	);
};

export default FloatingFlashcard;
