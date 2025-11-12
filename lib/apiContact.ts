
import { IContactUsPayload, IContactUsResponse } from "@/types/contact";
import axios from "axios";

export async function sendContactMessage(
  data: IContactUsPayload
): Promise<IContactUsResponse> {
  const response = await axios.post("/api/contact", data); // your backend route
  return response.data;
}
