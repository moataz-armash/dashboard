import {
  PackageCheck,
  Shapes,
  ShoppingCart,
  TicketPercent,
} from "lucide-react";
import CardItem from "./card-item";
import { Card } from "@/components/ui/card";
import UploadImage from "@/components/ui/upload-image";
import Spinner from "@/components/ui/spinner";
import InputForm from "@/components/ui/input-form";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { StoreCardProps } from "./store-component";
import { SubmitEntityUpdate, getImage } from "@/lib/helpers";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Input } from "@/components/ui/input";

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

export default function StoreForm({ store, token }: StoreCardProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

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
  const storePhotoUrl = `${getImage(store.profilePicture)}&v=${Date.now()}`;

  const [previewImage, setPreviewImage] = useState<string | null>(
    storePhotoUrl || null
  );
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
      },
      onError: () => toast.error("Update failed"),
      updateRequest: "updateStoreRequest",
    });
  };

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  console.log(addressId);

  return (
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
          {previewImage || storePhotoUrl ? (
            <UploadImage
              name={storeName}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              status={status}
              fileInputRef={fileInputRef}
              nameOfInput="profilePhoto"
            />
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

              <div className={`grid grid-cols-4 items-center gap-4 col-span-1`}>
                <Label
                  htmlFor="addressId"
                  className={`text-left ml-2 text-xs font-semibold text-gray-500 mb-1`}
                >
                  Address ID
                </Label>
                <Input
                  className={`col-span-2 bg-gray-100 cursor-not-allowed`}
                  type="text"
                  placeholder="Address Id"
                  aria-label="addressId"
                  name="addressId"
                  defaultValue={addressId}
                  readOnly={true}
                />
                <Link
                  href={`/dashboard/address?storeId=${store.id}&storeName=${storeName}`}
                  className="col-span-1 flex w-full"
                >
                  <Button variant="outline" className="w-full">{`${
                    addressId === "" ? "Add Adress" : "Edit Adress"
                  }`}</Button>
                </Link>
              </div>
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
                defaultValue={bankAccountId ? bankAccountId : "No bank account"}
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
          Submit{" "}
          {isLoading && <span className="text-white animate-pulse">...</span>}
        </Button>
      </div>
    </form>
  );
}

{
  /* {previewImage || storePhotoUrl ? (
            <>
              <div className="flex flex-col gap-1 mt-5 items-center">
                <div
                  className="relative group hover:cursor-pointer w-24 h-24 flex items-center justify-center border-4 border-gray-700 rounded-full"
                  onClick={handleImageClick}
                >
                  <Image
                    key={previewImage}
                    src={previewImage || storePhotoUrl}
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
                    name="profilePhoto"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {storeName && (
                  <div className="ml-1 flex flex-col items-center">
                    <p className="font-bold text-xl mt-3 text-left w-full">
                      {storeName}
                    </p>
                    <p className="text-xs text-zinc-400">{status}</p>
                  </div>
                )}
              </div>
            </> */
}
