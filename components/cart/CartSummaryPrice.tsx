import useCartStore from "@/store/cartStore";
import CartSummaryRow from "./CartSummaryRow";
import {
  showShippingFeePrice,
  showTotalPrice,
  showTotalPriceInCart,
} from "@/helpers/cart";
import { SHIPPING_FEE } from "@/app/(main)/products/ProductConstant";

interface CartSummaryPriceProps {
  paymentAmount?: number;
  shippingState?: string;
}
const CartSummaryPrice: React.FC<CartSummaryPriceProps> = ({
  paymentAmount,
  shippingState,
}) => {
  const { cart } = useCartStore();

  const shippingTarget =
    shippingState === undefined || shippingState === null || shippingState === ""
      ? SHIPPING_FEE
      : shippingState;

  const shippingFee = showShippingFeePrice(
    showTotalPriceInCart(cart),
    shippingTarget
  );

  const totalPaymentPrice = () => {
    const totalAmountToPay =
      showTotalPrice(showTotalPriceInCart(cart), shippingFee) || 0;

    if (paymentAmount) {
      return paymentAmount || 0;
    }

    return totalAmountToPay;
  };

  console.log("summary", {
    paymentAmount,
    shippingState,
    shippingTarget,
    shippingFee,
  });
  return (
    <div>
      <CartSummaryRow
        label="Total amount"
        value={showTotalPriceInCart(cart) || 0}
        underline
        onLabelClick={() => console.log("Label clicked")}
      />
      {shippingFee}
      <CartSummaryRow label="Shipping total" value={Number(shippingFee) || 0} />
      <CartSummaryRow
        label="Amount to Pay"
        value={totalPaymentPrice() || 0}
        bold
      />
    </div>
  );
};

export default CartSummaryPrice;
