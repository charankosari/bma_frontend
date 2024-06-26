/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import Main from "./Main";
import Highlight from "./Highlight";
import Login from "./Login";
import logo from "../assets/Logo.png";
import { FaLocationDot } from "react-icons/fa6";
// import { HiLocationMarker } from "react-icons/hi";

function NewNavbar() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [areaName, setAreaName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(
    localStorage.getItem("selectedLocation") || ""
  );

  useEffect(() => {
    if (selectedLocation && selectedLocation !== "Current Location") {
      setAreaName(selectedLocation);
    } else if (selectedLocation === "Current Location" && currentLocation) {
      fetchAreaName(currentLocation.latitude, currentLocation.longitude);
    }
  }, [selectedLocation, currentLocation]);

  const handleSelectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          console.log("Current Location: ", { latitude, longitude });
          fetchAreaName(latitude, longitude);
          // Set selected location and store it in local storage
          setSelectedLocation("Current Location");
          localStorage.setItem("selectedLocation", "Current Location");
          // Close the dropdown
          document.getElementById("dropdown").classList.remove("active");
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchAreaName = async (latitude, longitude) => {
    const apiKey = "5938214220714bcc8b8391bf94346dfc"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const components = data.results[0].components;
        const area =
          components.neighbourhood ||
          components.suburb ||
          components.village ||
          "Unknown";
        // Update area name
        setAreaName(area);
        // Update selected location and store it in local storage
        setSelectedLocation(area);
        localStorage.setItem("selectedLocation", area);
      } else {
        console.error("No results found");
      }
    } catch (error) {
      console.error("Error fetching area name: ", error);
    }
  };

  const handleCitySelect = (city) => {
    setAreaName(city);
    setSelectedLocation(city); // Set selected location
    localStorage.setItem("selectedLocation", city); // Store in local storage
    // Close the dropdown
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.remove("active");
  };

  const [showLoginBox, setShowLoginBox] = useState(false);
  const loginBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginBoxRef.current && !loginBoxRef.current.contains(event.target)) {
        setShowLoginBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLoginBox = () => {
    setShowLoginBox(!showLoginBox);
  };

  return (
    <div className="bg-white">
      <div className="navbar bg-[#333333] relative w-auto flex items-center justify-between lg:py-1 xs:py-0 pl-0 pr-2">
        <div className="flex-grow relative">
          <img
            src={logo}
            alt="Logo"
            className="lg:w-[70px]  lg:h-[70px]  xs:w-[50px]  xs:h-[50px]"
          />
          <FaSearch className="absolute lg:top-6 lg:left-20 xs:top-4.5 xs:left-14 xs:text-sm lg:text-xl text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="input focus:outline-none lg:pl-10 xs:h-10 lg:h-12 xs:pl-6 w-full text-black bg-white"
          />
          <div
            className="dropdown lg:ml-6 xs:mx-0 xs:text-lg lg:text-3xl lg:mr-6"
            id="dropdown"
          >
            <div
              tabIndex={0}
              role="button"
              className="btn bg-[#333333] text-white xs:text-xs xs:px-0.5 hover:bg-[#333333] border-none xs:flex-nowrap lg:flex-nowrap"
              onClick={() => {
                document.getElementById("dropdown").classList.toggle("active");
              }}
            >
              <FaLocationDot className="lg:text-2xl xs:text-lg" />
              {selectedLocation || "Select location"}
              <FaChevronDown className="mt-1 lg:text-lg" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-[#333333]  z-[1] menu p-2 shadow text-white w-auto"
            >
              <li>
                <a onClick={handleSelectCurrentLocation}>
                  Select Current Location
                </a>
              </li>
              <li>
                <a onClick={() => handleCitySelect("Gachibowli")}>Gachibowli</a>
              </li>
              <li>
                <a onClick={() => handleCitySelect("Banjara Hills")}>
                  Banjara Hills
                </a>
              </li>
              <li>
                <a onClick={() => handleCitySelect("Jubilee Hills")}>
                  Jubilee Hills
                </a>
              </li>
              <li>
                <a onClick={() => handleCitySelect("Hitech City")}>
                  Hitech City
                </a>
              </li>
              <li>
                <a onClick={() => handleCitySelect("Secunderabad")}>
                  Secunderabad
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-none gap-2">
          <button
            onClick={toggleLoginBox}
            className="btn border-none text-white rounded-3xl bg-[#2BB673] hover:bg-[#2BB673]"
          >
            Login
          </button>
        </div>
        {showLoginBox && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 pointer-events-auto">
            {/* Overlay to disable interactions with content below */}
            {/* Login/signup box */}
            <div
              ref={loginBoxRef}
              className="bg-white py-6 px-10 rounded-2xl shadow-lg relative z-50"
            >
              {/* Render the Login component here */}
              <Login />
            </div>
          </div>
        )}
      </div>
      <div
        className={
          showLoginBox ? "opacity-5 xs:opacity-0 pointer-events-none" : ""
        }
      >
        <Highlight />
        <Main />
      </div>
    </div>
  );
}

export default NewNavbar;
