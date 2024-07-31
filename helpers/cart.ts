import { TCart } from "@/types/cart";

export const showCartQtyValue = (cart: TCart[]) => {
  let notification = {
    status: false,
    value: 0,
  };

  if (cart && cart.length >= 1) {
    notification.status = cart.length >= 1;
    notification.value = cart.length;
  }

  return notification;
};

export const SHIPPING_FEE = 10;
export const showTotalPriceInCart = (cart: TCart[]) => {
  const totalPrice = cart.reduce((accumulator: number, currentItem: any) => {
    return accumulator + currentItem.price * currentItem.qty;
  }, 0);

  return totalPrice;
};


export const showTotalPrice = (showTotalPriceInCart: number, shippingFee: number) => {
  return showTotalPriceInCart + shippingFee;
};