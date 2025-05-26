import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { TbSitemapFilled } from "react-icons/tb";


const PageNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="absolute top-0 left-0 h-full w-[90px] z-[100] bg-secondary-1 flex flex-col justify-center items-center gap-4 p-4 bg-secondary-1">
            <button
                onClick={() => navigate("/pdf")}
                className={`p-4 rounded-lg ${location.pathname === "/pdf" ? "bg-primary-1 text-white" : "bg-gray-200 text-secondary-1"}`}
                title="PDF View" aria-label="PDF View"
            >
                <MdEditDocument className="inline-block text-xl" />
            </button>
            <button
                onClick={() => navigate("/graph")}
                className={`p-4 rounded-lg ${location.pathname === "/graph" ? "bg-primary-1 text-white" : "bg-gray-200 text-secondary-1"}`}
                title="Graph View" aria-label="Graph View"
            >
                <TbSitemapFilled className="inline-block text-xl" />
            </button>
        </div>
    );
};
export default PageNav;