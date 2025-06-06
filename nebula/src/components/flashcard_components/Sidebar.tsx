import React, { useState } from "react";
import Flashcard, { FlashcardData } from "./Flashcard";
import DeleteButton from "./DeleteButton";
import { CustomHighlight } from "./Highlights";
import FloatingFlashcard from "./FloatingFlashcard";
import { useAppContext } from "../../context/AppContext";

interface SidebarProps {
	flashcard: FlashcardData[];
	onFlip: () => void;
	onConfirm: () => void;
	onDelete: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
	flashcard,
	onFlip,
	onConfirm,
	onDelete,
}) => {
	const { flashcards, setFlashcards, setHighlights } = useAppContext();
	const [selectedId, setSelectedId] = useState<string | number | null>(null);
	const [editingId, setEditingId] = useState<string | number | null>(null);
	const [flippedId, setFlippedId] = useState<string | number | null>(null);
	const [hoveredId, setHoveredId] = useState<string | number | null>(null);
	const [search, setSearch] = useState("");

	// ------------------------------------------------------------
	// search filter
	// ------------------------------------------------------------
	const filtered = flashcards.filter(
		(c) =>
			c.front.toLowerCase().includes(search.toLowerCase()) ||
			c.back.toLowerCase().includes(search.toLowerCase())
	);
	const hashChange = (flashcardID: string) => [
		(document.location.hash = `flashcard-${flashcardID}`),
	];
	return (
		<div className="bg-neutral-1 w-[400px] h-screen p-8 flex flex-col gap-4">
			{/* --- search input -------------------------------------------------- */}
			<input
				type="text"
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="rounded-full bg-white-6 text-white-50 px-4 py-2 w-full"
			/>

			<div className="flex-1 overflow-y-auto px-1 py-1">
				{/* --- flashcard list with hover ring ------------------------------------------------ */}
				{filtered.length === 0 ? (
					<div className="flex items-center justify-center h-full">
						<p className="text-white-25">No flashcards created</p>
					</div>
				) : (
					<div className="flex flex-col gap-4 overflow-visible">
						{filtered.map((card: FlashcardData) => {
							const cardKey: string | number =
								card.id ?? card.front;
							const isActive: boolean =
								selectedId === cardKey || hoveredId === cardKey;
							return (
								<div
									key={cardKey}
									onMouseEnter={() => setHoveredId(cardKey)}
									onMouseLeave={() => setHoveredId(null)}
								>
									<Flashcard
										card={card}
										isActive={isActive}
										selected={selectedId === cardKey}
										editing={editingId === cardKey}
										flipped={flippedId === cardKey}
										/* actions passed down */
										onSelect={() => {
											setSelectedId(cardKey);
											hashChange(cardKey);
										}}
										onEdit={(id) => setEditingId(id)} // id or null
										onFlip={() =>
											setFlippedId((prev) =>
												prev === cardKey
													? null
													: cardKey
											)
										}
									/>
									<div
										className={`-translate-y-1/4 w-full flex flex-row items-center justify-center ${
											hoveredId === cardKey
												? "opacity-100"
												: "opacity-0"
										} transition-opacity duration-300`}
									>
										<DeleteButton
											key={cardKey}
											color="lavender"
											onClick={() => {
												setFlashcards((prev) =>
													prev.filter(
														(c) =>
															(c.id ??
																c.front) !==
															cardKey
													)
												);
												setHighlights((prev) =>
													prev.filter(
														(h) =>
															String(
																h.flashcardID
															) !== cardKey
													)
												);
												if (selectedId === cardKey)
													setSelectedId(null);
												if (editingId === cardKey)
													setEditingId(null);
												if (flippedId === cardKey)
													setFlippedId(null);
												if (hoveredId === cardKey)
													setHoveredId(null);
											}}
											isVisible={hoveredId === cardKey}
											isActive={true}
										/>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>

			{/* Floating flashcard */}
			<hr className="border border-white-25 my-2" />
			<div className="sticky bottom-0 left-0 right-0">
				<FloatingFlashcard
					flashcard={flashcard[0]}
					onFlip={onFlip}
					onConfirm={onConfirm}
					onDelete={onDelete}
				/>
			</div>
		</div>
	);
};

export default Sidebar;
