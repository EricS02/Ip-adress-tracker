import React from 'react'

const IpAddress = ({ error, userIpData, loading }) => {

    if (loading) {
        return (
            <div className='absolute top-[150px] left-1/2 transform -translate-x-1/2 z-20'>
                <div className='bg-figma-white rounded-15 shadow-figma px-6 py-8 w-[327px] md:w-[555px] lg:w-[1111px]'>
                    <div className='flex items-center justify-center space-x-3'>
                        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-figma-gray-950'></div>
                        <p className='text-figma-gray-950 text-18'>Loading location data...</p>
                    </div>
                </div>
            </div>
        )
    }


    if (error) {
        return (
            <div className="absolute top-[150px] left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-figma-white rounded-15 shadow-figma px-6 py-8 w-[327px] md:w-[555px] lg:w-[1111px] flex items-center justify-center">
                    <p className="text-red-500 text-18">Error: {error}</p>
                </div>
            </div>
        );
    }

    let displayData;

    // Search results take priority over user location
    if (userIpData?.type === "search") {
        displayData = userIpData
    } else if (userIpData?.type === "user") {
        displayData = userIpData
    } else {
        displayData = {
            ip: "No Data",
            location: "No Data",
            timezone: "No Data",
            isp: "No Data"
        }
        
    }

    return (
        <div className="absolute top-32 md:top-52 left-1/2 transform -translate-x-1/2 z-20 ">
            <div className="bg-white rounded-2xl md:px-10 py-6 xs:w-[327px] xs:h-[288px] sm:w-[327px] sm:h-[288px] md:w-[555px] md:h-[192px] lg:w-[1111px] lg:h-[145px] xl:w-[1111px] xl:h-[145px] shadow-lg min-w-[279px] max-h-[288px] ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 ">
                    <div className="pb-2 sm:pb-0">
                        <div className="flex flex-col justify-center">
                            <p className="text-gray-500 text-center sm:text-left text-xs md:text-sm font-medium mb-0.5 md:mb-2">IP ADDRESS</p>
                            <p className="text-black text-center sm:text-left text-lg md:text-xl lg:text-2xl font-medium break-words">{displayData.ip}</p>
                        </div>
                    </div>

                    <div className="sm:border-r border-gray-200 pb-2 sm:pb-0">
                        <div className="flex flex-col justify-center">
                            <p className="text-gray-500 text-center sm:text-left text-xs md:text-sm font-medium mb-0.5 md:mb-2">LOCATION</p>
                            <p className="text-black text-center sm:text-left text-lg md:text-xl lg:text-2xl font-medium break-words">
                                {displayData.location}
                            </p>
                        </div>
                    </div>

                    <div className="sm:border-r border-gray-200 pb-2 sm:pb-0">
                        <div className="flex flex-col justify-center">
                            <p className="text-gray-500 text-center sm:text-left text-xs md:text-sm font-medium mb-0.5 md:mb-2">TIMEZONE</p>
                            <p className="text-black text-center sm:text-left text-lg md:text-xl lg:text-2xl font-medium break-words">{displayData.timezone}</p>
                        </div>
                    </div>

                    <div className="pb-2 sm:pb-0">
                        <div className="flex flex-col justify-center">
                            <p className="text-gray-500 text-center sm:text-left text-xs md:text-sm font-medium mb-0.5 md:mb-2">ISP</p>
                            <p className="text-black text-center sm:text-left text-lg md:text-xl lg:text-2xl font-medium break-words">{displayData.isp}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IpAddress