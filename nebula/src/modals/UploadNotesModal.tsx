import React, { useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";

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
	const [hasFile, setHasFile] = useState(false);

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
			setHasFile(true)
			console.log(e.dataTransfer.files);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Handle file upload logic here
		setHasFile(true)
		console.log(e.target.files);
	};

	const handleClose = () => {
		onClose();
		setHasFile(false);
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
			<div className="bg-neutral-2 rounded-lg p-6 shadow-lg items-center">

				<div className="flex flex-row justify-between">
					<div className="w-full flex flex-row justify-center">
						<h2 className="text-xl font-semibold mb-4 ">New Study Set</h2>
					</div>
					<MdOutlineClose
						className={"hover:fill-white-50 hover:cursor-pointer fill-white"}
						size={24}
						onClick={handleClose} />
				</div>

				<div className="w-full h-full flex flex-row justify-between mt-4 gap-6">
					<div className="w-3/5 h-full mb-4">
						<input
							type="text"
							placeholder="Study Set Name"
							className="bg-neutral-1 rounded-lg px-4 py-2 mb-4 w-full h-full "
						/>
						<textarea
							placeholder="Description"
							className="bg-neutral-1 rounded-xl px-4 pt-2 pb-20 w-full h-full"
							rows={4}
						></textarea>
					</div>
					<div
						className={`border-2 ${
							dragActive ? "border-primary-1" : "border-gray-700"
						} border-dashed rounded-lg bg-neutral-2 hover:bg-neutral-1-85 flex flex-col items-center justify-center py-10 mb-4 w-2/5  transition-colors`}
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
							className="bg-primary-1-10 text-primary-3 px-6 py-2 rounded-lg font-medium"
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

				<div className="w-full flex flex-row justify-end mt-4">
					<button
						type="button"
						className={`text-white px-6 py-2 rounded-xl font-medium 
							${!hasFile ? "pointer-events-none text-white-50 bg-neutral-3" : "text-white bg-primary-1 hover:bg-primary-1-85"}`}
						onClick={handleClose}
					>
						Create Study Set
					</button>
				</div>
                
			</div>
		</div>
	);
};
export default UploadNotesModal;