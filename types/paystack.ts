type IPaystackAuthorization = {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel?: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable?: boolean;
  signature?: string;
  account_name?: string;
};

type IPaystackCustomer = {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  customer_code: string;
  phone?: string;
  metadata?: unknown;
  risk_action: string;
  international_format_phone?: unknown;
};

type IPaystackLog = {
  start_time: number;
  time_spent: number;
  attempts: number;
  errors: number;
  success: boolean;
  mobile: boolean;
  input?: unknown;
  authentication?: string;
  channel?: unknown;
  history: {
    type: string;
    message: string;
    time: number;
  }[];
};

export type PaystackVerifyTransactionRes = {
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata?: string;
    log: IPaystackLog;
    fees: number;
    fees_split?: unknown;
    authorization: IPaystackAuthorization;
    customer: IPaystackCustomer;
    plan?: string;
    split?: unknown;
    order_id?: string;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data?: unknown;
    source?: unknown;
    fees_breakdown?: unknown;
    transaction_date: string;
    plan_object?: unknown;
    subaccount?: unknown;
  };
  message: string;
  status: boolean;
};

export interface PaystackPaymentUIProps {
  email: string;
  amount: number;
  onSuccess: (transaction: PaystackTransaction) => void;
  onCancel: () => void;
}

export interface PaystackTransaction {
  reference: string;
  status: string;
  transaction: string;
  // Add any other fields you need
  trans?: string;
  message?: string;
  trxref?: string;
  redirecturl?: string;
}
