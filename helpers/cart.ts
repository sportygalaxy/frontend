import { TCart } from "@/types/cart";
import { getEffectivePrice } from "./product-discount";
import { accumulateAmounts } from "./accumulate-amounts";

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

export const showTotalPriceInCartOld = (cart: TCart[]) => {
  const totalPrice = cart.reduce((accumulator: number, currentItem: any) => {
    return accumulator + currentItem.price * currentItem.qty;
  }, 0);

  return totalPrice;
};

export const showTotalPriceInCart = (cart: TCart[]) => {
  const totalPrice = cart.reduce((accumulator: number, currentItem: any) => {
    const price = currentItem?.variant?.salesPrice
      ? currentItem?.variant?.salesPrice
      : currentItem?.variant?.price;

    const itemTotalPrice =
      accumulateAmounts([
        price || 0,
        currentItem?.variant?.colorsPrice || 0,
        currentItem?.variant?.dimensionsPrice || 0,
        currentItem?.variant?.sizesPrice || 0,
        currentItem?.variant?.weightsPrice || 0,
      ]) * (currentItem?.variant?.qty || 0); // Make sure qty is a valid number, default to 0 if undefined

    return accumulator + itemTotalPrice;
  }, 0);

  return totalPrice;
};

export const showSinglePriceInCart = (cart: TCart) => {
  const price = cart?.variant?.salesPrice
    ? cart?.variant?.salesPrice
    : cart?.variant?.price;

  const itemTotalPrice =
    accumulateAmounts([
      price || 0,
      cart?.variant?.colorsPrice || 0,
      cart?.variant?.dimensionsPrice || 0,
      cart?.variant?.sizesPrice || 0,
      cart?.variant?.weightsPrice || 0,
    ]) * (cart?.variant?.qty || 0); // Make sure qty is a valid number, default to 0 if undefined

  return itemTotalPrice;
};

export const showTotalPrice = (
  showTotalPriceInCart: number,
  shippingFee: number
) => {
  return Number(showTotalPriceInCart || 0) + Number(shippingFee || 0);
};
