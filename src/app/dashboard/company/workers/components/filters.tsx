"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { dummyWorkers, Worker } from "./dummy-data";

interface FiltersProps {
  setFilteredWorkers: (workers: Worker[]) => void;
}

export function Filters({ setFilteredWorkers }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [storeFilter, setStoreFilter] = useState("all"); // Default to "all"

  const handleSearch = () => {
    let filtered = dummyWorkers.filter(worker =>
      worker.name.toLowerCase().includes(search.toLowerCase())
    );

    if (storeFilter !== "all") {
      filtered = filtered.filter(worker => worker.store === storeFilter);
    }

    setFilteredWorkers(filtered);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <Input placeholder="Search worker..." value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* Fixed Select Component */}
      <Select onValueChange={setStoreFilter} value={storeFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by Store" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Stores</SelectItem> {/* ✅ No empty value */}
          <SelectItem value="Store A">Store A</SelectItem>
          <SelectItem value="Store B">Store B</SelectItem>
        </SelectContent>
      </Select>

      <button onClick={handleSearch} className="bg-blue-500 px-4 py-2 text-white rounded-md">Filter</button>
    </div>
  );
}
