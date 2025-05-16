import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/context/AuthContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";

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
          <SidebarTrigger />
          {children}
        </main>
      </AuthProvider>
    </SidebarProvider>
  );
}
