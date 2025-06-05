"use server";
import axios from "axios";
import { addressSchema } from "./schema";
import { cookies } from "next/headers";

export interface AddressData {
  lat: number;
  lng: number;
  addressDetails: string;
  addressTags: string[];
}

export async function CreateAddressByCoordinate(
  addressData: AddressData | null
) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ADDRESS}/address/management/create/coordinates`,
    addressData
  );
  return res.data;
}

export async function updateAddressInfo(prevState: any, formData: FormData) {
  const rawOptions = formData.get("addressTags");

  const addressData = {
    countryName: formData.get("countryName"),
    state: formData.get("state"),
    county: formData.get("county"),
    district: formData.get("district"),
    street: formData.get("street"),
    houseNumber: formData.get("houseNumber"),
    postalCode: formData.get("postalCode"),
    addressDetails: formData.get("addressDetails"),
    addressTags: typeof rawOptions === "string" ? rawOptions.split(",") : [],
    belongsTo: formData.get("storeId"),
  };

  const result = addressSchema.safeParse(addressData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      countryName: formData.get("countryName"),
      state: formData.get("state"),
      county: formData.get("county"),
      district: formData.get("district"),
      street: formData.get("street"),
      houseNumber: formData.get("houseNumber"),
      postalCode: formData.get("postalCode"),
      addressDetails: formData.get("addressDetails") || "",
      addressTags: formData.getAll("addressTags"),
      belongsTo: formData.get("storeId"),
      // formData.getAll("addressTags").length === 1 &&
      // formData.getAll("addressTags")[0] === ""
      //   ? undefined
      //   : formData.getAll("addressTags"),
    };
  }

  const addressId = formData.get("addressId");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ADDRESS}/address/management/update/${addressId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    }
  );

  console.log(res);

  if (!res.ok) {
    const errorJson = await res.json();
    return {
      success: false,
      errors: {},
      countryName: addressData.countryName,
      state: addressData.state,
      county: addressData.county,
      district: addressData.district,
      street: addressData.street,
      houseNumber: addressData.houseNumber,
      postalCode: addressData.postalCode,
      addressDetails: addressData.addressDetails,
      addressTags: addressData.addressTags,
      message: errorJson.message || "Address update failed",
    };
  }

  return {
    success: true,
    data: await res.json(),
  };
}

export async function createaddressByInfo(prevState: any, formData: FormData) {
  const rawOptions = formData.get("addressTags");

  const addressData = {
    countryName: formData.get("countryName"),
    state: formData.get("state"),
    county: formData.get("county"),
    district: formData.get("district"),
    street: formData.get("street"),
    houseNumber: formData.get("houseNumber"),
    postalCode: formData.get("postalCode"),
    addressDetails: formData.get("addressDetails"),
    addressTags: typeof rawOptions === "string" ? rawOptions.split(",") : [],
    belongsTo: formData.get("storeId"),
  };

  const result = addressSchema.safeParse(addressData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      countryName: formData.get("countryName"),
      state: formData.get("state"),
      county: formData.get("county"),
      district: formData.get("district"),
      street: formData.get("street"),
      houseNumber: formData.get("houseNumber"),
      postalCode: formData.get("postalCode"),
      addressDetails: formData.get("addressDetails") || "",
      addressTags: formData.getAll("addressTags"),
      belongsTo: formData.get("storeId"),
      // formData.getAll("addressTags").length === 1 &&
      // formData.getAll("addressTags")[0] === ""
      //   ? undefined
      //   : formData.getAll("addressTags"),
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ADDRESS}/address/management/create/info`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    }
  );

  if (!res.ok) {
    const errorJson = await res.json();
    return {
      success: false,
      errors: {},
      countryName: addressData.countryName,
      state: addressData.state,
      county: addressData.county,
      district: addressData.district,
      street: addressData.street,
      houseNumber: addressData.houseNumber,
      postalCode: addressData.postalCode,
      addressDetails: addressData.addressDetails,
      addressTags: addressData.addressTags,
      message: errorJson.message || "Address creation failed",
    };
  }

  return {
    success: true,
    data: await res.json(),
  };
}
