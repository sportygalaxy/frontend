import { axiosBaseQuery } from "./apiHttpConfig";

// Example GET request using the consolidated axiosBaseQuery function
export const GET = async (url: string, params?: any) => {
  return axiosBaseQuery({
    url,
    method: "GET",
    params,
  });
};

// Example POST request using the consolidated axiosBaseQuery function
export const POST = async (url: string, data: any) => {
  return axiosBaseQuery({
    url,
    method: "POST",
    data,
  });
};

export const PUT = async (url: string, data: any) => {
  return axiosBaseQuery({
    url,
    method: "PUT",
    data,
  });
};
