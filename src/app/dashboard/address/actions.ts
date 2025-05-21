"use server";
import axios from "axios";

export interface AddressData {
  lat: number;
  lng: number;
  addressDetails: string;
  addressTags: string[];
}

export default async function CreateAddressByCoordinate(
  addressData: AddressData | null
) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ADDRESS}/address/management/create/coordinates`,
    addressData
  );
  return res.data;
}
