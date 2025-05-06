import SpinnerIcon from "@/assets/icons/pack/Spinner";
import { initiatePayment } from "@/services/paymentService";
import { PaystackTransaction } from "@/types/paystack";
import { formatCurrency } from "@/utils/currencyUtils";
import { useState } from "react";

interface PaystackPaymentUiProps {
  isDisabled: boolean;
  isPending: boolean;
  isAllowedToCheckoutOut: boolean;
  userId: string | any; // User ID initiating the payment
  amount: number; // Payment amount in NGN
  currency: string; // Payment currency, e.g., "NGN"
  email: string; // User's email for the payment
  onSuccess: (
    response: PaystackTransaction,
    reference: string,
    handleSubmit: () => void
  ) => void; // Callback for successful payment
  onCancel?: () => void; // Optional callback for cancelled payment
  handleSubmit: any;
  buttonText?: string;
}

const PaystackPaymentUi: React.FC<PaystackPaymentUiProps> = ({
  isDisabled,
  isPending,
  isAllowedToCheckoutOut,
  userId,
  amount,
  currency,
  email,
  onSuccess,
  onCancel,
  handleSubmit,
  buttonText,
}) => {
  const [loading, setLoading] = useState(false);

  const loadPaystackScript = (onLoad: () => void) => {
    const scriptId = "paystack-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.id = scriptId;
      script.onload = onLoad;
      document.body.appendChild(script);
    } else {
      onLoad();
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const paymentData = {
        userId,
        amount,
        currency,
        gatewayName: "PAYSTACK",
      };

      // Step 1: Initiate payment on the backend
      const { data } = await initiatePayment(paymentData);

      // Step 2: Dynamically load Paystack script and initialize payment
      loadPaystackScript(() => {
        const handler = (window as any).PaystackPop?.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
          email,
          // TODO: revert back to the price.
          amount: 10000, // Paystack processes amounts in kobo
          // amount: amount * 100, // Paystack processes amounts in kobo
          currency,
          reference: data?.reference, // Backend-generated transaction reference
          callback: (response: PaystackTransaction) => {
            const backendReference = data?.reference;

            onSuccess(response, backendReference, handleSubmit); // Trigger success callback
          },
          onClose: () => {
            console.log("Payment cancelled by user.");
            if (onCancel) onCancel(); // Trigger cancel callback if provided
          },
        });

        handler?.openIframe();
      });
    } catch (error: any) {
      console.error("Payment initiation failed:", error.message);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const disabled = isDisabled || loading || isAllowedToCheckoutOut;

  return (
    <>
      {isAllowedToCheckoutOut && (
        <p className="text-red-600">
          A minimum of {formatCurrency(30000) || 0} worth of item should be in
          your cart to proceed
        </p>
      )}
      <button
        className="w-full flex items-center justify-center text-white bg-black p-3 xs:p-5 rounded-md border-1 border-[#808080] disabled:bg-secondary disabled:text-secondary-foreground"
        type="button"
        disabled={disabled}
        onClick={handlePayment}
      >
        {isPending ? (
          <div className="mr-3">
            <SpinnerIcon width="15" height="15" color="white" />
          </div>
        ) : null}{" "}
        {loading ? "Processing..." : buttonText ? buttonText : "Pay Now"}
      </button>
    </>
  );
};

export default PaystackPaymentUi;
