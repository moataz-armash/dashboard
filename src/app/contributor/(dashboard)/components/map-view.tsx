"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locations } from "../lib/locations";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Address } from "../type";

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
  addresses: Address[];
};

export default function MapView({ onSelect, addresses }: Props) {
  return (
    <MapContainer
      center={[40.8, 30.4]}
      zoom={11}
      className="h-full z-0 rounded-r-2xl flex-1"
      style={{ position: "block" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {addresses.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          eventHandlers={{
            click: () => onSelect(+loc.id),
          }}
        >
          <Popup>{loc.district}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
