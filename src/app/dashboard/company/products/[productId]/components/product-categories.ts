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

export const ProductCategories = categories.map((cat) => ({
  label: cat
    .replace(/_/, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()),
  value: cat,
}));
