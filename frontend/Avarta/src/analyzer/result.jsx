import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, RotateCcw } from 'lucide-react';
import './reuslt.css';

const Results = ({ wasteType, onBack }) => {
  const [recyclingCenters, setRecyclingCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    findRecyclingCenters();
  }, [wasteType]);

  const findRecyclingCenters = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Get user location
      const location = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation not supported'));
          return;
        }
        
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true
        });
      });
      
      const userCoords = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
      setUserLocation(userCoords);
      
      // TODO: Replace with Google Maps Places API
      /*
      const mapsResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${userCoords.lat},${userCoords.lng}&` +
        `radius=5000&` +
        `keyword=recycling+center+${wasteType}&` +
        `key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      
      const data = await mapsResponse.json();
      */
      
      // Mock Google Maps API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockCenters = [
        {
          id: 1,
          name: "Green Recycling Center",
          address: "123 Eco Street, T Nagar, Chennai",
          distance: "2.3 km",
          phone: "+91 98765 43210",
          rating: 4.5,
          open_now: true,
          coordinates: { lat: 13.0418, lng: 80.2341 }
        },
        {
          id: 2,
          name: "Chennai Waste Management",
          address: "456 Recycle Road, Adyar, Chennai",
          distance: "4.1 km",
          phone: "+91 87654 32109",
          rating: 4.2,
          open_now: true,
          coordinates: { lat: 13.0067, lng: 80.2206 }
        },
        {
          id: 3,
          name: "Eco-Friendly Recycling Hub",
          address: "789 Green Avenue, Velachery, Chennai",
          distance: "5.7 km",
          phone: "+91 76543 21098",
          rating: 4.7,
          open_now: false,
          coordinates: { lat: 12.9698, lng: 80.2090 }
        }
      ].filter(center => 
        center.name.toLowerCase().includes(wasteType.toLowerCase()) ||
        wasteType === 'plastic' || wasteType === 'paper' || wasteType === 'metal'
      );
      
      setRecyclingCenters(mockCenters);
    } catch (err) {
      setError('Unable to find recycling centers. Please check your location permissions.');
      console.error('Location error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getDirections = (center) => {
    // TODO: Implement Google Maps directions
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.coordinates.lat},${center.coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  const callCenter = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  if (isLoading) {
    return (
      <div className="results-container">
        <div className="results-header">
          <button className="back-btn" onClick={onBack}>
            <RotateCcw size={24} />
          </button>
          <h2>Recycling Centers</h2>
          <div style={{ width: '40px' }}></div>
        </div>
        
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Finding recycling centers for {wasteType}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <button className="back-btn" onClick={onBack}>
          <RotateCcw size={24} />
        </button>
        <h2>Recycling Centers</h2>
        <div style={{ width: '40px' }}></div>
      </div>

      <div className="waste-type-badge">
        For: {wasteType.replace('_', ' ')}
      </div>

      {error ? (
        <div className="error-state">
          <p>{error}</p>
          <button className="retry-btn" onClick={findRecyclingCenters}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="results-info">
            <p>Found {recyclingCenters.length} centers near you</p>
          </div>

          <div className="centers-list">
            {recyclingCenters.map(center => (
              <div key={center.id} className="center-card">
                <div className="center-header">
                  <div className="center-name-rating">
                    <h3>{center.name}</h3>
                    <div className="rating">
                      ⭐ {center.rating}
                    </div>
                  </div>
                  <div className="distance-status">
                    <span className="distance">{center.distance}</span>
                    <span className={`status ${center.open_now ? 'open' : 'closed'}`}>
                      {center.open_now ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                </div>

                <div className="center-address">
                  <MapPin size={16} />
                  <span>{center.address}</span>
                </div>

                <div className="center-actions">
                  <button 
                    className="action-btn directions"
                    onClick={() => getDirections(center)}
                  >
                    <Navigation size={18} />
                    Directions
                  </button>
                  
                  <button 
                    className="action-btn call"
                    onClick={() => callCenter(center.phone)}
                  >
                    <Phone size={18} />
                    Call
                  </button>
                </div>
              </div>
            ))}
          </div>

          {recyclingCenters.length === 0 && (
            <div className="no-results">
              <p>No recycling centers found for {wasteType} in your area.</p>
              <p>Try expanding your search radius or contact local authorities.</p>
            </div>
          )}

          <div className="map-placeholder">
            <h4>Map View</h4>
            <p>Interactive map showing recycling center locations</p>
            <div className="placeholder-map">
              {/* TODO: Add Google Maps component */}
              <p>Google Maps Integration</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Results;