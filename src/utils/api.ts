import axiosInstance, { getAxiosInstance } from "./axiosInstance";

export const registerNewUser = async (registerData: {
  username: string;
  email: string;
  password: string;
}): Promise<Record<string, string>> => {
  try {
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY
    );
    const res = await axiosCompany.post(`/auth/register`, registerData);
    console.log(res.data.data);
    localStorage.setItem("userInfo", JSON.stringify(res?.data?.data));
    localStorage.setItem("token", res.data.data.verificationToken);
    return res.data;
  } catch (error) {
    throw new Error(`Error while register new user ${error}`);
  }
};

export const verifyEmail = async (registerData: {
  token: string;
}): Promise<Record<string, string>> => {
  try {
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY
    );
    const res = await axiosCompany.post(`/auth/verify-email`, registerData);
    // localStorage.setItem("token", res.data.data.verificationToken);
    return res.data;
  } catch (error) {
    throw new Error(`Error while register new user ${error}`);
  }
};
