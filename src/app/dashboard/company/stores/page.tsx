"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListFilter, Plus } from "lucide-react";

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
import { createStore } from "./actions";
import { DialogWindow } from "./dialog-window";

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
    <>
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="flex justify-between items-center p-4">
          <input
            type="text"
            placeholder="Type the name of store..."
            className="border border-gray-300 rounded-md px-3 py-2 w-[30%]"
          />

          <div className="flex space-x-4">
            <Button variant="outline" className="font-medium">
              {" "}
              <ListFilter /> Filter{" "}
            </Button>

            <DialogWindow
              icon={<Plus />}
              title="Add Store"
              className="bg-brand-500 hover:bg-brand-600"
              method={createStore}
            />
          </div>
        </div>
        <Card className="p-4 rounded-2xl shadow-md w-full">
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
    </>
  );
};

export default StoreCards;
