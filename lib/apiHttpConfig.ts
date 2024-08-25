import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

// Create an Axios instance with base configuration
const SportyGalaxyHttp: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor to add headers or modify the request
SportyGalaxyHttp.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses and errors
SportyGalaxyHttp.interceptors.response.use(
  (response) => {
    // Return successful response data
    console.log("HTTPS - Success: ", response?.data);
    return response;
  },
  (error) => {
    // Handle error globally

    console.error(
      "HTTPS - Error: ",
      error.response ? error.response.data : error.message
    );

    // Structure the custom error response
    const customError = {
      ...(error.response?.data && {
        data: error.response.data,
      }),
    };

    return Promise.reject(customError);
  }
);

// Helper function to handle requests
export const axiosBaseQuery = async (
  config: AxiosRequestConfig
): Promise<{ data?: any; error?: any; meta?: any }> => {
  try {
    const response = await SportyGalaxyHttp.request(config);
    return {
      ...response.data,
    };
  } catch (error: any) {
    return {
      ...(error.data && {
        ...error.data,
      }),
    };
  }
};
