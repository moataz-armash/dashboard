export function getStoreBreadcrumbs({
  storeName,
  storeId,
  currentPageLabel,
}: {
  storeName: string;
  storeId: string;
  currentPageLabel: string;
}) {
  return [
    { label: "All Stores", href: "/dashboard/company/stores" },
    { label: storeName, href: `/dashboard/company/stores/${storeId}` },
    { label: currentPageLabel, active: true },
  ];
}
