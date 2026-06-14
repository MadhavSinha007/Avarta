import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, RotateCcw, AlertCircle, Wrench, Star, Clock, Globe, Map } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './results.css';

// Fix default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const centerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Results = ({ wasteType, onBack, onSwitchToDIY, image }) => {
  const [recyclingCenters, setRecyclingCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState('');
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [radius, setRadius] = useState(5); // input value
  const [searchRadius, setSearchRadius] = useState(5); // applied value

  const wasteTypeNames = {
    battery: 'Battery',
    biological: 'Biological Waste',
    'brown-glass': 'Brown Glass',
    cardboard: 'Cardboard',
    clothes: 'Clothes',
    'green-glass': 'Green Glass',
    metal: 'Metal',
    paper: 'Paper',
    plastic: 'Plastic',
    shoes: 'Shoes',
    trash: 'General Trash',
    'white-glass': 'White Glass',
  };
  const displayName = wasteTypeNames[wasteType] || wasteType;

  useEffect(() => {
    getUserLocation()
      .then(coords => {
        setUserLocation(coords);
        fetchRecyclingCenters(coords, wasteType, searchRadius);
      })
      .catch(err => {
        console.error(err);
        setError('Location access denied. Unable to fetch nearby recycling centers.');
        setIsLoading(false);
      });
  }, [wasteType, searchRadius]);

  const getUserLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject(new Error('Geolocation not supported'));
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        reject,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });

  const fetchRecyclingCenters = async (coords, wasteType, radiusKm) => {
    setIsLoading(true);
    setError('');
    try {
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="recycling"](around:${radiusKm * 1000},${coords.lat},${coords.lng});
          way["amenity"="recycling"](around:${radiusKm * 1000},${coords.lat},${coords.lng});
          relation["amenity"="recycling"](around:${radiusKm * 1000},${coords.lat},${coords.lng});
        );
        out center;
      `;
      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      });
      if (!res.ok) throw new Error('Overpass API request failed');
      const data = await res.json();

      if (!data.elements || data.elements.length === 0) throw new Error('No results found');

      const transformed = data.elements
        .map((el, i) => {
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;
          if (!lat || !lon) return null;

          const tags = el.tags || {};
          let address = tags['addr:full'] || tags.name || tags.operator || 'Address not found';
          if (tags['addr:street']) {
            address = tags['addr:street'];
            if (tags['addr:housenumber']) address += ` ${tags['addr:housenumber']}`;
            if (tags['addr:city']) address += `, ${tags['addr:city']}`;
          }

          return {
            id: el.id || i,
            name: tags.name || 'Recycling Center',
            address,
            distance: calculateDistance(coords.lat, coords.lng, lat, lon),
            coordinates: { lat, lng: lon },
            rating: (3.5 + Math.random() * 1.5).toFixed(1),
            open_now: Math.random() > 0.3,
            phone: '+1-555-' + Math.floor(1000 + Math.random() * 9000),
          };
        })
        .filter(Boolean);

      setRecyclingCenters(transformed);
    } catch (err) {
      console.error('Error fetching from Overpass:', err);
      setError('No recycling centers found in this radius.');
      setRecyclingCenters([]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  };

  const handleSearch = () => {
    if (radius < 1 || isNaN(radius)) {
      alert('Please enter a valid radius (minimum 1 km).');
      return;
    }
    setSearchRadius(radius);
  };

  const openDirectionsOptions = center => {
    setSelectedCenter(center);
    setShowDirectionsModal(true);
  };

  const getDirections = provider => {
    if (!selectedCenter || !userLocation) return;
    const { lat, lng } = selectedCenter.coordinates;
    const { lat: uLat, lng: uLng } = userLocation;
    const urls = {
      osm: `https://www.openstreetmap.org/directions?engine=osrm_car&route=${uLat},${uLng};${lat},${lng}`,
      google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&origin=${uLat},${uLng}`,
      apple: `https://maps.apple.com/?daddr=${lat},${lng}&saddr=${uLat},${uLng}`,
      waze: `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    };
    window.open(urls[provider], '_blank');
    setShowDirectionsModal(false);
  };

  const DirectionsModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Get Directions</h3>
        <p>Choose your preferred navigation app:</p>
        <div className="direction-options">
          <button onClick={() => getDirections('osm')} className="direction-btn">
            <Globe size={16} /> OSM
          </button>
          <button onClick={() => getDirections('google')} className="direction-btn">
            <Map size={16} /> Google
          </button>
          <button onClick={() => getDirections('apple')} className="direction-btn">
            <MapPin size={16} /> Apple
          </button>
          <button onClick={() => getDirections('waze')} className="direction-btn">
            <Navigation size={16} /> Waze
          </button>
        </div>
        <button onClick={() => setShowDirectionsModal(false)} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="results-container">
        <div className="results-header">
          <button onClick={onBack} className="back-btn">
            <RotateCcw size={20} />
          </button>
          <h2>Recycling Centers</h2>
        </div>
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Loading recycling centers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <button onClick={onBack} className="back-btn">
          <RotateCcw size={20} />
        </button>
        <h2>Recycling Centers</h2>
      </div>

      {image && (
        <div className="image-section">
          <img src={image} alt="Analyzed waste" className="analyzed-image" />
          <div className="waste-type-badge">Recycling: {displayName}</div>
        </div>
      )}

      <div className="radius-controls">
        <div className="radius-input-group">
          <label>Search Radius (km):</label>
          <input
            type="number"
            value={radius}
            min="1"
            max="50"
            onChange={e => setRadius(Number(e.target.value))}
            className="radius-input"
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
        <div className="current-radius">Current search radius: {searchRadius} km</div>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {userLocation && recyclingCenters.length > 0 && (
        <div className="map-section">
          <h3>Nearby Locations</h3>
          <div className="recycling-map">
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={13}
              style={{ height: '300px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>Your Location</Popup>
              </Marker>
              {recyclingCenters.map(center => (
                <Marker key={center.id} position={[center.coordinates.lat, center.coordinates.lng]} icon={centerIcon}>
                  <Popup>
                    <strong>{center.name}</strong>
                    <br />
                    {center.address}
                    <br />
                    {center.distance} km away
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}

      <div className="centers-list">
        {recyclingCenters.map((center, i) => (
          <div key={center.id} className="center-card">
            <div className="center-header">
              <div className="center-name-rating">
                <div className="center-number">{i + 1}</div>
                <div>
                  <h3>{center.name}</h3>
                  <div className="rating">
                    <Star size={14} fill="currentColor" /> {center.rating}
                  </div>
                </div>
              </div>
              <div className="distance-status">
                <span className="distance">{center.distance} km</span>
                <div className={`status ${center.open_now ? 'open' : 'closed'}`}>
                  <Clock size={12} /> {center.open_now ? 'Open Now' : 'Closed'}
                </div>
              </div>
            </div>
            <div className="center-address">
              <MapPin size={16} /> {center.address}
            </div>
            <div className="center-actions">
              <button onClick={() => openDirectionsOptions(center)} className="action-btn directions">
                <Navigation size={16} /> Directions
              </button>
              <button onClick={() => window.location.href = `tel:${center.phone}`} className="action-btn call">
                <Phone size={16} /> Call
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="alternative-option">
        <p>Want to try something creative instead?</p>
        <button onClick={onSwitchToDIY} className="diy-option-btn">
          <Wrench size={18} /> Get DIY Ideas
        </button>
      </div>

      {showDirectionsModal && <DirectionsModal />}
    </div>
  );
};

export default Results;
