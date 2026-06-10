"use client";

import StoreForm from "./components/store-form";
import BackLink from "@/components/ui/back-link";
import StoreCardsIstatistics from "./components/store-cards-istatistics";
import { Statistics } from "./components/type";

interface Store {
  id: string;
  name: string;
  storeCode: string;
  description: string;
  profilePicture: string | null;
  email: string;
  creationDate: string;
  phoneNumber: string;
  companyId: string;
  website: string;
  bankAccountId: string | null;
  socialMedia: Record<string, string>;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DELETED";
  addressId: string;
}

export interface StoreCardProps {
  store: Store;
  token: string;
  statistics: Statistics;
}

const StoreCard = ({ store, token, statistics }: StoreCardProps) => {
  return (
    <>
      <main className="flex-1">
        <div className="flex items-center py-4 px-4">
          <BackLink link="/dashboard/company/stores" title="All Stores" />
        </div>
      </main>
      <StoreCardsIstatistics {...statistics} />
      <StoreForm store={store} token={token} />
    </>
  );
};

export default StoreCard;
