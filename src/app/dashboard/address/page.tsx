"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

const AddressForm = () => {
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

  const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 });
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  // 📌 Fetch Address Suggestions from Nominatim API
  const fetchAddressSuggestions = async (query: string) => {
    if (query.length < 3) return;

    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: { q: query, format: "json", addressdetails: 1 },
      }
    );

    setAddressSuggestions(data);
  };

  // 📌 Handle Address Selection from Autocomplete
  const handleAddressSelect = (address: any) => {
    const { lat, lon, address: addr } = address;

    setValue("latitude", parseFloat(lat));
    setValue("longitude", parseFloat(lon));
    setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lon) });

    setValue("countryName", addr.country || "");
    setValue("state", addr.state || "");
    setValue("county", addr.county || "");
    setValue("district", addr.city || addr.town || addr.village || "");
    setValue("street", addr.road || "");
    setValue("houseNumber", addr.house_number || "");
    setValue("postalCode", addr.postcode || "");

    setAddressSuggestions([]);
  };

  // 📌 Handle Map Click to Select Address
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setValue("latitude", lat);
        setValue("longitude", lng);
        setMapCenter({ lat, lng });

        // Reverse geocode to get address details
        axios
          .get(`https://nominatim.openstreetmap.org/reverse`, {
            params: { lat, lon: lng, format: "json", addressdetails: 1 },
          })
          .then(({ data }) => {
            if (data.address) {
              setValue("countryName", data.address.country || "");
              setValue("state", data.address.state || "");
              setValue("county", data.address.county || "");
              setValue(
                "district",
                data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  ""
              );
              setValue("street", data.address.road || "");
              setValue("houseNumber", data.address.house_number || "");
              setValue("postalCode", data.address.postcode || "");
            }
          });
      },
    });

    return mapCenter ? <Marker position={mapCenter} /> : null;
  }

  const onSubmit = (data: any) => {
    console.log("Submitted Address Data:", data);
    console.log("success");
  };

  return (
    <Card className="p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Address</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Label>Search Address</Label>
        <Input
          type="text"
          placeholder="Type to search an address..."
          onChange={(e) => fetchAddressSuggestions(e.target.value)}
        />
        {addressSuggestions.length > 0 && (
          <div className="border border-gray-300 p-2 bg-white shadow-md max-h-40 overflow-y-auto">
            {addressSuggestions.map((addr, index) => (
              <p
                key={index}
                className="cursor-pointer hover:bg-gray-200 p-1"
                onClick={() => handleAddressSelect(addr)}
              >
                {addr.display_name}
              </p>
            ))}
          </div>
        )}

        {/* Manual Address Fields */}
        <Label>Country</Label>
        <Input {...register("countryName")} />
        <Label>State</Label>
        <Input {...register("state")} />
        <Label>County</Label>
        <Input {...register("county")} />
        <Label>District</Label>
        <Input {...register("district")} />
        <Label>Street</Label>
        <Input {...register("street")} />
        <Label>House Number</Label>
        <Input {...register("houseNumber")} />
        <Label>Postal Code</Label>
        <Input {...register("postalCode")} />

        {/* OpenStreetMap (Free Alternative) */}
        <Label>Pin Location</Label>
        <MapContainer
          center={mapCenter}
          zoom={14}
          style={{ width: "100%", height: "300px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit Address
        </Button>
      </form>
    </Card>
  );
};

export default AddressForm;
