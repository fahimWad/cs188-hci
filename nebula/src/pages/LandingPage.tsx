import React from "react";
import { IoMdAddCircle, IoMdSearch } from "react-icons/io";
import { MdOutlineSearch, MdOutlineSort } from "react-icons/md";

const LandingPage = () => {

    const [createHover, setCreateHover] = React.useState(false);
    const [tutorialHover, setTutorialHover] = React.useState(false);
    const [searchHover, setSearchHover] = React.useState(false);
    const [sortHover, setSortHover] = React.useState(false)

    const handleCreateHover = () => {
      setCreateHover(!createHover);
    }

    const handleTutorialHover = () => {
      setTutorialHover(!tutorialHover);
    }

    const handleSearchHover = () => {
      setSearchHover(!searchHover);
    }

    const handleSortHover = () => {
      setSortHover(!sortHover)
    }

    return(
        <div className="w-screen h-screen text-white bg-secondary-1 flex flex-col p-8 overflow-y-hidden">
            {/* TODO: Add nebula brand logo above */}


            <div className="flex flex-row justify-between">
              <p className={`text-xl font-semibold`}>
                Study Sets
              </p>

              <div className="flex flex-row">
                <MdOutlineSearch size={24} 
                  className={`${searchHover ? "fill-white-50 cursor-pointer" : "fill-white"}`}
                  onMouseEnter={handleSearchHover}
                  onMouseLeave={handleSearchHover}/>
                <MdOutlineSort size={24} 
                  className={`${sortHover ? "fill-white-50 cursor-pointer" : "fill-white"} ml-2`}
                  onMouseEnter={handleSortHover}
                  onMouseLeave={handleSortHover}/>
              </div>
            </div>

            <div className="flex flex-row justify-between py-8 space-x-8">
                <div className={`w-full rounded-xl p-6 flex flex-row items-center ${createHover ? "bg-primary-1-5 cursor-pointer" : "bg-primary-1-10"}`}
                  onMouseEnter={handleCreateHover}
                  onMouseLeave={handleCreateHover}>
                    {/* TODO: Click to display modal */}
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <IoMdAddCircle
                          className="fill-primary-1"
                          size={48}/>
                        <p className="mt-2 text-white text-md">Create Study Set</p>
                    </div>
                </div>

                <div className={`w-full bg-secondary-2 ${tutorialHover ? "bg-secondary-2-85 cursor-pointer" : "bg-secondary-2"} rounded-xl p-6`}
                  onMouseEnter={handleTutorialHover}
                  onMouseLeave={handleTutorialHover}
                >
                    {/* Will eventually be a thumbnail */}
                    <div className="w-full h-40 bg-secondary-1" />
                    
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