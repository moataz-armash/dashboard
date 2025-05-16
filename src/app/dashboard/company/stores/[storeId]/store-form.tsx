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
import { useRef, useState } from "react";
import { StaticImageData } from "next/image";
import userProfile from "@/assets/userprofile.jpg";
import { StoreCardProps } from "./store-component";
import { SubmitEntityUpdate, getImage } from "@/lib/helpers";
import toast from "react-hot-toast";

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
  const storePhotoUrl = getImage(storePhoto);
  const [previewImage, setPreviewImage] = useState<string | StaticImageData>(
    storePhotoUrl || userProfile
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
        setTimeout(() => {
          document.location.reload();
        }, 1500);
      },
      onError: () => toast.error("Update failed"),
      updateRequest: "updateStoreRequest",
    });
  };
  
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
          {previewImage ? (
            <UploadImage
              name={storeName}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              status={status}
              fileInputRef={fileInputRef}
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
