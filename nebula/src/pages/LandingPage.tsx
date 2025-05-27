
const LandingPage = () => {
    return(
        <div className="w-screen h-screen text-white bg-secondary-1 flex flex-col p-8 overflow-y-hidden">
            
            
            <p className="p-2 text-xl font-semibold">Select Study Set</p>

            <div className="flex flex-row justify-between py-8 space-x-8">
                <div className="w-full bg-secondary-2 rounded-xl p-6">
                    <div>
                        <div>

                        </div>
                    </div>
                </div>

                <div className="w-full bg-secondary-2 rounded-xl p-6">
                    {/* purple bar spans 100% of parent (which is now full-width minus the p-6 padding) */}
                    <div className="w-full h-40 bg-secondary-1" />
                    
                    {/* your copy */}
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