import React, { useState, useEffect } from 'react';
import './result.css';

const Results = ({ wasteType }) => {
  const [recyclingCenters, setRecyclingCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (wasteType) {
      // Get user's location first
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            findRecyclingCenters(wasteType, {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            // Use a default location if geolocation fails
            const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York
            setUserLocation(defaultLocation);
            findRecyclingCenters(wasteType, defaultLocation);
          }
        );
      } else {
        // Geolocation not supported
        const defaultLocation = { lat: 40.7128, lng: -74.0060 };
        setUserLocation(defaultLocation);
        findRecyclingCenters(wasteType, defaultLocation);
      }
    }
  }, [wasteType]);

  const findRecyclingCenters = async (material, location) => {
    setIsLoading(true);
    
    // TODO: Replace with actual Google Maps API integration
    // For now, we'll use mock data
    setTimeout(() => {
      const mockCenters = [
        {
          name: "Green Recycling Center",
          address: "123 Eco Street, Green City",
          distance: "1.2 miles",
          hours: "9AM-5PM Mon-Sat",
          accepts: ["plastic", "paper", "metal"]
        },
        {
          name: "Eco Waste Solutions",
          address: "456 Environment Ave, Green City",
          distance: "2.5 miles",
          hours: "8AM-4PM Tue-Sat",
          accepts: ["plastic", "glass"]
        },
        {
          name: "Community Recycling Point",
          address: "789 Recycle Road, Green City",
          distance: "3.1 miles",
          hours: "10AM-6PM Wed-Sun",
          accepts: ["paper", "cardboard", "metal"]
        }
      ].filter(center => center.accepts.includes(material));
      
      setRecyclingCenters(mockCenters);
      setIsLoading(false);
    }, 1500);
  };

  if (!wasteType) {
    return (
      <div className="results-container">
        <h3>Recycling Centers</h3>
        <p>Analyze an item first to find recycling centers</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h3>Recycling Centers for {wasteType}</h3>
      
      {isLoading ? (
        <div className="loading">Finding nearby recycling centers...</div>
      ) : (
        <div className="centers-list">
          {recyclingCenters.length > 0 ? (
            recyclingCenters.map((center, index) => (
              <div key={index} className="center-card">
                <h4>{center.name}</h4>
                <p>{center.address}</p>
                <div className="center-details">
                  <span className="distance">{center.distance} away</span>
                  <span className="hours">{center.hours}</span>
                </div>
                <button className="directions-btn">Get Directions</button>
              </div>
            ))
          ) : (
            <p>No recycling centers found for {wasteType} in your area.</p>
          )}
        </div>
      )}
      
      {/* TODO: Add actual map integration here */}
      <div className="map-placeholder">
        <p>Map would be displayed here with markers for recycling centers</p>
      </div>
    </div>
  );
};

export default Results;