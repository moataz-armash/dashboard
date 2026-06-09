"use server";
import { cookies } from "next/headers";
import AddressForm from "./address-client";

interface AddressPageProps {
  params: Promise<{ addressId: string }>;
}

export default async function AddressPage({ params }: AddressPageProps) {
  const { addressId } = await params;

  if (addressId === "new") {
    return <AddressForm address={null} addressId={null} />;
  }

  const res = await fetch(
    `${process.env.API_BASE_URL_ADDRESS}/address/management/get/${addressId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  return <AddressForm address={data?.data ?? null} addressId={addressId} />;
}
