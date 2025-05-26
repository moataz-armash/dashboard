import { CategoriesFormatter } from "@/lib/helpers";

const categories = [
  "ELECTRONICS",
  "FASHION",
  "HOME_APPLIANCES",
  "BOOKS",
  "GROCERIES",
  "SPORTS",
  "TOYS",
  "BEAUTY",
  "HEALTH",
  "AUTOMOTIVE",
  "TOOLS",
  "OTHERS",
];

export const ProductCategories = CategoriesFormatter(categories);
