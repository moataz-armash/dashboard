import {
  PackageCheck,
  Shapes,
  ShoppingCart,
  TicketPercent,
  Upload,
} from "lucide-react";
import CardItem from "./card-item";
import { Card } from "@/components/ui/card";
import UploadImage from "@/components/ui/upload-image";
import Spinner from "@/components/ui/spinner";
import InputForm from "@/components/ui/input-form";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import userProfile from "@/assets/userprofile.jpg";
import {
  SubmitEntityUpdate,
  getImage,
  handleFileChange,
  handleImageClick,
} from "@/lib/helpers";
import toast from "react-hot-toast";
import { Product } from "../../components/type";
import { Label } from "@/components/ui/label";
import InputProduct from "./input-product";
import DropdownProduct from "./dropDown-product";
import { ProductCategories } from "./product-categories";

const fields = [
  "name",
  "brand",
  "description",
  "category",
  "size",
  "weight",
  "color",
];

const entityDefaults = {};

export default function ProductForm({
  product,
  token,
}: {
  product: Product;
  token: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const {
    name,
    description,
    brand,
    color,
    category,
    size,
    weight,
    images,
    updateAt,
    updateBy,
    createdAt,
    createdBy,
  } = product;
  const productPhotoUrl = getImage(images[0]);
  const [previewImage, setPreviewImage] = useState<string | StaticImageData>(
    productPhotoUrl || userProfile
  );

  const hasImage = product?.images?.[0] || previewImage;

  const endpoint = `/product/${product.id}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await SubmitEntityUpdate({
      formRef,
      fileInputRef,
      fields,
      entityDefaults,
      endpoint,
      token,
      fileFieldName: "images",
      fileFallbackUrl: productPhotoUrl,
      setIsLoading,
      onSuccess: () => {
        toast.success(`${product?.name} updated successful"`);
        setTimeout(() => {
          document.location.reload();
        }, 1500);
      },
      onError: () => toast.error("Update failed"),
      updateRequest: "updateProductRequest",
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-5 w-full p-6 space-x-3">
        <div className="col-span-3 bg-gray-100 p-4 flex flex-col gap-3 rounded-xl">
          <h5 className="font-semibold font-sans">General Information</h5>
          <div className="flex flex-col gap-2">
            <Label> Name Prodcut</Label>
            <InputProduct defaultValue={name} name="name" inputMode="text" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description Product</Label>

            <textarea
              name="description"
              id=""
              placeholder="Beyaz keçi süt peryniri"
              className="text-gray-700 bg-gray-200 px-2 py-3 rounded-xl placeholder:text-gray-400"
              defaultValue={description}
            ></textarea>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <Label>Size</Label>
              <InputProduct
                defaultValue={size}
                name="size"
                type="number"
                inputMode="numeric"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Label>Weight</Label>
              <InputProduct
                defaultValue={weight}
                name="weight"
                type="number"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <Label>Brand</Label>
              <InputProduct
                defaultValue={brand}
                name="brand"
                inputMode="text"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Label>Color</Label>
              <InputProduct
                defaultValue={color}
                name="color"
                inputMode="text"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2  bg-gray-100 p-4 flex flex-col gap-3 rounded-xl">
          <h5 className="font-semibold font-sans">Upload Img</h5>
          <div className="flex flex-col gap-1 mt-5 items-center">
            <div
              className="relative group hover:cursor-pointer w-[90%] h-52 flex items-center justify-center bg-transparent rounded-lg"
              onClick={() => handleImageClick(fileInputRef)}
            >
              {hasImage ? (
                <>
                  <Image
                    src={previewImage}
                    alt={`${name} || Avatar`}
                    fill
                    style={{
                      aspectRatio: "96/96",
                      objectFit: "fill",
                      borderRadius: "8px",
                    }}
                  />
                  <div className="absolute inset-0 bg-gray-950 opacity-0 group-hover:opacity-40 rounded-lg transition-opacity duration-200"></div>
                  <Upload className="absolute inset-0 m-auto w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="images"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setPreviewImage)}
                  />
                </>
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
          <h5 className="font-semibold mt-3 font-sans">Category</h5>
          <Label>Product Category</Label>
          <DropdownProduct
            name="category"
            defaultValue={category}
            options={ProductCategories}
          />
        </div>
      </div>
      <div className="w-full px-6 py-1 mb-4 space-x-3">
        <div className="grid grid-cols-4 bg-gray-100 p-4 gap-3 rounded-xl">
          <h5 className="col-span-4 font-semibold font-sans">More Details</h5>
          <div className="flex flex-col gap-2">
            <Label>Created At</Label>
            <InputProduct
              defaultValue={createdAt}
              name="color"
              inputMode="text"
              className="bg-gray-200 cursor-not-allowed"
              readOnly={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Created By</Label>
            <InputProduct
              defaultValue={createdBy}
              name="createdBy"
              inputMode="text"
              className="bg-gray-200 cursor-not-allowed"
              readOnly={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Updated At</Label>
            <InputProduct
              defaultValue={product?.updatedAt}
              name="updatedAt"
              inputMode="text"
              className="bg-gray-200 cursor-not-allowed"
              readOnly={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Updated By</Label>
            <InputProduct
              defaultValue={product?.updatedBy}
              name="updatedBy"
              inputMode="text"
              className="bg-gray-200 cursor-not-allowed"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className="w-full p-6 rounded-2xl flex justify-end">
        <Button
          type="submit"
          className="w-[30%] font-light rounded-2xl hover:opacity-90"
        >
          Submit{" "}
          {isLoading && <span className="text-white animate-pulse">...</span>}
        </Button>
      </div>
    </form>
  );
}
