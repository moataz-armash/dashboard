import { Search } from "lucide-react";
import Image from "next/image";
import A101 from "@/assets/a101.jpg";
import Badge from "@/components/ui/badge";

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
    img: A101,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Şok",
    country: "Kocaeli",
    district: "araplar",
    img: A101,
    status: "ACTIVE",
  },
];

export default async function HomePage() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter the name of Store ex: A101"
          className="w-full bg-slate-100 rounded-sm px-4 py-2 placeholder:text-gray-400 placeholder:text-sm focus:outline-purblebrand"
        />
        <Search
          className="absolute top-1/2 right-0
         transform -translate-y-1/2 bg-[#fc9076] shadow-[0px_0px_10px_1px_rgba(252,114,118,1)] text-white h-[95%] w-10 p-2 rounded-md text-xl cursor-pointer"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {storesAddress.map((storeAddress) => (
          <div
            key={storeAddress.id}
            className="flex rounded-2xl shadow-md bg-gray-100/50 flex-col gap-2 p-4"
          >
            <Image
              src={storeAddress.img}
              alt={storeAddress.name}
              className="rounded-2xl object-cover w-full h-24"
            />
            <div className="flex flex-col gap-1 pl-1">
              <h1 className="font-semibold font-mono">{storeAddress.name}</h1>
              <p className="text-gray-600 text-xs">
                {storeAddress.country}, {storeAddress.district}
              </p>

              <Badge
                status={storeAddress.status}
                text={storeAddress.status}
                className="text-[10px] w-fit"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
