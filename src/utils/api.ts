import { getAxiosInstance } from "./axiosInstance";

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

export const loginUser = async (registerData: {
  username: string;
  email: string;
  password: string;
}): Promise<Record<string, string>> => {
  try {
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY
    );
    const res = await axiosCompany.post(`/auth/login`, registerData);
    console.log(res.data.data);
    localStorage.setItem("userInfo", JSON.stringify(res?.data?.data));
    localStorage.setItem("token", res.data.data.verificationToken);
    return res.data;
  } catch (error) {
    throw new Error(`Error while register new user ${error}`);
  }
};

export const createCompany = async (companyData: {
  name: string;
  registerationNumber: number;
}): Promise<Record<string, string>> => {
  try {
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY
    );
    const res = await axiosCompany.post(`/company/create`, companyData);
    console.log(res.data.data);
    return res.data;
  } catch (error) {
    throw new Error(`Error while register new user ${error}`);
  }
};

export const verifyEmail = async (registerData: {
  token: string;
  username: string;
}): Promise<Record<string, string>> => {
  try {
    console.log(registerData);
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY
    );
    const res = await axiosCompany.post(
      `/auth/verify-email?token=${registerData.token}&username=${registerData.username}`
    );
    localStorage.setItem("token", res.data.data.verificationToken);
    return res.data;
  } catch (error) {
    throw new Error(`Error while register new user ${error}`);
  }
};

export const forgetPassword = async (
  email: string
): Promise<Record<string, string>> => {
  try {
    console.log(email);
    const axiosCompany = getAxiosInstance(
      process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY
    );
    const res = await axiosCompany.post(`/auth/forgot-password?email=${email}`);
    console.log(res.data);
    localStorage.setItem("resetToken", res.data.data.resetToken);
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
      process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY
    );
    const { resetToken, email, newPassword, confirmPassword } = data;
    const res = await axiosCompany.post(
      `/auth/reset-password?token=${resetToken}&email=${email}`,
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
