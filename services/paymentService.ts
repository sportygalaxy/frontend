import { InitializePayment } from "@/types/payment";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface PaymentRequest {
  userId: string;
  amount: number;
  currency: string;
  gatewayName: string;
}

interface PaymentResponse {
  message: string;
  data: {
    transactionId: string;
    paymentUrl?: string; // For hosted payment gateways
    reference: string;
  };
  success: boolean;
}

interface PaymentVerifyResponse {
  message: string;
  data: {
    status: boolean;
    reference: string;
  };
  success: boolean;
}

export const initiatePayment = async (
  paymentData: PaymentRequest
): Promise<PaymentResponse> => {
  try {
    const response: AxiosResponse<PaymentResponse> = await axios.post(
      `${API_BASE_URL}/payments/process`,
      paymentData
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error initiating payment:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Payment initiation failed."
    );
  }
};

export const finalizePayment = async (
  initializePaymentPayload: InitializePayment
): Promise<any> => {
  try {
    const response: AxiosResponse<PaymentVerifyResponse> = await axios.post(
      `${API_BASE_URL}/payments/finalize`,
      initializePaymentPayload
    );
    return response?.data?.data?.status;
  } catch (error: any) {
    console.error(
      "Error finalizing payment:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message || "Payment finalization failed."
    );
  }
};
