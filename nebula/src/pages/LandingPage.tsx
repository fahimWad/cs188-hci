import React, { useState } from "react";
import AddStudySetButton from "../components/landing_components/AddStudySetButton";
import UploadNotesModal from "../modals/UploadNotesModal";

const LandingPage = () => {
    const [showUploadNotesModal, setShowUploadNotesModal] = useState(false);

    // Function to handle the click event for adding a study set
    const handleAddStudySet = () => {
        setShowUploadNotesModal(true);
    };

    // Function to close the upload notes modal
    const handleCloseUploadNotesModal = () => {
        setShowUploadNotesModal(false);
    };

    return(
        <div className="h-screen bg-neutral-1">
            <AddStudySetButton onClick={handleAddStudySet} />
            <UploadNotesModal onClose={handleCloseUploadNotesModal} isOpen={showUploadNotesModal} />
        </div>
    );
}

export default LandingPage;