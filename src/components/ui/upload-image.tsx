import { handleFileChange, handleImageClick } from "@/lib/helpers";
import { Upload } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";

interface UploadImageProps {
  name?: string;
  status?: string;
  previewImage: string | StaticImageData;
  setPreviewImage: React.Dispatch<
    React.SetStateAction<string | StaticImageData>
  >;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  nameOfInput: string;
}
export default function UploadImage({
  name,
  status,
  previewImage,
  setPreviewImage,
  fileInputRef,
  nameOfInput
}: UploadImageProps) {
  return (
    <div className="flex flex-col gap-1 mt-5 items-center">
      <div
        className="relative group hover:cursor-pointer w-24 h-24 flex items-center justify-center border-4 border-gray-700 rounded-full"
        onClick={() => handleImageClick(fileInputRef)}
      >
        <Image
          src={previewImage}
          alt={`${name} || Avatar`}
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
          name={nameOfInput}
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, setPreviewImage)}
        />
      </div>
      {name && (
        <div className="ml-1 flex flex-col items-center">
          <p className="font-bold text-xl mt-3 text-left w-full">{name}</p>
          <p className="text-xs text-zinc-400">{status}</p>
        </div>
      )}
    </div>
  );
}
