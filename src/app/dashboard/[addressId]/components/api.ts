import axiosInstance from "@/utils/axiosInstance";
import { AddressInfo } from "./type";
const createAddressInfo = async (addressInfo: AddressInfo) => {
  try {
    const response = await axiosInstance.post(
      "/address/management/create/info",
      addressInfo
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export default createAddressInfo;
