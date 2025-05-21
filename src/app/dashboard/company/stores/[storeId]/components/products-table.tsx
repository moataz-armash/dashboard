"use client";
import { Card } from "@/components/ui/card";
import { ProductsTableProps } from "./type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { Plus } from "lucide-react";

export default function ProductsTable({
  products,
  storeName,
}: ProductsTableProps) {
  return (
    <div className="px-4 py-2">
      {products.length > 0 ? (
        <>
          <Card className="p-4 rounded-2xl shadow-md w-full">
            <div className="flex justify-between p-2">
              <h1 className="font-medium">{storeName}&apos;s Products</h1>
              <Button className="bg-brand-500 hover:bg-brand-600">
                Supply More <Plus />
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Is Discounted</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>ReorderLevel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow
                      key={product.id}
                      className="cursor-pointer"
                      //   onClick={() =>
                      //     router.push(`/dashboard/company/products/${product.id}`)
                      //   }
                    >
                      <TableCell>
                        {product.isDiscounted ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>{product.reorderLevel}</TableCell>
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
            {/* <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            /> */}
          </div>
        </>
      ) : (
        <p className="text-yellow-500 w-full pl-1 font-medium">
          There is no Products, Add one Now!
        </p>
      )}
    </div>
  );
}
