import { Search } from "lucide-react";
import Image from "next/image";
import A101 from "@/assets/a101.jpg";

const addresses = [
  { id: 1, name: "A101", country: "Sakarya", district: "serdivan", img: A101 },
  {
    id: 2,
    name: "Bim",
    country: "İstanbul",
    district: "zeytinburnu",
    img: A101,
  },
  { id: 3, name: "Şok", country: "Kocaeli", district: "araplar", img: A101 },
];

export default async function HomePage() {
  return (
    <div className="flex flex-col p-6 gap-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter the name of Store ex: A101"
          className="w-full bg-slate-100 rounded-sm px-2 py-2 placeholder:text-gray-400 focus:outline-purblebrand"
        />
        <Search
          className="absolute top-1/2 right-0
         transform -translate-y-1/2 bg-purblebrand text-white h-10 w-10 p-2 rounded-sm text-xl cursor-pointer"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {addresses.map((address) => (
          <div key={address.id} className="flex rounded-xl flex-col gap-2">
            <Image
              src={address.img}
              alt={address.name}
              className="rounded-xl object-cover w-full h-24"
            />
            <div>
              <h1 className="font-semibold">{address.name}</h1>
              <p className="text-gray-600 text-xs">
                {address.country}, {address.district}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
