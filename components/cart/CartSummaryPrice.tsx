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
}
const CartSummaryPrice: React.FC<CartSummaryPriceProps> = ({
  paymentAmount,
}) => {
  const { cart } = useCartStore();

  const shippingFee = showShippingFeePrice(
    showTotalPriceInCart(cart),
    SHIPPING_FEE
  );

  const totalPaymentPrice = () => {
    let totalAmountToPay =
      showTotalPrice(showTotalPriceInCart(cart), shippingFee) || 0;

    if (paymentAmount)
    return paymentAmount
      ? paymentAmount || 0
      : totalAmountToPay;

    return totalAmountToPay;
  };

  return (
    <div>
      <CartSummaryRow
        label="Total amount"
        value={showTotalPriceInCart(cart) || 0}
        underline
        onLabelClick={() => console.log("Label clicked")}
      />
      <CartSummaryRow label="Shipping total" value={shippingFee || 0} />
      <CartSummaryRow
        label="Amount to Pay"
        value={totalPaymentPrice() || 0}
        bold
      />
    </div>
  );
};

export default CartSummaryPrice;
