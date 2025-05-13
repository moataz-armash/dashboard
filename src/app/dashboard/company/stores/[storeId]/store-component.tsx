"use client";
import { useActionState, useState } from "react";
import {
  ListFilter,
  Plus,
  ArrowLeft,
  ShoppingCart,
  TicketPercent,
  PackageCheck,
  Shapes,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
// import { DialogWindow } from "./dialog-window";
import Badge from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useProfileStore } from "../../profileStore";
import CardItem from "./card-item";
import InputForm from "@/components/ui/input-form";

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

interface StoreCardProps {
  store: Store;
}

const StoreCard = ({ store }: StoreCardProps) => {
  const { profile } = useProfileStore();
  const [search, setSearch] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);

  const handleOpenDialog = (type: "edit" | "delete") => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const profilePhoto = profile?.profilePhoto || "";
  const name = profile?.name || "";
  const profilePhotoUrl = profilePhoto
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/image?in=${profilePhoto}`
    : null;

  return (
    <>
      <main className="flex-1">
        <div className="flex justify-between items-center py-6 px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/company/stores"
              className="border bg-card text-card-foreground p-2 rounded-2xl shadow-md cursor-pointer"
            >
              <ArrowLeft />
            </Link>
            <h1 className="text-xl font-bold text-left w-full">
              {store.name.toUpperCase()}
            </h1>
          </div>
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Type the name of store..."
              className="border border-gray-300 rounded-3xl px-3 py-2 w-[70%] focus:outline-brand-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 items-center justify-center">
            <Avatar>
              <AvatarImage
                src={`${profilePhotoUrl || "https://github.com/shadcn.pn"} `}
                alt="admin profile"
              />
              <AvatarFallback>{name || ""}</AvatarFallback>
            </Avatar>
            <div className="ml-1 flex flex-col items-center">
              <p className="font-bold text-sm text-left w-full">{name || ""}</p>
              <p className="text-xs text-zinc-400">Admin</p>
            </div>
          </div>
        </div>

        {/* {profilePhotoUrl && ( */}

        {/* )} */}
      </main>
      <div className="grid grid-cols-4 gap-4 px-4 py-2">
        <CardItem
          title="All Products"
          number={120}
          bgColor="bg-[#6366f1]"
          icon={<ShoppingCart className="text-white" />}
        />
        <CardItem
          title="Reorder Level"
          number={15}
          bgColor="bg-[#a855f7]"
          icon={<PackageCheck className="text-white" />}
        />
        <CardItem
          title="Products On Discount"
          number={46}
          bgColor="bg-[#14b8a6]"
          icon={<TicketPercent className="text-white" />}
        />
        <CardItem
          title="Categories"
          number={24}
          bgColor="bg-[#eab308]"
          icon={<Shapes className="text-white" />}
        />
        {/* </Card> */}
        {/* <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
        </Dialog> */}
      </div>
      <div className="grid grid-cols-4 px-4 py-2 grid-rows-2 gap-4">
        <Card className="col-span-1 row-span-full p-4 rounded-2xl shadow-md h-full flex items-center justify-center">
          <div className="flex flex-col gap-1 mt-5 items-center">
            <Avatar className="w-32 h-32 border-4 border-[#6b7280] rounded-[50%]">
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
              <p className="font-bold text-xl mt-3 text-left w-full">{name}</p>
              <p className="text-xs text-zinc-400">Admin</p>
            </div>
          </div>
        </Card>
        <div className="grid col-span-3 row-span-2 grid-rows-2 gap-4">
          <Card className="rounded-2xl shadow-md p-4 flex flex-col gap-3 justify-center">
            <div className="grid grid-cols-2">
              {/* <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-500 flex-1">
                  Name
                </label>
                <input
                  className="border rounded px-2 py-1 flex-auto "
                  value="adapazarı"
                  readOnly
                />
              </div> */}
              <InputForm
                title="Name"
                name="name"
                state="null"
                text="text-left"
              />
              <InputForm
                title="Store Code"
                name="storeCode"
                state="null"
                text="text-left"
              />
            </div>
            <div className="grid grid-cols-2">
              <InputForm
                title="Description"
                name="description"
                state="null"
                text="text-left"
              />
              <InputForm
                title="Email"
                name="email"
                state="null"
                text="text-left"
              />
            </div>
            <div className="grid grid-cols-2 ">
              <InputForm
                title="Phone Number"
                name="phoneNumber"
                state="null"
                text="text-left"
              />
              <InputForm
                title="Website"
                name="website"
                state="null"
                text="text-left"
              />
            </div>
          </Card>
          <Card className=" rounded-2xl shadow-md p-4 flex flex-col gap-3 justify-center">
            <div className="grid grid-cols-2">
              <InputForm
                title="Socail Media"
                name="socialMedia"
                state="null"
                text="text-left"
              />
              <InputForm
                title="Creation Date"
                name="creationDate"
                state="null"
                text="text-left"
              />
            </div>
            <div className="grid grid-cols-2">
              <InputForm
                title="Status"
                name="status"
                state="null"
                text="text-left"
              />
              <InputForm
                title="Address ID"
                name="addressId"
                state="null"
                text="text-left"
              />
            </div>
            <div className="grid grid-cols-2">
              <InputForm
                title="Company ID"
                name="companyId"
                state="null"
                text="text-left"
              />
              <InputForm
                title="Bank Account ID"
                name="bankAccountId"
                state="null"
                text="text-left"
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StoreCard;
