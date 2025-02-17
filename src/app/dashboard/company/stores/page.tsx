"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Store {
  id: number;
  name: string;
  location: string;
  products: Product[];
}

const stores: Store[] = [
  {
    id: 1,
    name: "Tech Store",
    location: "Downtown",
    products: [
      { id: 1, name: "Laptop", price: 1200, quantity: 5 },
      { id: 2, name: "Mouse", price: 50, quantity: 20 },
    ],
  },
  {
    id: 2,
    name: "Home Essentials",
    location: "Uptown",
    products: [
      { id: 3, name: "Vacuum Cleaner", price: 300, quantity: 8 },
      { id: 4, name: "Toaster", price: 40, quantity: 15 },
    ],
  },
];

const StoreCards = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const handleOpenDialog = (type: "edit" | "delete") => {
    setDialogType(type);
    setOpenDialog(true);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card className="p-4 rounded-2xl shadow-md w-full">
        <h2 className="text-xl font-semibold mb-4">Stores</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stores.map((store) => (
              <TableRow
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className="cursor-pointer"
              >
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.location}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => handleOpenDialog("edit")}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="ml-2"
                    onClick={() => handleOpenDialog("delete")}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Card className="p-4 rounded-2xl shadow-md w-full">
        {selectedStore ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Products in{" "}
              <span className="text-blue-500"> {selectedStore.name}</span>
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedStore.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => handleOpenDialog("edit")}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="ml-2"
                        onClick={() => handleOpenDialog("delete")}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <p className="text-center">Select a store to view its products</p>
        )}
      </Card>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "edit" ? "Edit Item" : "Confirm Deletion"}
            </DialogTitle>
          </DialogHeader>
          <p>
            {dialogType === "edit"
              ? "Modify the details of this item."
              : "Are you sure you want to delete this item?"}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant={dialogType === "delete" ? "destructive" : "default"}
              onClick={() => setOpenDialog(false)}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoreCards;
