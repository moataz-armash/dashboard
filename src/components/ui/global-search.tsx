"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SEARCHABLE_ROUTES: Record<string, string> = {
  "/dashboard/company/stores": "Stores",
  "/dashboard/company/products": "Products",
};

export default function GlobalSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const isSearchable = Object.keys(SEARCHABLE_ROUTES).some((route) =>
    pathname.startsWith(route)
  );

  // Sync input when navigating between pages
  useEffect(() => {
    setValue(searchParams.get("search") ?? "");
  }, [pathname, searchParams]);

  if (!isSearchable) return null;

  const label =
    Object.entries(SEARCHABLE_ROUTES).find(([route]) =>
      pathname.startsWith(route)
    )?.[1] ?? "items";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    params.delete("page"); // reset pagination on new search
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={`Search ${label}...`}
        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
      />
    </div>
  );
}
