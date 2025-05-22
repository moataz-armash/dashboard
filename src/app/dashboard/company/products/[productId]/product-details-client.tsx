"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackLink from "@/components/ui/back-link";
import { useProfileStore } from "../../profileStore";
import { useState } from "react";
import { getImage } from "@/lib/helpers";
import { Product } from "../components/type";
import ProductForm from "./components/product-form";

export default function ProductDetailsClient({
  product,
  token,
}: {
  product: Product;
  token: string;
}) {
  const { profile } = useProfileStore();

  const [search, setSearch] = useState("");

  const profilePhoto = profile?.profilePhoto || "";
  const name = profile?.name || "";

  const profilePhotoUrl = getImage(profilePhoto);

  console.log(product);
  return (
    <>
      <main className="flex-1">
        <div className="flex justify-between items-center py-6 px-4">
          <BackLink link="/dashboard/company/products" title="All Products" />
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
      <ProductForm product={product} token={token} />
    </>
  );
}
