import React, { useRef, useState } from "react";

interface UploadNotesModalProps {
	isOpen: boolean;
	onClose: () => void;
}
const UploadNotesModal: React.FC<UploadNotesModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [dragActive, setDragActive] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	if (!isOpen) return null;

	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover")
			setDragActive(true);
		else if (e.type === "dragleave") setDragActive(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			// Handle file upload logic here
			console.log(e.dataTransfer.files);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Handle file upload logic here
		console.log(e.target.files);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div className="bg-secondary-2 rounded-lg p-6 shadow-lg">
				<h2 className="text-xl font-semibold mb-4">New Study Set</h2>
				<div className="flex gap-6">
					<div className="mb-4">
						<input
							type="text"
							placeholder="Study Set Name"
							className="border border-gray-300 bg-secondary-1 rounded px-4 py-2 mb-4 w-full"
						/>
						<textarea
							placeholder="Description"
							className="border border-gray-300 bg-secondary-1 rounded px-4 py-2 mb-4 w-full h-24"
							rows={4}
						></textarea>
					</div>
					<div
						className={`border-2 ${
							dragActive ? "border-primary-1" : "border-gray-700"
						} border-dashed rounded-lg bg-[#181824] flex flex-col items-center justify-center p-8 mb-4 transition-colors`}
						onDragEnter={handleDrag}
						onDragOver={handleDrag}
						onDragLeave={handleDrag}
						onDrop={handleDrop}
						onClick={() => inputRef.current?.click()}
						style={{ cursor: "pointer" }}
					>
						<p className="text-white text-center font-medium mb-1">
							Upload your study material
						</p>
						<p className="text-gray-400 text-center text-sm mb-4">
							Drag and drop it here
							<br />
							or
						</p>
						<button
							type="button"
							className="bg-[#232339] text-[#B3B3FF] px-6 py-2 rounded font-medium"
						>
							Choose File
						</button>
						<input
							ref={inputRef}
							type="file"
							accept=".pdf"
							className="hidden"
							onChange={handleChange}
						/>
					</div>
				</div>
                <button
                    type="button"
                    className="bg-primary-1 text-white px-6 py-2 rounded font-medium"
                    onClick={onClose}
                >
                    Create Study Set
                </button>
			</div>
		</div>
	);
};
export default UploadNotesModal;
