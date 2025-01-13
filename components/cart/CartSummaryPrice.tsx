import useCartStore from "@/store/cartStore";
import CartSummaryRow from "./CartSummaryRow";
import { showTotalPrice, showTotalPriceInCart } from "@/helpers/cart";
import { SHIPPING_FEE } from "@/app/(main)/products/ProductConstant";

interface CartSummaryPriceProps {
  paymentAmount?: number;
}
const CartSummaryPrice: React.FC<CartSummaryPriceProps> = ({
  paymentAmount,
}) => {
  const { cart } = useCartStore();

  const total = showTotalPrice(showTotalPriceInCart(cart), SHIPPING_FEE) || 0;

  const totalPaymentPrice = () => {
    if (paymentAmount) return paymentAmount + SHIPPING_FEE;

    return total;
  };
  return (
    <div>
      <CartSummaryRow
        label="Total amount"
        value={showTotalPriceInCart(cart) || 0}
        underline
        onLabelClick={() => console.log("Label clicked")}
      />
      <CartSummaryRow label="Shipping total" value={SHIPPING_FEE || 0} />
      <CartSummaryRow
        label="Amount to Pay"
        value={totalPaymentPrice() || 0}
        bold
      />
    </div>
  );
};

export default CartSummaryPrice;
