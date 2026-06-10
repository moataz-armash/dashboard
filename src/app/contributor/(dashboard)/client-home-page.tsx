"use client";
import { Search, Store } from "lucide-react";
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

  // apiRequest returns the raw JSON — handle both flat {data:[]} and nested {data:{data:[]}} shapes
  const rawData = stores?.data;
  const storeList: any[] = Array.isArray(rawData) ? rawData : (rawData?.data ?? []);
  const totalPages = rawData?.totalPages || stores?.totalPages || 1;

  const uniqueAddresses = (response?.data ?? []).filter(
    (address: any, index: number, self: any[]) =>
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
        {storeList.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-16 text-center">
            <Store className="w-12 h-12 text-gray-300 mb-4" />
            <h2 className="text-base font-semibold text-gray-700">No stores around yet</h2>
            <p className="text-sm text-gray-400 mt-1 max-w-xs">
              Stores will appear here once they&apos;re available in your area.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              {storeList.map((store) => (
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
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-2">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <MapView addresses={uniqueAddresses ?? []} />
    </div>
  );
}
