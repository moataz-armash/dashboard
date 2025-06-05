"use client";

import { useActionState, useEffect, useMemo, useState } from "react";

import Select from "react-select";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AddressInfo } from "./components/type";
import createAddressInfo from "./components/api";
import {
  AddressData,
  CreateAddressByCoordinate,
  createaddressByInfo,
  updateAddressInfo,
} from "./components/actions";
import Spinner from "@/components/ui/spinner";
import toast from "react-hot-toast";
import BackLink from "@/components/ui/back-link";
import { useRouter, useSearchParams } from "next/navigation";
import { MoveRight, Zap } from "lucide-react";
import { addressSchema } from "./components/schema";
import DropdownProduct from "../company/products/[productId]/components/dropDown-product";
import { addressTags } from "./components/dropdown";

const initialState = {
  errors: {},
  message: "",
  success: false,
  countryName: "",
  state: "",
  county: "",
  district: "",
  street: "",
  houseNumber: "",
  postalCode: "",
  addressDetails: "",
  addressTags: [],
};

interface AddressFormProps {
  address: AddressInfo;
  addressId: string;
}

export default function AddressForm({ address, addressId }: AddressFormProps) {
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId") || "";
  const storeName = searchParams.get("storeName") || "";
  const [message, setMessage] = useState<string | null>(null);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  const [loadingAddress, setLoadingAddress] = useState(false);
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    addressInfo ? updateAddressInfo : createaddressByInfo,
    initialState
  );

  console.log(state);

  useEffect(() => {
    if (state?.success) {
      toast.success(
        state?.message || addressInfo
          ? "Address updated successfully"
          : "Address created successfully"
      );
      router.push(`/dashboard/company/stores/${storeId}`);
    } else if (state?.message) {
      toast.error(state?.message);
    } else if (state?.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the highlighted errors.");
    }
  }, [state, router, storeId, addressInfo]);

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingAddress(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("User location:", latitude, longitude);

        setAddressData({
          lat: latitude,
          lng: longitude,
          addressDetails: "",
          addressTags: [],
        });
      },
      (error) => {
        setMessage(
          "Could not get location. Please enable GPS, to get location dynamically"
        );

        return;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
    setLoadingAddress(false);
  };

  useEffect(() => {
    if (
      address &&
      !state?.success &&
      Object.keys(state?.errors || {}).length === 0
    ) {
      setAddressInfo(address); // for your reference if needed elsewhere
    }
  }, [address, state]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 7000);
    }
  }, [message, setMessage]);

  useEffect(() => {
    if (addressData) {
      async function createAddress() {
        const data = await CreateAddressByCoordinate(addressData);
        setAddressInfo(data.data);
        console.log(data.data);
        setLoadingAddress(false);
        toast.success("We get your address successfully");
      }
      createAddress();
    }
  }, [addressData]);

  const getFieldVal = (field: keyof AddressInfo) =>
    (state as any)?.[field] || addressInfo?.[field] || "";

  const errorMessage = (field: keyof AddressInfo) =>
    (state?.errors as Record<keyof AddressInfo, string[]>)?.[field] && (
      <p className="text-red-500 text-sm">
        {(state?.errors as Record<keyof AddressInfo, string[]>)?.[field]}
      </p>
    );

  useEffect(() => {
    if (addressInfo?.addressTags) {
      const matchedTags = addressTags.filter((tag) =>
        addressInfo.addressTags.includes(tag.value)
      );
      setSelectedTags(matchedTags);
    }
  }, [addressInfo]);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <BackLink
          link={`/dashboard/company/stores/${storeId}`}
          title={storeName}
        />
      </div>

      <Card className="p-6 mt-4 rounded-lg shadow-md w-[90%] max-w-6xl mx-auto">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Add Address</h2>
          <Button
            onClick={handleLocation}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-700"
            disabled={loadingAddress}
          >
            fill form auto <Zap />
          </Button>
        </div>
        <form action={formAction} className="grid grid-cols-2 gap-6">
          <div>
            {/* Manual Address Fields */}
            <Label htmlFor="countryName">Country</Label>
            <Input
              name="countryName"
              defaultValue={getFieldVal("countryName")}
              className="text-black"
            />
            {errorMessage("countryName")}
            <input name="addressId" defaultValue={addressId} hidden />
            <input name="storeId" defaultValue={storeId} hidden />
            <Label htmlFor="state">State</Label>
            <Input name="state" defaultValue={getFieldVal("city")} />
            {errorMessage("state")}
            <Label htmlFor="county">County</Label>
            <Input name="county" defaultValue={getFieldVal("county")} />
            {errorMessage("county")}
            <Label htmlFor="addressTags">Address Tags</Label>
            <Select
              isMulti
              instanceId="address-select"
              options={addressTags}
              value={selectedTags}
              onChange={setSelectedTags}
            />

            {state?.errors?.addressTags && (
              <p className="text-red-500 text-sm">
                At least one address tag is required
              </p>
            )}
            <input
              name="addressTags"
              defaultValue={
                selectedTags.length
                  ? selectedTags.map((tag) => tag.value).join(",")
                  : (address?.addressTags || []).join(",")
                // selectedTags
                //   .map((tag: { label: string; value: string }) => tag.value)
                //   .join(",") ||
                // (addressInfo?.addressTags?.length > 0 &&
                //   addressInfo?.addressTags
                //     .map((tag: { label: string; value: string }) => tag.value)
                //     .join(","))
              }
              hidden
            />
          </div>
          <div>
            <Label htmlFor="district">District</Label>
            <Input name="district" defaultValue={getFieldVal("district")} />
            {errorMessage("district")}
            <Label htmlFor="street">Street</Label>
            <Input name="street" defaultValue={getFieldVal("street")} />
            {errorMessage("street")}
            <Label htmlFor="houseNumber">House Number</Label>
            <Input
              name="houseNumber"
              type="number"
              inputMode="numeric"
              defaultValue={getFieldVal("houseNumber")}
            />
            {/* {errorMessage("houseNumber")} */}
            <Label>Postal Code</Label>
            <Input
              name="postalCode"
              type="number"
              inputMode="numeric"
              defaultValue={getFieldVal("postalCode")}
            />
            {errorMessage("postalCode")}
          </div>

          <Label className="col-span-2 w-full">Address Details</Label>
          <textarea
            name="addressDetails"
            type="text"
            inputMode="text"
            placeholder="this is my company address...."
            className="col-span-2 text-gray-700 bg-gray-100 px-2 py-3 rounded-xl placeholder:text-gray-400"
            defaultValue={getFieldVal("addressDetails")}
          />

          <Button
            type="submit"
            className="col-span-2 bg-brand-500 hover:bg-brand-600"
            disabled={pending}
          >
            {addressInfo ? "Update" : "Create"}{" "}
            {pending ? <Spinner /> : <MoveRight />}
          </Button>
        </form>
      </Card>
    </>
  );
}
