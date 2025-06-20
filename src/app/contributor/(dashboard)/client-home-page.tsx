"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import Badge from "@/components/ui/badge";
import { ClientHomePageProps } from "./type";
import { getImage } from "@/lib/helpers";
import dynamic from "next/dynamic";
import { defaultStoreImg } from "@/lib/constants";
import Pagination from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

const MapView = dynamic(() => import("./components/map-view"), { ssr: false });

export default function ClientHomePage({
  stores,
  response,
  currentPage,
}: ClientHomePageProps) {
  const router = useRouter();

  const totalPages = Math.ceil(stores?.total / stores?.size) || 1;

  const uniqueAddresses = response?.data.filter(
    (address, index, self) =>
      index ===
      self.findIndex((a) => a.lat === address.lat && a.lng === address.lng)
  );

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(newPage));
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col p-6 gap-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter the name of Store ex: A101"
            className="w-full bg-slate-100 rounded-md px-4 py-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-orangebrand shadow-lg"
          />
          <Search
            className="absolute top-1/2 right-0
         transform -translate-y-1/2 bg-orangebrand shadow-[0px_0px_10px_1px_rgba(252,114,118,1)] text-white h-full w-10 p-2 rounded-md text-xl cursor-pointer"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          {stores.data.map((store) => (
            <div
              key={store.id}
              className="flex rounded-2xl shadow-md bg-gray-100/50 flex-col gap-2 p-4 cursor-pointer"
              onClick={() => router.push(`/contributor/${store.id}`)}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <MapView addresses={uniqueAddresses} />
    </div>
  );
}
