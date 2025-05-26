import { CategoriesFormatter } from "@/lib/helpers";

export const addressOptions = [
  "COMPANY",
  "GROCERY",
  "MARKET",
  "RESTAURANT",
  "BAKERY",
  "CAFE",
  "CLOTHING",
] as const;

export const addressTags = CategoriesFormatter([...addressOptions]);
