import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

type AxiosBaseQuerySuccess = {
  data: any;
  message: string;
  success: boolean;
  error?: string; // optional
};

type AxiosBaseQueryError = {
  statusCode: number;
  error: string;
  success: boolean;
  data?: any; // optional
};

type AxiosBaseQueryResult = AxiosBaseQuerySuccess | AxiosBaseQueryError;

// Create an Axios instance with base configuration
const SportyGalaxyHttp: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://sporty-galaxy-dev-backend.onrender.com/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor to add headers or modify the request
SportyGalaxyHttp.interceptors.request.use(
  (config) => {
    const token = getCookie("token");

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
    console.log("HTTPS - Success: ", response?.data);
    return response;
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      throw "A network error occured";
    }

    console.error(
      "HTTPS - Error: ",
      error.response ? error.response.data : error.message
    );

    const customError = {
      ...(error.response?.data && {
        ...error.response.data,
      }),
    };

    return Promise.reject(customError);
  }
);

// Helper function to handle requests
export const axiosBaseQuery = async (
  config: AxiosRequestConfig
): Promise<AxiosBaseQueryResult> => {
  try {
    const response = await SportyGalaxyHttp.request(config);
    return {
      ...response.data,
      success: true,
    };
  } catch (error: any) {
    return {
      ...(error && {
        ...error,
      }),
      success: false,
    };
  }
};
