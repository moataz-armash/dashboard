"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, PackageSearch } from "lucide-react";
import FilterPopover, { FilterGroup } from "@/components/ui/filter-popover";
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
import { Product, initialProductState } from "./components/type";
import { productFields } from "./components/product-fields";
import { createProduct } from "./components/actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getImage } from "@/lib/helpers";
import Pagination from "@/components/ui/pagination";

const PRODUCT_FILTER_GROUPS: FilterGroup[] = [
  {
    key: "category",
    label: "Category",
    options: [
      { label: "Electronics", value: "ELECTRONICS" },
      { label: "Fashion", value: "FASHION" },
      { label: "Home Appliances", value: "HOME_APPLIANCES" },
      { label: "Books", value: "BOOKS" },
      { label: "Groceries", value: "GROCERIES" },
      { label: "Sports", value: "SPORTS" },
      { label: "Toys", value: "TOYS" },
      { label: "Beauty", value: "BEAUTY" },
      { label: "Health", value: "HEALTH" },
      { label: "Automotive", value: "AUTOMOTIVE" },
      { label: "Tools", value: "TOOLS" },
      { label: "Others", value: "OTHERS" },
    ],
  },
];

interface ProductsClientProps {
  res: any;
  currentPage: number;
  search?: string;
  category?: string;
}

export default function ProductsClient({
  res,
  currentPage,
  search = "",
  category = "",
}: ProductsClientProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const products: Product[] = res?.data || [];
  const router = useRouter();

  const totalPages = res?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(newPage));
    router.push(`?${searchParams.toString()}`);
  };

  console.log(products);

  const selectedCategories = category ? category.split(",") : [];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="flex justify-end items-center py-2">
        <div className="flex space-x-4">
          <FilterPopover groups={PRODUCT_FILTER_GROUPS} />

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
        <>
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
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/company/products/${product.id}`)
                      }
                    >
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={
                              `${getImage(product?.images?.[0])}` ||
                              "https://github.com/shadcn.pn"
                            }
                            alt="admin profile"
                          />
                        </Avatar>
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.size}</TableCell>
                      <TableCell>{product.createdBy}</TableCell>
                      <TableCell>
                        <Button variant="outline">Edit</Button>
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
          <div className="my-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
          <PackageSearch className="w-14 h-14 mb-4 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-600">No products yet</h2>
          <p className="text-sm mt-1 max-w-xs">
            You haven&apos;t added any products yet. Use the{" "}
            <span className="font-medium text-brand-500">Add Product</span>{" "}
            button above to create your first product.
          </p>
        </div>
      )}
    </>
  );
}
