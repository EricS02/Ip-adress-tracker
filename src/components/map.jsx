import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from "leaflet"
// Component to update map view when coordinates change
function MapUpdater({ center }) {
    const map = useMap();

    useEffect(() => {
        console.log('MapUpdater: center changed to', center);
        if (center && center[0] && center[1]) {
            console.log('MapUpdater: setting map view to', center);
            map.setView(center, 13);
        }
    }, [center, map]);

    return null;
}

function MapComponent({ userGeolocation, searchGeolocation }) {
    // Default coordinates 
    const defaultCenter = [40.7128, -74.0060]; // New York coordinates (fixed from invalid coordinates)

    console.log('MapComponent received:', { userGeolocation, searchGeolocation });

    // Search location takes priority over user location
    const center = searchGeolocation && searchGeolocation.latitude && searchGeolocation.longitude
        ? [searchGeolocation.latitude, searchGeolocation.longitude]
        : userGeolocation && userGeolocation.latitude && userGeolocation.longitude
            ? [userGeolocation.latitude, userGeolocation.longitude]
            : defaultCenter;

    console.log('Map center calculated as:', center);

    // Use the new Figma location icon
    L.Marker.prototype.options.icon = L.icon({
        iconUrl: './icon-location-new.svg',
        iconSize: [45.78, 55.11],
        iconAnchor: [0, 0], // Center horizontally, bottom vertically
       
    });

    return (
        <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "calc(100vh - 280px)", width: "100%", zIndex: 1 }}
            className="relative"
        >
            <MapUpdater center={center} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {(searchGeolocation || userGeolocation) && (
                <Marker position={center} />
            )}
        </MapContainer>
    );
}

export default MapComponent;