"use client";

import { useState } from "react";
import Sidebar from "./side-bar";
import dynamic from "next/dynamic";
import {
  Bell,
  Bookmark,
  Compass,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MapView = dynamic(() => import("./map-view"), { ssr: false });

const GeneralLinks = [
  { id: 1, title: "Dashboard", href: "/contributor", icon: LayoutDashboard },
  { id: 2, title: "Notifs", href: "/notification", icon: Bell },
  { id: 3, title: "Discover", href: "/discover", icon: Compass },
  { id: 4, title: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { id: 5, title: "Add friend", href: "/add-friend", icon: UserRoundPlus },
];

const settingsLinks = [
  { id: 6, title: "Settings", href: "/settings", icon: Settings },
  { id: 7, title: "Logout", href: "/logout", icon: LogOut },
];

export default function HomePage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleSelectLocation = (id: number) => {
    setSelectedId(id);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedId(null);
  };

  return (
    <div className="flex justify-center items-center shadow-xl h-screen p-8 bg-[#e9e9f5]">
      <div className="w-full h-[95%] m-auto top-0 left-0 z-50 flex rounded-lg border bg-white">
        {/* leftside */}
        <div className="flex-1 rounded-tl-lg h-full">
          {/* dashboard sidebar */}
          <div className="w-[25%] bg-green-400 h-full rounded-l-lg flex justify-center items-center px-6 py-4">
            {/* List */}
            <div className="bg-blue-500 w-full h-full flex flex-col justify-between">
              {/* up box */}
              <div className="flex flex-col gap-4 h-[70%]">
                {GeneralLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.id}
                    className="flex justify-start items-center gap-8"
                  >
                    <link.icon
                      size={16}
                      className={`${
                        pathname === link.href
                          ? "text-purblebrand"
                          : "text-graybrand"
                      }`}
                    />{" "}
                    <span
                      className={`text-xs font-semibold ${
                        pathname === link.href
                          ? "text-purblebrand"
                          : "text-graybrand"
                      }`}
                    >
                      {" "}
                      {link.title}
                    </span>
                  </Link>
                ))}
              </div>
              {/* down box */}
              <div className="flex flex-col gap-4 h-[30%]">
                {settingsLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.id}
                    className="flex justify-start items-center gap-8"
                  >
                    <link.icon
                      size={16}
                      className={`${
                        pathname === link.href
                          ? "text-purblebrand"
                          : "text-graybrand"
                      }`}
                    />{" "}
                    <span
                      className={`text-xs font-semibold ${
                        pathname === link.href
                          ? "text-purblebrand"
                          : "text-graybrand"
                      }`}
                    >
                      {" "}
                      {link.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <MapView onSelect={handleSelectLocation} />
      </div>

      <Sidebar
        open={isSidebarOpen}
        onClose={handleCloseSidebar}
        selectedId={selectedId}
      />
    </div>
  );
}
