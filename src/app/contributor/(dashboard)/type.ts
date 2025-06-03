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

export type { Stores };
