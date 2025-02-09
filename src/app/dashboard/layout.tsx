
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <main  className="flex-1">
      <SidebarTrigger/>
      {children}
    </main>
  </SidebarProvider>
  );
}
