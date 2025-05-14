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
import { DialogWindow } from "./dialog-window";
import { createStore } from "./page";
import Badge from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useProfileStore } from "../profileStore";

interface Store {
  id: string;
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

interface StoresCardsProps {
  stores: Store[];
}

const StoresCards = ({ stores }: StoresCardsProps) => {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();
  const { profile } = useProfileStore();

  const name = profile?.name || "Bim";
  const profilePhoto = profile?.profilePhoto || "";
  const profilePhotoUrl = profilePhoto
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/image?in=${profilePhoto}`
    : null;

  const handleOpenDialog = (type: "edit" | "delete") => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <main className="flex-1">
        <div className="w-full flex justify-between px-8">
          <div className="flex space-x-2">
            <div className="flex flex-col items-center pt-6">
              <h1 className="text-xl font-bold text-left w-full">All Stores</h1>
              <p className="text-[0.7rem] text-zinc-400">
                Let's browse all your stores
              </p>
            </div>
          </div>
          {profile && (
            <div className="flex gap-1 mt-5 items-center">
              <Avatar>
                {!isImageLoaded && (
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full animate-pulse">
                    <span className="text-[8px] text-gray-400">Loading...</span>
                  </div>
                )}
                <AvatarImage
                  src={`${profilePhotoUrl || "https://github.com/shadcn.pn"} `}
                  alt="admin profile"
                  style={isImageLoaded ? {} : { display: "none" }}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => setIsImageLoaded(true)}
                />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
              <div className="ml-1 flex flex-col items-center">
                <p className="font-bold text-sm text-left w-full">{name}</p>
                <p className="text-xs text-zinc-400">Admin</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="flex justify-between items-center p-4">
          <input
            type="text"
            placeholder="Type the name of store..."
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
                    key={store.id}
                    // onClick={() => setSelectedStore(store)}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/company/stores/${store.id}`)
                    }
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

export default StoresCards;
