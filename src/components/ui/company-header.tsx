"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { useProfileStore } from "@/app/dashboard/company/profileStore";
import Spinner from "./spinner";
import { defaultUserImg } from "@/lib/constants";

interface CompanyHeaderProps {
  title: string;
  description?: string;
}

export default function CompanyHeader({
  title,
  description,
}: CompanyHeaderProps) {
  const { profile } = useProfileStore();
  const [profileIsLoading, setProfileIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(
    defaultUserImg || null
  );

  const name = profile?.name || "Bim";
  const profilePhoto = profile?.profilePhoto || "";

  useEffect(() => {
    if (profilePhoto) {
      const profilePhotoUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/image?in=${profilePhoto}`;
      setPreviewImage(profilePhotoUrl);
    }
  }, [profilePhoto]);
  return (
    <div className="w-full flex justify-between">
      <div className="flex space-x-2">
        <div className="flex flex-col items-center pt-6">
          <h1 className="text-xl font-bold text-left w-full">{title}</h1>
          <p className="text-[0.7rem] text-zinc-400">{description}</p>
        </div>
      </div>

      {previewImage && (
        <div className="flex gap-1 mt-5 items-center">
          <Image
            src={previewImage}
            alt="admin profile"
            width={40}
            height={40}
            style={{ aspectRatio: "96/96", objectFit: "cover" }}
            className={`rounded-full ${
              profileIsLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoadingComplete={() => setProfileIsLoading(false)}
            priority
          />
          {profileIsLoading && <Spinner className="w-10 h-10 text-brand-500" />}

          <div className="ml-1 flex flex-col items-center">
            <p className="font-bold text-sm text-left w-full">{name}</p>
            <p className="text-xs text-zinc-400">Admin</p>
          </div>
        </div>
      )}
    </div>
  );
}
