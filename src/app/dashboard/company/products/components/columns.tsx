"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./dummy-data";
import { Button } from "@/components/ui/button";
import { Actions } from "./actions";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => <img src={row.original.image} alt="product" className="w-12 h-12 rounded-md" />,
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <span className={row.original.stock > 0 ? "text-green-600" : "text-red-600"}>
        {row.original.stock > 0 ? "In Stock" : "Out of Stock"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions product={row.original} />,
  },
];
