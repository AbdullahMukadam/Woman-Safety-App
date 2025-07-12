import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import BottomNav from "./Home/BottomNav";
import "../App.css"

// Fix marker icons issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const TrackMeMap = () => {
  const [currentPosition, setCurrentPosition] = useState([19.0760, 72.8777]); // Initial location
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const mapRef = useRef(null);

  const getIPBasedLocation = async () => {
    try {

      let response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('First IP API failed');

      const data = await response.json();
      if (data.latitude && data.longitude) {
        return {
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: 50000,
          method: 'ipapi'
        };
      }


      response = await fetch('https://ipwho.is/');
      if (!response.ok) throw new Error('Second IP API failed');

      const fallbackData = await response.json();
      return {
        latitude: fallbackData.latitude,
        longitude: fallbackData.longitude,
        accuracy: 50000,
        method: 'ipwhois'
      };
    } catch (error) {
      console.error('IP geolocation failed:', error);
      throw new Error('Could not determine approximate location from IP');
    }
  };

  const getLocation = async () => {

    if (navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            { enableHighAccuracy: true, timeout: 10000 }
          );
        });
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          method: 'gps'
        };
      } catch (gpsError) {
        console.log('GPS failed, falling back to IP:', gpsError);
      }
    }


    try {
      const ipLocation = await getIPBasedLocation();
      return ipLocation;
    } catch (ipError) {
      console.error('All location methods failed:', ipError);
      throw new Error('Could not determine your location');
    }
  };

  const handleTrackMe = async () => {

    if (!isTracking) {
      const location = await getLocation()
      const newLocation = [location.latitude, location.longitude]
      setCurrentPosition(newLocation);
      if (mapRef.current) {
        mapRef.current.setView(newLocation, 15);
      }
      setIsTracking(true);
    } else {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      setIsTracking(false);
      setWatchId(null);
    }
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <div className="flex flex-col h-[calc(100vh-76px)] relative">
      <div className="flex-1 p-4">
        <div className="flex flex-col h-full">
          <button
            onClick={handleTrackMe}
            className="w-full md:w-auto self-center mb-4 text-red-400 font-bold flex items-center justify-center gap-2 px-6 py-2.5 hover:bg-red-50 rounded-lg transition-all border-2 border-red-300"
          >
            {isTracking ? "Stop Tracking" : "Track Me"}
          </button>

          <div className="flex-1 relative rounded-lg overflow-hidden shadow-lg">
            <MapContainer
              center={currentPosition}
              zoom={15}
              className="h-full w-full"
              whenCreated={map => mapRef.current = map}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={currentPosition}>
                <Popup>You are here</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      <div className="w-full p-2 bg-white">
        <BottomNav />
      </div>
    </div>
  );
};

export default TrackMeMap;
