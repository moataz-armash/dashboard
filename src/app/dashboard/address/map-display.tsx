import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

export default function MapDispaly({
  LocationMarker,
  mapCenter,
}: {
  LocationMarker: React.FC;
  mapCenter: { lng: number; lat: number };
}) {
  return (
    <div className="col-span-2">
      <Label>Pin Location</Label>
      <MapContainer
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <LocationMarker />

        <ChangeCenter position={mapCenter} />
      </MapContainer>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Submit Address
      </Button>
    </div>
  );
}

function ChangeCenter({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}
