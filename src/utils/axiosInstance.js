import axios from "axios";

const getAxiosInstance = (port) => {
  return axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_API_BASE_URL_ADDRESS ||
      `http://localhost:${port}`,
    timeout: 10000, // 10 seconds timeout
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
  });
};

const axiosInstance = getAxiosInstance();
// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export { getAxiosInstance };
export default axiosInstance;
