import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";
import GlobalSearch from "@/components/ui/global-search";
import HeaderProfile from "@/components/ui/header-profile";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const tokenRes = await apiRequest(
    `/auth/is-token-expired?tkn=${token}`,
    token
  );

  if (tokenRes.bodyUsed) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AuthProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="flex items-center gap-4 px-4 py-2 border-b bg-white sticky top-0 z-10">
            <SidebarTrigger />
            <Suspense>
              <GlobalSearch />
            </Suspense>
            <div className="ml-auto">
              <HeaderProfile />
            </div>
          </div>
          {children}
        </main>
      </AuthProvider>
    </SidebarProvider>
  );
}
