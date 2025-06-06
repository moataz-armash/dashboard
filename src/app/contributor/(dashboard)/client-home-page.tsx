"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import A101 from "@/assets/a101.jpg";
import Bim from "@/assets/Bim_(company)_logo.svg.png";
import Sok from "@/assets/sok_market.png";
import Badge from "@/components/ui/badge";
import { ClientHomePageProps, Stores } from "./type";
import { getImage } from "@/lib/helpers";
import dynamic from "next/dynamic";
import { useState } from "react";
import { defaultStoreImg } from "@/lib/constants";

const MapView = dynamic(() => import("./components/map-view"), { ssr: false });

const storesAddress = [
  {
    id: 1,
    name: "A101",
    country: "Sakarya",
    district: "serdivan",
    img: A101,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Bim",
    country: "İstanbul",
    district: "zeytinburnu",
    img: Bim,
    status: "DELETED",
  },
  {
    id: 3,
    name: "Şok",
    country: "Kocaeli",
    district: "izmit",
    img: Sok,
    status: "INACTIVE",
  },
];

export default function ClientHomePage({
  stores,
  addresses,
}: ClientHomePageProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalPages = Math.ceil(addresses?.total / addresses?.size) || 1;

  const handleSelectLocation = (id: number) => {
    setSelectedId(id);
    setIsSidebarOpen(true);
  };
  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col p-6 gap-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter the name of Store ex: A101"
            className="w-full bg-slate-100 rounded-sm px-4 py-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-purblebrand shadow-lg"
          />
          <Search
            className="absolute top-1/2 right-0
         transform -translate-y-1/2 bg-orangebrand shadow-[0px_0px_10px_1px_rgba(252,114,118,1)] text-white h-full w-10 p-2 rounded-md text-xl cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="flex rounded-2xl shadow-md bg-gray-100/50 flex-col gap-2 p-4"
            >
              <Image
                src={getImage(store.profilePicture) || defaultStoreImg}
                alt={store.name}
                className="rounded-2xl object-cover w-full h-16"
                width={300}
                height={64}
                priority
              />
              <div className="flex flex-col gap-1 pl-1">
                <h1 className="font-semibold font-mono">{store.name}</h1>

                <Badge
                  status={store.status}
                  text={store.status}
                  className="text-[10px] w-fit"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <MapView onSelect={handleSelectLocation} addresses={addresses} />
    </div>
  );
}
