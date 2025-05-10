"use client";
import { useActionState, useState } from "react";
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
import { DialogWindow } from "./dialog-window";
import { createStore } from "./page";
import Badge from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Store {
  name: string;
  storeCode: string;
  description: string;
  email: string;
  phoneNumber: string;
  website: string;
  socialMedia: Record<string, string>;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
  addressId: string;
}

// const stores: Store[] = [
//   {
//     id: 1,
//     name: "Tech Store",
//     location: "Downtown",
//     products: [
//       { id: 1, name: "Laptop", price: 1200, quantity: 5 },
//       { id: 2, name: "Mouse", price: 50, quantity: 20 },
//     ],
//   },
//   {
//     id: 2,
//     name: "Home Essentials",
//     location: "Uptown",
//     products: [
//       { id: 3, name: "Vacuum Cleaner", price: 300, quantity: 8 },
//       { id: 4, name: "Toaster", price: 40, quantity: 15 },
//     ],
//   },
// ];

interface StoreCardsProps {
  stores: Store[];
}

const StoreCards = ({ stores }: StoreCardsProps) => {
  // const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const handleOpenDialog = (type: "edit" | "delete") => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="flex justify-between items-center p-4">
          <input
            type="text"
            placeholder="Type the name of store..."
            className="border border-gray-300 rounded-md px-3 py-2 w-[30%]"
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
                <TableHead>Phone Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <TableRow
                    key={store.storeCode}
                    // onClick={() => setSelectedStore(store)}
                    className="cursor-pointer"
                  >
                    <TableCell>{store.name}</TableCell>
                    <TableCell>{store.phoneNumber}</TableCell>
                    <TableCell>{store.email}</TableCell>
                    <TableCell>
                      <Badge text={store.status} status={store.status} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => handleOpenDialog("edit")}
                      >
                        Edit
                      </Button>
                      {/* <Button
                      variant="destructive"
                      className="ml-2"
                      onClick={() => handleOpenDialog("delete")}
                    >
                      Delete
                    </Button> */}
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
