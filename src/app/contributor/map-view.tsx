"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locations } from "./lib/locations";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default icon path issue with bundlers
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type Props = {
  onSelect: (id: number) => void;
};

export default function MapView({ onSelect }: Props) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      className="h-full w-full z-0 rounded-r-2xl flex-1"
      style={{ position: "block" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lon]}
          eventHandlers={{
            click: () => onSelect(loc.id),
          }}
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
