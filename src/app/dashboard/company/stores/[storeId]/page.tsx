"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import StoreCard from "./store-component";
import { redirect } from "next/navigation";
import { apiRequest } from "@/utils/api";
import ProductsTable from "./components/products-table";

const CreateStoreSchema = z.object({
  name: z.string().min(2, "Name is required").trim(),
  storeCode: z.string().min(2, "Store code is required").trim(),
  description: z.string().optional(),
  email: z.string().email("Invalid email format").trim(),
  phoneNumber: z.string().min(10, "Phone number is required").trim(),
  website: z.string().url("Invalid website format").trim(),
  socialMedia: z.record(z.string(), z.string()).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED", "DELETED"]),
  addressId: z.string().min(1, "Address ID is required"),
});

export async function createStore(prevState: any, formData: FormData) {
  console.log("prevState", prevState);
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;
  const raw = {
    name: String(formData.get("name") || ""),
    storeCode: String(formData.get("storeCode") || ""),
    description: String(formData.get("description") || ""),
    email: String(formData.get("email") || ""),
    phoneNumber: String(formData.get("phoneNumber") || ""),
    website: String(formData.get("website") || ""),
    socialMedia: {},
    status: String(formData.get("status") || "ACTIVE"), // Set the default status to "ACTIVE" if no value is se
    addressId: String(formData.get("addressId") || ""),
  };

  const parsed = CreateStoreSchema.safeParse(raw);

  console.log("token", token);

  if (!parsed.success) {
    return {
      errors: parsed.error.format(),
      name: formData.get("name"),
      description: formData.get("description"),
      storeCode: formData.get("storeCode"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      website: formData.get("website"),
      addressId: formData.get("addressId"),
      status: formData.get("status"),
      success: false,
    };
  }

  const apiFormData = new FormData();
  apiFormData.append(
    "createStoreRequest",
    new Blob([JSON.stringify(parsed.data)], { type: "application/json" })
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/store/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: apiFormData,
    }
  );

  if (!res.ok) {
    const errorJson = await res.json(); // assuming your API sends a JSON response with `message`
    return {
      errors: {},
      name: raw.name,
      description: raw.description,
      storeCode: raw.storeCode,
      email: raw.email,
      phoneNumber: raw.phoneNumber,
      website: raw.website,
      addressId: raw.addressId,
      status: raw.status,
      success: false,
      message: errorJson.message || "Create Store failed",
    };
  }

  return { data: await res.json(), success: true };
}

interface PageParams {
  params: {
    storeId: string;
  };
}

export default async function getStores({ params }: PageParams) {
  const { storeId } = await params;
  if (!storeId) {
    redirect("/dashboard/company/stores"); // redirect to the home page if no storeId is provided in the url
  }

  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) redirect("/login");

  const resStore = await apiRequest(`/store/${storeId}`, token);

  const resInventroy = await apiRequest(
    `/inventory/get?strId=${storeId}`,
    token,
    "GET",
    String(process.env.NEXT_PUBLIC_API_BASE_URL_INVENTORY)
  );
  console.log(resStore.data);
  console.log(resInventroy);

  return (
    <>
      <StoreCard
        store={resStore.data}
        token={token}
        statistics={resInventroy.statistics}
      />
      <ProductsTable
        products={resInventroy.data}
        storeName={resStore.data.name}
      />
    </>
  );
}
