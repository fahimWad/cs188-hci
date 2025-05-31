import React, { useState } from "react";
import AddStudySetButton from "../components/landing_components/AddStudySetButton";
import UploadNotesModal from "../components/landing_components/UploadNotesModal";
import { IoMdAddCircle, IoMdSearch } from "react-icons/io";
import { MdOutlineSearch, MdOutlineSort } from "react-icons/md";

const LandingPage: React.FC = () => {
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
        <div className="w-screen h-screen text-white bg-neutral-1 flex flex-col p-8 overflow-y-hidden">
            {/* TODO: Add nebula brand logo above */}

            <div className="flex flex-row justify-between">
              <p className={`text-xl font-semibold`}>
                Study Sets
              </p>

              {/* <div className="flex flex-row">
                <MdOutlineSearch size={24} 
                  className={`hover:fill-white-50 hover:cursor-pointer fill-white`}/>
                <MdOutlineSort size={24} 
                  className={`hover:fill-white-50 hover:cursor-pointer fill-white ml-2`}/>
              </div> */}
            </div>

            <UploadNotesModal onClose={handleCloseUploadNotesModal} isOpen={showUploadNotesModal} />

            <div className="flex flex-row justify-between py-8 space-x-8">
                <div className={`w-full rounded-xl p-6 flex flex-row items-center hover:bg-primary-1-5 hover:cursor-pointer bg-primary-1-10`}>
                    {/* TODO: Click to display modal */}
                    <div className="w-full h-full flex flex-col justify-center items-center"
                    onClick={handleAddStudySet}>
                        <IoMdAddCircle
                          className="fill-primary-1"
                          size={48}/>
                        <p className="mt-2 text-white text-md">Create Study Set</p>
                    </div>
                </div>

                <div className={`w-full bg-neutral-2 hover:bg-neutral-2-85 hover:cursor-pointer bg-neutral-2 rounded-xl p-6`}>
                    {/* Will eventually be a thumbnail */}
                    <div className="w-full h-40 bg-neutral-1" />
                    
                    {/* TODO: Click to play tutorial video */}
                    <div className="mt-6 text-white">
                        <p className="text-lg font-semibold">Welcome to Nebula!</p>
                        <p className="text-md">Let’s go through a quick tutorial together to get you started with the basics.</p>
                        <p className="mt-2 text-white-50 text-sm">Last modified 2 hours ago</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default LandingPage;