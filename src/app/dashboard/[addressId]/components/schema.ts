import { z } from "zod";
import { addressOptions } from "./dropdown";

export const addressSchema = z.object({
  countryName: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  county: z.string().min(2, "County is required"),
  district: z.string().min(2, "District is required"),
  street: z.string().min(2, "Street is required"),
  houseNumber: z.string().min(1, "House Number is required"),
  postalCode: z.string().min(2, "Postal Code is required"),
  addressDetails: z.string().optional(),
  addressTags: 
  z
    .array(z.enum(addressOptions), {
      required_error: "Address Tag is required",
    })
    .min(1, "At least one address tag is required"),
});

export type addressInput = z.infer<typeof addressSchema>;
