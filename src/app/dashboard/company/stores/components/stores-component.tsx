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

import { DialogWindow } from "./dialog-window";
import { createStore } from "./actions";
import Badge from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import CompanyHeader from "@/components/ui/company-header";
import { initialStoreState, storeFields } from "./store-fields";
import Pagination from "@/components/ui/pagination";
import { Store as StoreIcon, SearchX } from "lucide-react";

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
  data: any;
  currentPage: number;
}

const StoresCards = ({ data, currentPage }: StoresCardsProps) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const stores: Store[] = data?.data || [];

  const totalPages = Math.ceil(data?.total / data?.size) || 1;

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(newPage));
    router.push(`?${searchParams.toString()}`);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <main className="flex-1 px-6">
        <CompanyHeader
          title="All Stores"
          description="Let's browse all your stores"
        />
      </main>
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="flex justify-between items-center py-2 px-1">
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
              buttonTitle="Add Store"
              dialogTitle="Create Store"
              title="store"
              className="bg-brand-500 hover:bg-brand-600"
              method={createStore}
              fields={storeFields}
              initialState={initialStoreState}
            />
          </div>
        </div>
        {filteredStores.length > 0 ? (
          <>
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
                  {filteredStores.map((store) => (
                    <TableRow
                      key={store.id}
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
                        <Button variant="outline">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            {search ? (
              <>
                <SearchX className="w-12 h-12 mb-4 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-600">No stores match your search</h2>
                <p className="text-sm mt-1">Try a different name or clear the search field.</p>
              </>
            ) : (
              <>
                <StoreIcon className="w-12 h-12 mb-4 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-600">No stores yet</h2>
                <p className="text-sm mt-1 max-w-xs">
                  You haven&apos;t created any stores yet. Click{" "}
                  <DialogWindow
                    icon={null}
                    buttonTitle="Add Store"
                    dialogTitle="Create Store"
                    title="store"
                    className="bg-transparent hover:bg-transparent text-brand-500 hover:text-brand-600 font-medium p-0 h-auto shadow-none cursor-pointer underline-offset-2 hover:underline"
                    method={createStore}
                    fields={storeFields}
                    initialState={initialStoreState}
                  />{" "}
                  to get started.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StoresCards;
