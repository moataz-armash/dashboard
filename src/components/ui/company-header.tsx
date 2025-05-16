import { useProfileStore } from "@/app/dashboard/company/profileStore";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Spinner from "./spinner";

interface CompanyHeaderProps {
  title: string;
  description?: string;
}

export default function CompanyHeader({
  title,
  description,
}: CompanyHeaderProps) {
  const { profile } = useProfileStore();

  const name = profile?.name || "Bim";
  const profilePhoto = profile?.profilePhoto || "";
  const profilePhotoUrl = profilePhoto
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/image?in=${profilePhoto}`
    : null;
  return (
    <div className="w-full flex justify-between">
      <div className="flex space-x-2">
        <div className="flex flex-col items-center pt-6">
          <h1 className="text-xl font-bold text-left w-full">{title}</h1>
          <p className="text-[0.7rem] text-zinc-400">{description}</p>
        </div>
      </div>
      {profilePhotoUrl ? (
        <div className="flex gap-1 mt-5 items-center">
          <Avatar>
            <AvatarImage
              src={`${profilePhotoUrl || "https://github.com/shadcn.pn"} `}
              alt="admin profile"
            />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div className="ml-1 flex flex-col items-center">
            <p className="font-bold text-sm text-left w-full">{name}</p>
            <p className="text-xs text-zinc-400">Admin</p>
          </div>
        </div>
      ) : (
        <Spinner className="h-4 w-4 text-gray-500 mt-9 mr-9" />
      )}
    </div>
  );
}
