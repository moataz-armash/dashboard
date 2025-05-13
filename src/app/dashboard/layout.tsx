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

  const tokenRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/auth/is-token-expired?tkn=${token}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  // console.log("tokenRes : ", tokenRes.bodyUsed);

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
