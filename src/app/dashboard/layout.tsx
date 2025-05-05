import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userCookies = cookies();
  const token = userCookies.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/company/profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  console.log(data.data.profilePhoto);
  const { name, profilePhoto } = data.data;
  const profilePhotoUrl = profilePhoto
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/company/image?in=${profilePhoto}`
    : null;

  return (
    <SidebarProvider>
      <AuthProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="w-full flex justify-between">
            <div className="flex space-x-2">
              <SidebarTrigger />
              <div className="flex flex-col items-center pt-6">
                <h1 className="text-xl font-bold text-left w-full">All Stores</h1>
                <p className="text-[0.7rem] text-zinc-400">Let's browse all your stores</p>
              </div>
            </div>
            {profilePhotoUrl && (
              <div className="flex gap-1 mt-5 mr-8 items-center">
                <Avatar>
                  <AvatarImage
                    src={`${
                      profilePhotoUrl || "https://github.com/shadcn.pn"
                    } `}
                    alt="admin profile"
                  />
                  <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
                <div className="ml-1 flex flex-col items-center">
                  <p className="font-bold text-sm text-left w-full">{name}</p>
                  <p className="text-xs text-zinc-400">Admin</p>
                </div>
              </div>
            )}
          </div>

          {children}
        </main>
      </AuthProvider>
    </SidebarProvider>
  );
}
