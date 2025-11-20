import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon missing in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export const TacticalMap: React.FC = () => {
    const position: [number, number] = [4.2105, 101.9758]; // Center of Malaysia

    return (
        <div className="w-full h-full min-h-[300px] rounded-md overflow-hidden border border-green-500/30 relative">
            <MapContainer
                center={position}
                zoom={6}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', background: '#000' }}
            >
                {/* Dark Matter Tile Layer for Cyberpunk look */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[3.1390, 101.6869]}>
                    <Popup>
                        KUALA LUMPUR // HQ <br /> STATUS: SECURE
                    </Popup>
                </Marker>
                <Marker position={[1.5533, 110.3592]}>
                    <Popup>
                        KUCHING // OUTPOST ALPHA <br /> STATUS: ONLINE
                    </Popup>
                </Marker>
                <Marker position={[5.9804, 116.0735]}>
                    <Popup>
                        KOTA KINABALU // NAVAL BASE <br /> STATUS: MONITORING
                    </Popup>
                </Marker>
            </MapContainer>

            {/* Overlay Grid */}
            <div className="absolute inset-0 pointer-events-none z-[1000] bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500 z-[1000]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500 z-[1000]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500 z-[1000]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500 z-[1000]" />
        </div>
    );
};
