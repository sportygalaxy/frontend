import useCartStore from "@/store/cartStore";
import CartSummaryRow from "./CartSummaryRow";
import { SHIPPING_FEE, showTotalPriceInCart } from "@/helpers/cart";

const CartSummaryPrice: React.FC = () => {
  const { cart } = useCartStore();

  const showTotalPrice = (subtotal: number, shipping: number) => {
    return subtotal + shipping;
  };

  return (
    <div>
      <CartSummaryRow
        label="Item subtotal"
        value={showTotalPriceInCart(cart) || 0}
        underline
        onLabelClick={() => console.log("Label clicked")}
      />
      <CartSummaryRow label="Shipping total" value={SHIPPING_FEE || 0} />
      <CartSummaryRow
        label="Subtotal"
        value={showTotalPrice(showTotalPriceInCart(cart), SHIPPING_FEE) || 0}
        bold
      />
    </div>
  );
};

export default CartSummaryPrice;
