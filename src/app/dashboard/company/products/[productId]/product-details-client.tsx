"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackLink from "@/components/ui/back-link";
import { useProfileStore } from "../../profileStore";
import { useRef, useState } from "react";
import { getImage, handleFileChange, handleImageClick } from "@/lib/helpers";
import { Product } from "../components/type";
import Image, { StaticImageData } from "next/image";
import { Upload } from "lucide-react";

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const { profile } = useProfileStore();

  const [search, setSearch] = useState("");

  const [previewImage, setPreviewImage] = useState<string | StaticImageData>(
    product?.images?.[0]
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profilePhoto = profile?.profilePhoto || "";
  const name = profile?.name || "";

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
      {/* <StoreForm store={store} token={token} /> */}
      <div className="grid grid-cols-5 w-full p-6 space-x-3">
        <div className="col-span-3 bg-gray-100 p-4 flex flex-col gap-3 rounded-xl">
          <h5 className="font-semibold font-sans">General Information</h5>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              Name Prodcut
            </label>
            <input
              type="text"
              name=""
              className="bg-gray-200 px-2 py-3 rounded-xl text-gray-900 placeholder:text-gray-400"
              placeholder="Peynir"
              defaultValue={product?.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              Description Product
            </label>
            <textarea
              name=""
              id=""
              placeholder="Beyaz keçi süt peryniri"
              className="text-gray-500 bg-gray-200 px-2 py-3 rounded-xl placeholder:text-gray-400"
              defaultValue={product?.description}
            ></textarea>
          </div>
        </div>
        <div className="col-span-2  bg-gray-100 p-4 flex flex-col gap-3 rounded-xl">
          <h5 className="font-semibold font-sans">Upload Img</h5>
          <div className="flex flex-col gap-1 mt-5 items-center">
            <div
              className="relative group hover:cursor-pointer w-[90%] h-52 flex items-center justify-center bg-transparent rounded-lg"
              onClick={() => {
                if (!hasImage) handleImageClick(fileInputRef);
                else {
                  return;
                }
              }}
            >
              {hasImage ? (
                <Image
                  src={previewImage}
                  alt={`${name} || Avatar`}
                  fill
                  style={{ aspectRatio: "96/96", objectFit: "cover" }}
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gray-300 opacity-40 group-hover:opacity-40 group-hover:bg-gray-950 rounded-lg transition-opacity duration-200"></div>
                  <Upload className="absolute inset-0 m-auto w-8 h-8 text-gray-500 opacity-100 group-hover:opacity-100 group-hover:text-white transition-opacity duration-200 pointer-events-none" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="images"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setPreviewImage)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
