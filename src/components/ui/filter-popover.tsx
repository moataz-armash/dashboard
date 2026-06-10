"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ListFilter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FilterGroup {
  key: string;       // URL param key, e.g. "status"
  label: string;     // Group label, e.g. "Status"
  options: { label: string; value: string }[];
  multi?: boolean;   // allow multiple selections (default false = single)
}

interface FilterPopoverProps {
  groups: FilterGroup[];
}

export default function FilterPopover({ groups }: FilterPopoverProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getSelected = (key: string): string[] => {
    const val = searchParams.get(key);
    return val ? val.split(",") : [];
  };

  const toggleValue = (key: string, value: string, multi: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = getSelected(key);

    if (multi) {
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      if (next.length) params.set(key, next.join(","));
      else params.delete(key);
    } else {
      if (current[0] === value) params.delete(key);
      else params.set(key, value);
    }

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    groups.forEach((g) => params.delete(g.key));
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  const activeCount = groups.reduce(
    (acc, g) => acc + getSelected(g.key).length,
    0
  );

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        className="font-medium gap-2"
        onClick={() => setOpen((o) => !o)}
      >
        <ListFilter className="w-4 h-4" />
        Filter
        {activeCount > 0 && (
          <span className="ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-brand-500 text-white text-xs font-bold">
            {activeCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 z-50 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Filters</span>
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
              >
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>

          {groups.map((group) => {
            const selected = getSelected(group.key);
            return (
              <div key={group.key}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((opt) => {
                    const isActive = selected.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() =>
                          toggleValue(group.key, opt.value, group.multi ?? false)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          isActive
                            ? "bg-brand-500 text-white border-brand-500"
                            : "bg-white text-gray-600 border-gray-300 hover:border-brand-400"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
