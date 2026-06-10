"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/app/dashboard/company/profileStore";
import { getImage } from "@/lib/helpers";

export default function HeaderProfile() {
  const { profile } = useProfileStore();

  const name = profile?.name || "";
  const profilePhotoUrl = getImage(profile?.profilePhoto || "");

  return (
    <div className="flex gap-2 items-center">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={profilePhotoUrl || "/assets/userprofile.jpg"}
          alt={name}
        />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col leading-tight">
        <p className="font-semibold text-sm">{name || "Admin"}</p>
        <p className="text-xs text-zinc-400">Admin</p>
      </div>
    </div>
  );
}
