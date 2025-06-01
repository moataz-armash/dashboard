"use client";

import { useState } from "react";
import Sidebar from "./components/side-bar";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GeneralLinks, settingsLinks } from "./components/nav-links";

const MapView = dynamic(() => import("./components/map-view"), { ssr: false });

interface ContribDashProps {
  children: React.ReactNode;
}

export default function ContributorDashboardLayout({
  children,
}: ContribDashProps) {
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
      <div className="w-full h-[95%] m-auto top-0 left-0 z-50 flex rounded-2xl border bg-white">
        {/* leftside */}
        <div className="flex-1 flex rounded-tl-2xl h-full">
          {/* dashboard sidebar */}
          <div className="w-[25%] h-full rounded-l-2xl flex justify-center items-center px-8 py-8">
            {/* List */}
            <div className="w-full h-full flex flex-col justify-between">
              {/* up box */}
              <div className="flex flex-col gap-8 h-[70%]">
                {GeneralLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.id}
                    className="flex justify-start items-center gap-2 group"
                  >
                    <link.icon
                      size={16}
                      className={`group-hover:text-purblebrand ${
                        pathname === link.href
                          ? "text-purblebrand"
                          : "text-graybrand"
                      }`}
                    />{" "}
                    <span
                      className={`group-hover:text-purblebrand text-xs font-semibold ${
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
              <div className="flex flex-col gap-4 h-[30%] justify-end">
                {settingsLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.id}
                    className="flex justify-start items-center gap-2 group"
                  >
                    <link.icon
                      size={16}
                      className={`group-hover:text-purblebrand ${
                        pathname === link.href
                          ? "text-purblebrand"
                          : "text-graybrand"
                      }`}
                    />{" "}
                    <span
                      className={`group-hover:text-purblebrand text-xs font-semibold ${
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
          <div className="w-full h-full">{children}</div>
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
