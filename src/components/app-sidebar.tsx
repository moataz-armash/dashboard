"use client";
import {
  Home,
  UserRound,
  Store,
  HardHat,
  Box,
  DollarSign,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/company/home",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/dashboard/company/profile",
    icon: UserRound,
  },
  {
    title: "Stores",
    url: "/dashboard/company/stores",
    icon: Store,
  },
  {
    title: "Products",
    url: "/dashboard/company/products",
    icon: Box,
  },
  {
    title: "Workers",
    url: "/dashboard/company/workers",
    icon: HardHat,
  },
  // {
  //   title: "Financials",
  //   url: "/dashboard/company/financials",
  //   icon: DollarSign,
  // },
  // {
  //   title: "Reports",
  //   url: "/dashboard/company/reports",
  //   icon: FileText,
  // },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Company</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={
                        pathname === item.url
                          ? "bg-white text-black font-semibold hover:bg-brand-600 shadow-md hover:shadow-lg"
                          : ""
                      }
                    >
                      <item.icon
                        className={
                          pathname === item.url ? "text-brand-600" : ""
                        }
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
