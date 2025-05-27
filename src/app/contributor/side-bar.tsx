"use client";

import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { locations } from "./lib/locations";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedId: number | null;
};

export default function Sidebar({ open, onClose, selectedId }: Props) {
  const location = locations.find((loc) => loc.id === selectedId);

  return (
    <Drawer open={open} onClose={onClose} direction="left">
      <DrawerContent className="w-[300px] p-4 shadow-xl h-full">
        <DrawerTitle className="text-xl font-semibold">
          {location ? location.name : "Location Details"}
        </DrawerTitle>
        {location ? (
          <div>
            <p className="text-sm text-muted-foreground">
              Lat: {location.lat}, Lon: {location.lon}
            </p>
          </div>
        ) : (
          <p className="text-sm">Select a marker to see details</p>
        )}
      </DrawerContent>
    </Drawer>
  );
}
