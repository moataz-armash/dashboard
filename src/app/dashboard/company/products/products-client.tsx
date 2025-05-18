"use client";

import { useRef, useState } from "react";
import CompanyHeader from "@/components/ui/company-header";
import { Button } from "@/components/ui/button";
import { ListFilter, Plus } from "lucide-react";
import { DialogWindow } from "../stores/components/dialog-window";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Badge from "@/components/ui/badge";
import { Product, initialProductState } from "./type";
import { productFields } from "./product-fields";
import { createProduct } from "./actions";

interface ProductsClientProps {
  products: Product[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log(products);

  return (
    <div className="px-6 flex flex-col gap-4">
      <CompanyHeader title="Products Managment" />
      <div className="flex justify-between items-center py-2">
        <input
          type="text"
          placeholder="Type the name product..."
          className="border border-gray-300 rounded-md px-3 py-2 w-[30%] focus:outline-brand-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex space-x-4">
          <Button variant="outline" className="font-medium">
            {" "}
            <ListFilter /> Filter{" "}
          </Button>

          <DialogWindow
            icon={<Plus />}
            buttonTitle="Add Product"
            title="product"
            dialogTitle="Create Product"
            className="bg-brand-500 hover:bg-brand-600"
            method={createProduct}
            fileInputRef={fileInputRef}
            fields={productFields}
            initialState={initialProductState}
          />
        </div>
      </div>
      {products.length > 0 ? (
        <Card className="p-4 rounded-2xl shadow-md w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Created By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    // onClick={() => setSelectedStore(store)}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/company/products/${product.id}`)
                    }
                  >
                    <TableCell>{product?.images?.[0]}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.size}</TableCell>
                    <TableCell>
                      {/* <Badge text={store.status} status={store.status} /> */}
                      {product.createdBy}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        // onClick={() => handleOpenDialog("edit")}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div
                      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                      role="alert"
                    >
                      <p> This store not found Please try again </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <p className="text-yellow-500 w-full pl-1 font-medium">
          There is no Products, Add one Now!
        </p>
      )}
    </div>
  );
}
