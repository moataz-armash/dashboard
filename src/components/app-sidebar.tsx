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
    url: "/home",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
  {
    title: "Stores",
    url: "/store",
    icon: Store,
  },
  {
    title: "Workers",
    url: "/worker",
    icon: HardHat,
  },
  {
    title: "Products",
    url: "/product",
    icon: Box,
  },
  {
    title: "Financials",
    url: "/financial",
    icon: DollarSign,
  },
  {
    title: "Reports",
    url: "/report",
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
                    <Link href={item.url} className={pathname === "/dashboard/company" + item.url ? "bg-blue-900 text-white" : "" }>
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
