type addressInfo = {
  countryName: string;
  state: string;
  county: string;
  district: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  addressDetails?: string;
  addressTags: [string];
};

interface Idata {
  countryName: string;
  state: string;
  district: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  county?: string | undefined;
}

interface Iaddress {
  lat: string;
  lon: string;

  address: {
    country: string;
    state: string;
    county: string;
    city: string;
    town: string;
    village: string;
    road: string;
    house_number: string;
    postcode: string;
    display_name: string;
  };
}

export type { addressInfo, Iaddress, Idata };
