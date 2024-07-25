import axios from "axios";

const fetchClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Example base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchPosts = async () => {
  const response = await fetchClient.get("/posts");
  return response.data;
};

export default fetchClient;
