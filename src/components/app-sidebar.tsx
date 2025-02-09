"use client"
import {  Home, UserRound, Store, HardHat,Box,DollarSign ,FileText, CloudCog  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
    title: "Workers",
    url: "/dashboard/company/workers",
    icon: HardHat,
  },
  {
    title: "Products",
    url: "/dashboard/company/products",
    icon: Box,
  },
  {
    title: "Financials",
    url: "/dashboard/company/financials",
    icon: DollarSign,
  },
  {
    title: "Reports",
    url: "/dashboard/company/reports",
    icon: FileText ,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
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
                    <Link href={item.url} className={pathname === item.url ? "bg-blue-700 text-white hover:bg-blue-800 hover:text-white" : "" }>
                      <item.icon />
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
  )
}
