import AddressForm from "./address-client";

interface AddressPageProps {
  params: { addressId: string };
}

export default async function AddressPage({ params }: AddressPageProps) {
  const addressId = params.addressId;
  console.log(addressId)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ADDRESS}/address/management/get/${addressId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  console.log(res);
  return <AddressForm />;
}
