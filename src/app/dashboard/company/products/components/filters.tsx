"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dummyProducts, Product } from "./dummy-data";

interface FiltersProps {
  setFilteredProducts: (products: Product[]) => void;
}

export function Filters({ setFilteredProducts }: FiltersProps) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const filtered = dummyProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <Input
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
