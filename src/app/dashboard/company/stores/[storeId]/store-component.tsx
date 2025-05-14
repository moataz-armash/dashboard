"use client";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  TicketPercent,
  PackageCheck,
  Shapes,
  Upload,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useProfileStore } from "../../profileStore";
import CardItem from "./card-item";
import InputForm from "@/components/ui/input-form";
import Image, { StaticImageData } from "next/image";
import userProfile from "@/assets/userprofile.jpg";
import Spinner from "@/components/ui/spinner";
import {
  handleFileChange,
  getImage,
  handleImageClick,
  SubmitEntityUpdate,
} from "@/lib/helpers";
import toast from "react-hot-toast";

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

interface StoreCardProps {
  store: Store;
  token: string;
}

const fields = [
  "name",
  "storeCode",
  "description",
  "email",
  "phoneNumber",
  "website",
  "status",
];

const entityDefaults = {
  socialMedia: {},
  addressId: "",
};

const StoreCard = ({ store, token }: StoreCardProps) => {
  const { profile } = useProfileStore();
  const {
    profilePicture: storePhoto,
    name: storeName,
    storeCode,
    description,
    email,
    phoneNumber,
    website,
    socialMedia,
    status,
    addressId,
    creationDate,
    companyId,
    bankAccountId,
  } = store;
  const storePhotoUrl = getImage(storePhoto);
  console.log(storePhotoUrl);

  const [search, setSearch] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | StaticImageData>(
    storePhotoUrl || userProfile
  );
  const [isLoading, setIsLoading] = useState(false);

  const endpoint = `/store/${store.id}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await SubmitEntityUpdate({
      formRef,
      fileInputRef,
      fields,
      entityDefaults,
      endpoint,
      token,
      fileFallbackUrl: storePhotoUrl,
      setIsLoading,
      onSuccess: () => {
        toast.success("Store profile updated successful");
        setTimeout(() => {
          document.location.reload();
        }, 1500);
      },
      onError: () => toast.error("Update failed"),
      updateRequest: "updateStoreRequest",
    });
  };

  const profilePhoto = profile?.profilePhoto || "";
  const name = profile?.name || "";

  const profilePhotoUrl = getImage(profilePhoto);

  return (
    <>
      <main className="flex-1">
        <div className="flex justify-between items-center py-6 px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/company/stores"
              className="border bg-card text-card-foreground p-2 rounded-2xl shadow-md cursor-pointer"
            >
              <ArrowLeft />
            </Link>
            <h1 className="text-xl font-bold text-left w-full">
              {storeName.toUpperCase()}
            </h1>
          </div>
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
      <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-4 gap-4 px-4 py-2">
          <CardItem
            title="All Products"
            number={120}
            bgColor="bg-[#6366f1]"
            icon={<ShoppingCart className="text-white" />}
          />
          <CardItem
            title="Reorder Level"
            number={15}
            bgColor="bg-[#a855f7]"
            icon={<PackageCheck className="text-white" />}
          />
          <CardItem
            title="Products On Discount"
            number={46}
            bgColor="bg-[#14b8a6]"
            icon={<TicketPercent className="text-white" />}
          />
          <CardItem
            title="Categories"
            number={24}
            bgColor="bg-[#eab308]"
            icon={<Shapes className="text-white" />}
          />
        </div>
        <div className="grid grid-cols-4 px-4 py-2 grid-rows-2 gap-4">
          <Card className="col-span-1 row-span-full p-4 rounded-2xl shadow-md h-full flex items-center justify-center">
            {previewImage ? (
              <div className="flex flex-col gap-1 mt-5 items-center">
                <div
                  className="relative group hover:cursor-pointer w-24 h-24 flex items-center justify-center"
                  onClick={() => handleImageClick(fileInputRef)}
                >
                  <Image
                    src={previewImage}
                    alt={`${storeName} || Avatar`}
                    width={96}
                    height={96}
                    className="rounded-full"
                    style={{ aspectRatio: "96/96", objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gray-950 opacity-0 group-hover:opacity-40 rounded-full transition-opacity duration-200"></div>
                  <Upload className="absolute inset-0 m-auto w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="storePhoto"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setPreviewImage)}
                  />
                </div>
                <div className="ml-1 flex flex-col items-center">
                  <p className="font-bold text-xl mt-3 text-left w-full">
                    {storeName}
                  </p>
                  <p className="text-xs text-zinc-400">{status}</p>
                </div>
              </div>
            ) : (
              <Spinner className="h-24 w-24 text-gray-500" />
            )}
          </Card>
          <div className="grid col-span-3 row-span-2 grid-rows-2 gap-4">
            <Card className="rounded-2xl shadow-md p-4 flex flex-col gap-3 justify-center">
              <div className="grid grid-cols-2">
                <InputForm
                  title="Name"
                  name="name"
                  state={null}
                  text="text-left"
                  defaultValue={storeName}
                />
                <InputForm
                  title="Store Code"
                  name="storeCode"
                  state={null}
                  text="text-left"
                  defaultValue={storeCode}
                />
              </div>
              <div className="grid grid-cols-2">
                <InputForm
                  title="Description"
                  name="description"
                  state={null}
                  text="text-left"
                  defaultValue={description}
                />
                <InputForm
                  title="Email"
                  name="email"
                  state={null}
                  text="text-left"
                  defaultValue={email}
                />
              </div>
              <div className="grid grid-cols-2 ">
                <InputForm
                  title="Phone Number"
                  name="phoneNumber"
                  state={null}
                  text="text-left"
                  defaultValue={phoneNumber}
                />
                <InputForm
                  title="Website"
                  name="website"
                  state={null}
                  text="text-left"
                  defaultValue={website}
                />
              </div>
            </Card>
            <Card className=" rounded-2xl shadow-md p-4 flex flex-col gap-3 justify-center">
              <div className="grid grid-cols-2">
                <InputForm
                  title="Socail Media"
                  name="socialMedia"
                  state={null}
                  text="text-left"
                  defaultValue={
                    Object.keys(socialMedia).length === 0
                      ? "No social media"
                      : socialMedia
                  }
                />
                <InputForm
                  title="Creation Date"
                  name="creationDate"
                  state={null}
                  text="text-left"
                  readOnly={true}
                  defaultValue={creationDate}
                />
              </div>
              <div className="grid grid-cols-2">
                <InputForm
                  title="Status"
                  name="status"
                  state={null}
                  text="text-left"
                  defaultValue={status}
                />
                <InputForm
                  title="Address ID"
                  name="addressId"
                  state={null}
                  text="text-left"
                  readOnly={true}
                  defaultValue={addressId ? addressId : "No address"}
                />
              </div>
              <div className="grid grid-cols-2">
                <InputForm
                  title="Company ID"
                  name="companyId"
                  state={null}
                  text="text-left"
                  readOnly={true}
                  defaultValue={companyId}
                />
                <InputForm
                  title="Bank Account ID"
                  name="bankAccountId"
                  state={null}
                  text="text-left"
                  readOnly={true}
                  defaultValue={
                    bankAccountId ? bankAccountId : "No bank account"
                  }
                />
              </div>
            </Card>
          </div>
        </div>
        <div className="w-full p-4 rounded-2xl flex justify-end">
          <Button
            type="submit"
            className="w-[30%] font-light rounded-2xl bg-gradient-to-r from-[#6366f1] via-50% to-[#14b8a6] hover:opacity-90"
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default StoreCard;
