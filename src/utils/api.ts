import axios, { AxiosError } from "axios";
import { getAxiosInstance } from "./axiosInstance";
// import { toast } from "react-hot-toast";

export const registerNewUser = async (registerData: {
  username: string;
  email: string;
  password: string;
}): Promise<Record<string, string>> => {
  try {
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_GATEWAY
    );
    const res = await axiosCompany.post(`company/auth/register`, registerData);
    localStorage.setItem("userInfo", JSON.stringify(res?.data?.data));
    return res.data;
  } catch (error) {
    // toast.error("Error while register new user ${error}");
    throw new Error(`Error while register new user ${error}`);
  }
};

export const loginUser = async (registerData: {
  username: string;
  email: string;
  password: string;
}): Promise<{ data: Record<string, string>; message: string }> => {
  try {
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_GATEWAY
    );
    const res = await axiosCompany.post(`company/auth/login`, registerData);
    console.log(res);
    localStorage.setItem("userInfo", JSON.stringify(res?.data.data));
    // console.log(res.data)

    if (res.status !== 200) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return { data: res.data, message: res.data.message || "Login successful" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data?.message || "An error occurred during login";
      throw new Error(errorMessage);
    }
    throw new Error(`Error while register new user ${error}`);
  }
};

export const createCompany = async (companyData: {
  name: string;
  registerationNumber: number;
}): Promise<Record<string, string>> => {
  try {
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_GATEWAY
    );
    const res = await axiosCompany.post(`company/company/create`, companyData);
    console.log(res.data.data);
    return res.data;
  } catch (error) {
    throw new Error(`Error while register new user ${error}`);
  }
};

export const verifyEmail = async (
  token: string
): Promise<Record<string, string>> => {
  try {
    console.log(token);
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_GATEWAY
    );
    console.log(axiosCompany);
    const res = await axios.post(`company/auth/verify-email?token=${token}`);
    return res.data;
  } catch (error) {
    throw new Error(`Error while verification email ${error}`);
  }
};

export const forgetPassword = async (
  email: string
): Promise<Record<string, string>> => {
  try {
    console.log(email);
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_GATEWAY
    );
    const res = await axiosCompany.post(`company/auth/forgot-password?email=${email}`);
    console.log(res.data);
    localStorage.setItem("resetToken", res.data.data.token);
    return res.data;
  } catch (error) {
    throw new Error(`Error while register new user ${error}`);
  }
};

export const resetPassword = async (data: {
  resetToken: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<Record<string, string>> => {
  try {
    console.log(data);
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_GATEWAY
    );
    const { resetToken, email, newPassword, confirmPassword } = data;
    const res = await axiosCompany.put(
      `company/auth/reset-password?token=${resetToken}&email=${email}`,
      {
        newPassword,
        confirmPassword,
      }
    );
    console.log(res.data);
    // localStorage.setItem("resetToken", res.data.data.resetToken);
    return res.data;
  } catch (error) {
    throw new Error(`Error while register new user ${error}`);
  }
};

export const apiRequest = async (
  endpoint: string,
  token: string,
  method: string = "GET",
  host: string = String(process.env.API_BASE_URL_GATEWAY ?? process.env.NEXT_PUBLIC_API_BASE_URL_GATEWAY)
) => {
  const res = await fetch(`${host}${endpoint}`, {
    method: String(method),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const text = await res.text();
  console.log(`[apiRequest] ${method} ${host}${endpoint} → ${res.status}`, text.slice(0, 300));

  if (!text) return { status: res.status, data: null };

  try {
    return JSON.parse(text);
  } catch {
    return { status: res.status, data: null, error: text.slice(0, 200) };
  }
};
