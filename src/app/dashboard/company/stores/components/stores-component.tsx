"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
import FilterPopover, { FilterGroup } from "@/components/ui/filter-popover";

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

const STORE_FILTER_GROUPS: FilterGroup[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "ACTIVE" },
      { label: "Inactive", value: "INACTIVE" },
      { label: "Suspended", value: "SUSPENDED" },
      { label: "Deleted", value: "DELETED" },
    ],
  },
];

interface StoresCardsProps {
  data: any;
  currentPage: number;
  search?: string;
  status?: string;
}

const StoresCards = ({ data, currentPage, search = "", status = "" }: StoresCardsProps) => {
  const router = useRouter();

  const stores: Store[] = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(newPage));
    router.push(`?${searchParams.toString()}`);
  };

  const selectedStatuses = status ? status.split(",") : [];

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(store.status);
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <main className="flex-1 px-6">
        <CompanyHeader
          title="All Stores"
          description="Let's browse all your stores"
        />
      </main>
      <div className="grid grid-cols-1 gap-4 p-4">
        <div className="flex justify-end items-center py-2 px-1">
          <div className="flex space-x-4">
            <FilterPopover groups={STORE_FILTER_GROUPS} />

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
