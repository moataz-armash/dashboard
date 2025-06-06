type Store = {
  id: string;
  name: string;
  profilePicture: string;
  email: string;
  phoneNumber: string;
  status: string;
  addressId: string;
};

type Stores = {
  stores: Store[];
};

interface Location {
  x: number;
  y: number;
  type: string; // usually "Point"
  coordinates: [number, number];
}

interface Address {
  id: string;
  addressId: string;
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string | null;
  state: string | null;
  county: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  houseNumber: string | null;
  addressTags: string[];
  addressDetails: string;
  lat: number;
  lng: number;
  location: Location;
  belongsTo: string | null;
}

interface Addresses {
  addresses: Address[];
}

interface ClientHomePageProps {
  stores: Store[];
  response: Promise<any>;
  currentPage: number;
}

export type { Stores, Address, ClientHomePageProps };
