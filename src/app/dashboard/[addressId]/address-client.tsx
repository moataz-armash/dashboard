"use client";

import { useActionState, useEffect, useState } from "react";

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

export default function AddressForm(address: AddressInfo, addressId: string) {
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
      toast.success(state?.message || "Address created successfully");
      router.push(`/dashboard/company/stores/${storeId}`);
    } else if (state?.message) {
      toast.error(state?.message);
    } else if (state?.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the highlighted errors.");
    }
  }, [state, router, storeId]);

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

        // Example: update state or form values
        // setValue("latitude", latitude);
        // setValue("longitude", longitude);
        // setMapCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        // console.error("Error getting location:", error);
        setMessage(
          "Could not get location. Please enable GPS, to get location dynamically"
        );

        return;
        // alert("Could not get location. Please enable GPS.");
      },
      {
        enableHighAccuracy: true, // use GPS if available
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
      setAddressInfo(address.address); // for your reference if needed elsewhere
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

  // useEffect(() => {
  //   if (addressInfo) {
  //     setValue("countryName", addressInfo.countryName || "");
  //     setValue("state", addressInfo.state || "");
  //     setValue("county", addressInfo.county || "");
  //     setValue("district", addressInfo.district || "");
  //     setValue("street", addressInfo.street || "");
  //     setValue("houseNumber", addressInfo.houseNumber || "");
  //     setValue("postalCode", addressInfo.postalCode || "");
  //   }
  // }, [addressInfo, setValue]);

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
          {/* {message && (
            <p className="text-yellow-500 text-xs">{`${message} ,or you can use form below`}</p>
          )}
          {loadingAddress && (
            <p className="text-yellow-500">
              we trying to get your address now ....
            </p>
          )} */}

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
              defaultValue={state?.countryName || addressInfo?.countryName}
              className="text-black"
            />
            {state?.errors?.countryName && (
              <p className="text-red-500 text-sm">{state.errors.countryName}</p>
            )}
            <input name="addressId" defaultValue={addressId} hidden />
            <Label htmlFor="state">State</Label>
            <Input
              name="state"
              defaultValue={state?.state || addressInfo?.city}
            />
            {state?.errors?.state && (
              <p className="text-red-500 text-sm">{state.errors.state}</p>
            )}
            <Label htmlFor="county">County</Label>
            <Input
              name="county"
              defaultValue={state?.county || addressInfo?.county}
            />
            {state?.errors?.county && (
              <p className="text-red-500 text-sm">{state.errors.county}</p>
            )}
            <Label htmlFor="addressTags">Address Tags</Label>
            <Select
              isMulti
              options={addressTags}
              defaultValue={
                address?.addressTags
                  ? addressTags.filter((tag) =>
                      address.addressTags.includes(tag)
                    )
                  : []
              }
              onChange={(values) => {
                setSelectedTags(values);
              }}
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
            <Input
              name="district"
              defaultValue={state?.district || addressInfo?.district}
            />
            {state?.errors?.district && (
              <p className="text-red-500 text-sm">{state.errors.district}</p>
            )}
            <Label htmlFor="street">Street</Label>
            <Input
              name="street"
              defaultValue={state?.street || addressInfo?.street}
            />
            {state?.errors?.street && (
              <p className="text-red-500 text-sm">{state.errors.street}</p>
            )}
            <Label htmlFor="houseNumber">House Number</Label>
            <Input
              name="houseNumber"
              type="number"
              inputMode="numeric"
              defaultValue={state?.houseNumber || addressInfo?.houseNumber}
            />
            {state?.errors?.houseNumber && (
              <p className="text-red-500 text-sm">{state.errors.houseNumber}</p>
            )}
            <Label>Postal Code</Label>
            <Input
              name="postalCode"
              type="number"
              inputMode="numeric"
              defaultValue={state?.postalCode || addressInfo?.postalCode}
            />
            {state?.errors?.postalCode && (
              <p className="text-red-500 text-sm">{state.errors.postalCode}</p>
            )}
          </div>

          <Label className="col-span-2 w-full">Address Details</Label>
          <textarea
            name="addressDetails"
            type="text"
            inputMode="text"
            placeholder="this is my company address...."
            className="col-span-2 text-gray-700 bg-gray-100 px-2 py-3 rounded-xl placeholder:text-gray-400"
            defaultValue={state?.addressDetails || addressInfo?.addressDetails}
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
