"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addressInfo } from "./type";
import createAddressInfo from "./api";
import { useCallback, useEffect, useState } from "react";
import CreateAddressByCoordinate, { addressData } from "./actions";
import Spinner from "@/components/ui/spinner";
import toast from "react-hot-toast";
import BackLink from "@/components/ui/back-link";
import { useSearchParams } from "next/navigation";
import { MoveRight, SendHorizonal, Zap } from "lucide-react";

// 📌 Address validation schema
const addressSchema = z.object({
  countryName: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  county: z.string().optional(),
  district: z.string().min(2, "District is required"),
  street: z.string().min(2, "Street is required"),
  houseNumber: z.string().min(1, "House Number is required"),
  postalCode: z.string().min(2, "Postal Code is required"),
  latitude: z.number(),
  longitude: z.number(),
});

interface AddressInfo {
  countryName: string;
  state: string;
  county: string;
  district: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  addressDetails: string;
  addressTags: string[];
}

const AddressForm = () => {
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId") || "";
  const storeName = searchParams.get("storeName") || "";
  const [message, setMessage] = useState<string | null>(null);
  const [addressData, setAddressData] = useState<addressData | null>(null);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  //
  const [loadingAddress, setLoadingAddress] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      countryName: "",
      state: "",
      county: "",
      district: "",
      street: "",
      houseNumber: "",
      postalCode: "",
      latitude: 48.8566, // Default Paris
      longitude: 2.3522,
    },
  });

  const onSubmit = (data: addressInfo) => {
    createAddressInfo({
      countryName: data.countryName,
      state: data.state,
      county: data.county,
      district: data.district,
      street: data.street,
      houseNumber: data.houseNumber,
      postalCode: data.postalCode,
      addressDetails: " ",
      addressTags: [""],
    });

    console.log("Submitted Address Data:", {
      countryNmae: data.countryName,
      state: data.state,
      county: data.county,
      district: data.district,
      street: data.street,
      houseNumber: data.houseNumber,
      postalCode: data.postalCode,
      addressDetails: "",
      addressTags: [""],
    });
    console.log("success");
  };

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
        setValue("latitude", latitude);
        setValue("longitude", longitude);
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

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     setMessage("Geolocation is not supported by your browser.");
  //     return;
  //   }

  //   setLoadingAddress(true);
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       console.log("User location:", latitude, longitude);

  //       setAddressData({
  //         lat: latitude,
  //         lng: longitude,
  //         addressDetails: "",
  //         addressTags: [],
  //       });

  //       // Example: update state or form values
  //       setValue("latitude", latitude);
  //       setValue("longitude", longitude);
  //       // setMapCenter({ lat: latitude, lng: longitude });
  //     },
  //     (error) => {
  //       // console.error("Error getting location:", error);
  //       setMessage(
  //         "Could not get location. Please enable GPS, to get location dynamically"
  //       );

  //       return;
  //       // alert("Could not get location. Please enable GPS.");
  //     },
  //     {
  //       enableHighAccuracy: true, // use GPS if available
  //       timeout: 10000,
  //     }
  //   );
  //   setLoadingAddress(false);
  // }, [setValue, setAddressData]);

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
        console.log(data);
        setLoadingAddress(false);
        toast.success("We get your address successfully");
      }
      createAddress();
    }
  }, [addressData, setLoadingAddress]);

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <div>
            {/* Manual Address Fields */}
            <Label>Country</Label>
            <Input
              {...register("countryName")}
              defaultValue={addressInfo?.countryName}
            />
            <Label>State</Label>
            <Input {...register("state")} defaultValue={addressInfo?.state} />
            <Label>County</Label>
            <Input {...register("county")} defaultValue={addressInfo?.county} />
          </div>
          <div>
            <Label>District</Label>
            <Input
              {...register("district")}
              defaultValue={addressInfo?.district}
            />
            <Label>Street</Label>
            <Input {...register("street")} defaultValue={addressInfo?.street} />
            <Label>House Number</Label>
            <Input
              {...register("houseNumber")}
              defaultValue={addressInfo?.houseNumber}
            />
            <Label>Postal Code</Label>
            <Input
              {...register("postalCode")}
              defaultValue={addressInfo?.postalCode}
            />
          </div>
          <Button
            type="submit"
            className="col-span-2 bg-brand-500 hover:bg-brand-600"
          >
            Submit <MoveRight />
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddressForm;
