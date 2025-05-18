"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useProfileStore } from "../../profileStore";

import { getImage } from "@/lib/helpers";
import StoreForm from "./store-form";
import BackLink from "@/components/ui/back-link";

interface Store {
  id: string;
  name: string;
  storeCode: string;
  description: string;
  profilePicture: string | null;
  email: string;
  creationDate: string;
  phoneNumber: string;
  companyId: string;
  website: string;
  bankAccountId: string | null;
  socialMedia: Record<string, string>;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
  addressId: string;
}

export interface StoreCardProps {
  store: Store;
  token: string;
}

const StoreCard = ({ store, token }: StoreCardProps) => {
  const { profile } = useProfileStore();

  const [search, setSearch] = useState("");

  const profilePhoto = profile?.profilePhoto || "";
  const name = profile?.name || "";

  const profilePhotoUrl = getImage(profilePhoto);

  return (
    <>
      <main className="flex-1">
        <div className="flex justify-between items-center py-6 px-4">
          <BackLink link="/dashboard/company/stores" title="All Stores" />

          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Type the name of store..."
              className="border border-gray-300 rounded-3xl px-3 py-2 w-[70%] focus:outline-brand-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 items-center justify-center">
            <Avatar>
              <AvatarImage
                src={`${profilePhotoUrl || "https://github.com/shadcn.pn"} `}
                alt="admin profile"
              />
              <AvatarFallback>{name || ""}</AvatarFallback>
            </Avatar>
            <div className="ml-1 flex flex-col items-center">
              <p className="font-bold text-sm text-left w-full">{name || ""}</p>
              <p className="text-xs text-zinc-400">Admin</p>
            </div>
          </div>
        </div>
      </main>
      <StoreForm store={store} token={token} />
    </>
  );
};

export default StoreCard;
