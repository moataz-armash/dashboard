"use client";

import { use, useEffect, useRef, useState } from "react";
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
import { Product, initialProductState } from "./components/type";
import { productFields } from "./components/product-fields";
import { createProduct } from "./components/actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getImage, handlePageChange } from "@/lib/helpers";
import Pagination from "@/components/ui/pagination";

interface ProductsClientProps {
  productsPromise: Promise<any>;
  currentPage: number;
}

export default function ProductsClient({
  productsPromise,
  currentPage,
}: ProductsClientProps) {
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const res = use(productsPromise);
  const products: Product[] = res?.data || [];
  const router = useRouter();

  const totalPages = Math.ceil(res?.total / res?.size) || 1;

  handlePageChange(currentPage, router);

  console.log(products);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    handlePageChange(currentPage, router);
  }, [currentPage, router]);

  return (
    <>
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
        <p className="text-yellow-500 w-full pl-1 font-medium">
          There is no Products, Add one Now!
        </p>
      )}
    </>
  );
}
