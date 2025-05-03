import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Info from "./components/Info";
import Map from "./components/Map";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "./App.css";

const IPAddress = () => {
  const [ipAddress, setIpAddress] = useState("Detecting...");
  const [location, setLocation] = useState("Detecting...");
  const [timezone, setTimezone] = useState("Detecting...");
  const [isp, setIsp] = useState("Detecting...");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "false" ? false : true;
  });

  useEffect(() => {
    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(darkMode ? "dark-mode" : "light-mode");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const fetchIpInfoFromCoords = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const geoData = response.data;

      const ipRes = await axios.get("https://api64.ipify.org?format=json");
      const ip = ipRes.data.ip;
  
      const ispRes = await axios.get(`https://ipapi.co/${ip}/org/`);
      const isp = ispRes.data ? ispRes.data : "ISP not found"; 
  
      setIpAddress(ip);
      setLocation(`${geoData.city}, ${geoData.countryName}`);
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      setIsp(isp); 
      setCoordinates({ lat, lng });
    } catch (error) {
      console.error("Geo reverse lookup failed:", error);
      setIsp("ISP not found"); 
    }
  };
  

  const fetchIpLocation = async (ip = "") => {
    try {
      const apiKey = import.meta.env.VITE_GEO_API_KEY;
      const baseUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
      const url = ip ? `${baseUrl}&ipAddress=${ip}` : baseUrl;

      const response = await axios.get(url);
      const data = response.data;

      setIpAddress(data.ip || "IP not found");
      setLocation(`${data.location.city}, ${data.location.country} ${data.location.postalCode}`);
      setTimezone(`UTC ${data.location.timezone}`);
      setIsp(data.isp || "ISP not found");
      setCoordinates({ lat: data.location.lat, lng: data.location.lng });
    } catch (error) {
      console.error("IP-based location failed:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchIpInfoFromCoords(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchIpLocation();
        }
        
      );
    } else {
      console.warn("Geolocation not supported. Using IP-based fallback.");
      fetchIpLocation();
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="search-container flex items-center justify-between p-3">
        <Search fetchLocation={fetchIpLocation} />
        <button className="toggle-button" onClick={toggleDarkMode}>
          {darkMode ? <MdLightMode size={28} /> : <MdDarkMode size={28} />}
        </button>
      </div>

      <Info
        ipAddress={ipAddress}
        location={location}
        timezone={timezone}
        isp={isp}
        latitude={coordinates.lat}
        longitude={coordinates.lng}
      />
      <Map coordinates={coordinates} />
    </div>
  );
};

export default IPAddress;
