export const storeFields = {
  name: { title: "Name", name: "name" },
  email: { title: "Email", name: "email" },
  storeCode: { title: "Store Code", name: "storeCode" },
  description: { title: "Description", name: "description" },
  phoneNumber: { title: "Phone Number", name: "phoneNumber" },
  website: { title: "Website", name: "website" },
  status: { title: "Status", name: "status" },
};

export const initialStoreState = {
  errors: {},
  name: "",
  email: "",
  storeCode: "",
  description: "",
  phoneNumber: "",
  website: "",
  status: "",
  addressId: null,
  success: false,
  message: "",
};
