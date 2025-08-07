import './App.css';

import MapComponent from './components/map.jsx';
import IpAddress from './components/ip-address.jsx';

import { useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  const [userGeolocation, setUserGeolocation] = useState(null)
  const [searchGeolocation, setSearchGeolocation] = useState(null)
  const [userIpData, setUserIpData] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  const fetchUserIpData = async () => {
    try {
      const response = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_1ft7vx9dUY4eF9m34x5orKwNBfdMk')
      const data = await response.json()
      
      console.log('API Response:', data); // Debug log

      setUserIpData({
        type: "user",
        ip: data.ip,
        location: data.location?.city && data.location?.region 
          ? `${data.location.city}, ${data.location.region}${data.location.postalCode ? `, ${data.location.postalCode}` : ''}`
          : 'Location not available',
        timezone: data.location?.timezone || 'Timezone not available',
        isp: data.isp || 'ISP not available'
      })
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const searchIpAddress = async (searchInput) => {
    console.log('Searching for:', searchInput);
    setIsLoading(true)
    setError(null)

    try {
      // Use the correct ipify endpoint that returns coordinates
      const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.secret_key}&ipAddress=${searchInput}`)
      const data = await response.json()
      
      console.log('Search API Response:', data); // Debug log

      setUserIpData({
        type: "search",
        ip: data.ip,
        location: data.location?.city && data.location?.region 
          ? `${data.location.city}, ${data.location.region}${data.location.postalCode ? `, ${data.location.postalCode}` : ''}`
          : 'Location not available',
        timezone: data.location?.timezone || 'Timezone not available',
        isp: data.isp || 'ISP not available',
        searchInput: searchInput
      })
      
      // Update map location based on search results
      console.log('Location data from API:', data.location);
      if (data.location?.lat && data.location?.lng) {
        console.log('Setting search geolocation:', { lat: data.location.lat, lng: data.location.lng });
        setSearchGeolocation({
          latitude: data.location.lat,
          longitude: data.location.lng
        })
      } else {
        console.log('No lat/lng found in location data');
        // Fallback: try to get coordinates from a different API if ipify doesn't provide them
        console.log('Attempting to get coordinates from alternative source...');
      }
      
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  const handleSearchClick = () => {
    if(searchInput.trim()) {
      searchIpAddress(searchInput.trim())
    }
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      console.log("enter button clicked")
      handleSearchClick();
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setIsLoading(false)
      return
    }

    const successCallBack = (position) => {
      setUserGeolocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      })
      setIsLoading(false)
    }

    fetchUserIpData();

    const errorCallBack = (error) => {
      setError("Unable to retrive location")
      setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack)

  }, []);

  return (
    <div className="min-h-screen font-rubik relative overflow-x-hidden">
      <header className="flex flex-col items-center">

        <div className="relative w-full">
          <img src="./pattern-bg-desktop.png" alt="pattern-bg-desktop" className="w-full h-[280px] object-cover z-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-14 z-30 px-4">
            <h1 className="hidden sm:block text-white text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              IP Address Tracker
            </h1>
            <div className= "flex shadow-lg sm:shadow-none w-full max-w-[327px] sm:max-w-md md:max-w-lg lg:max-w-xl">
              <input
                onChange={(e) => {
                  console.log('Typing:', e.target.value);
                  setSearchInput(e.target.value);
                }}
                value={searchInput}
                onKeyDown={handleEnter}
                className="bg-white rounded-l-2xl h-auto py-3 md:py-4 px-4 md:px-6 placeholder:text-gray-500 text-sm md:text-lg flex-1"
                placeholder="Search for any IP address or domain"
              />
              <button 
                onClick={() => {
                  console.log("button clicked")
                  handleSearchClick()
                }}
                className="font-bold bg-black rounded-r-2xl h-auto py-3 md:py-4 px-4 md:px-6 text-white hover:bg-gray-800 transition-colors"
              >
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2L12 12L2 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="relative z-0">
        <MapComponent userGeolocation={userGeolocation} searchGeolocation={searchGeolocation}/>
      </div>
      <IpAddress error={error} loading={isLoading} userIpData={userIpData} userGeolocation={userGeolocation} />
    </div>
  );
}

export default App;
