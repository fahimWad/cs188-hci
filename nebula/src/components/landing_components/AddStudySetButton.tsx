import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

interface AddStudySetButtonProps {
    onClick: () => void;
}

const AddStudySetButton: React.FC<AddStudySetButtonProps> = ({ onClick }) => {
    return (
        <button
            className='bg-primary-1-10 text-white-50 rounded-xl w-[400px] h-[200px] flex flex-col'
            onClick={onClick}
        >
            <div className='flex items-center justify-center h-full'>
                <div className="flex flex-col items-center justify-center w-full">
                    <FaPlusCircle className='w-6 h-6'/>
                    <span className='text-lg font-semibold mt-2'>Create Study Set</span>
                </div>
            </div>
        </button>
    );
}

export default AddStudySetButton;