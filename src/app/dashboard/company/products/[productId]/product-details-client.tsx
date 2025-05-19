"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackLink from "@/components/ui/back-link";
import { useProfileStore } from "../../profileStore";
import { useEffect, useRef, useState } from "react";
import { getImage, handleFileChange, handleImageClick } from "@/lib/helpers";
import { Product } from "../components/type";
import Image, { StaticImageData } from "next/image";
import { Upload } from "lucide-react";
import InputForm from "@/components/ui/input-form";
import { Label } from "@/components/ui/label";
import InputProduct from "./components/input-product";
import DropdownProduct from "./components/dropDown-product";
import { ProductCategories } from "./components/product-categories";
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

  const [previewImage, setPreviewImage] = useState<string | StaticImageData>(
    product?.images?.[0]
  );
  const profilePhoto = profile?.profilePhoto || "";
  const name = profile?.name || "";

  useEffect(() => {
    setPreviewImage(getImage(product?.images?.[0])!);
  }, [setPreviewImage, product]);

  const profilePhotoUrl = getImage(profilePhoto);
  const hasImage = product?.images?.[0] || previewImage;
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
