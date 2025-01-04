import { PaystackTransaction } from "./paystack";

export interface InitializePayment {
  reference: string;
  backendReference: string;
  transactionLog: PaystackTransaction;
}
