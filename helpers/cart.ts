import { TCart } from "@/types/cart";
import { accumulateAmounts } from "./accumulate-amounts";

type ShippingFeeRate = {
  below100k: number;
  below300k: number;
  below1m: number;
  below15m: number;
  above15m: number;
};

type ShippingFeeRule = {
  label: string;
  rates: ShippingFeeRate;
};

const createShippingRate = (
  below100k: number,
  below300k: number,
  below1m: number,
  below15m: number,
  above15m: number
): ShippingFeeRate => ({
  below100k,
  below300k,
  below1m,
  below15m,
  above15m,
});

const SHIPPING_FEE_RULES: Record<string, ShippingFeeRule> = {
  abia: { label: "Abia", rates: createShippingRate(10, 7, 5, 8, 10) },
  adamawa: {
    label: "Adamawa",
    rates: createShippingRate(12, 10, 8, 10, 12),
  },
  akwaibom: {
    label: "Akwa Ibom",
    rates: createShippingRate(10, 8, 7, 9, 11),
  },
  anambra: {
    label: "Anambra",
    rates: createShippingRate(10, 7, 5, 8, 10),
  },
  bauchi: { label: "Bauchi", rates: createShippingRate(12, 9, 8, 11, 12) },
  bayelsa: {
    label: "Bayelsa",
    rates: createShippingRate(10, 8, 7, 10, 11),
  },
  benue: { label: "Benue", rates: createShippingRate(12, 9, 8, 11, 12) },
  borno: { label: "Borno", rates: createShippingRate(12, 9, 8, 11, 12) },
  crossriver: {
    label: "Cross River",
    rates: createShippingRate(10, 8, 7, 10, 12),
  },
  delta: { label: "Delta", rates: createShippingRate(10, 7, 5, 8, 10) },
  ebonyi: { label: "Ebonyi", rates: createShippingRate(10, 7, 5, 8, 10) },
  edo: { label: "Edo", rates: createShippingRate(10, 7, 5, 8, 10) },
  ekiti: { label: "Ekiti", rates: createShippingRate(8, 5, 5, 8, 10) },
  enugu: { label: "Enugu", rates: createShippingRate(10, 7, 5, 8, 10) },
  gombe: { label: "Gombe", rates: createShippingRate(12, 9, 8, 11, 12) },
  imo: { label: "Imo", rates: createShippingRate(10, 7, 5, 8, 10) },
  jigawa: { label: "Jigawa", rates: createShippingRate(12, 9, 8, 11, 12) },
  kaduna: { label: "Kaduna", rates: createShippingRate(12, 9, 8, 11, 12) },
  kano: { label: "Kano", rates: createShippingRate(12, 9, 8, 11, 12) },
  katsina: { label: "Katsina", rates: createShippingRate(12, 9, 8, 11, 12) },
  kebbi: { label: "Kebbi", rates: createShippingRate(12, 9, 8, 11, 12) },
  kogi: { label: "Kogi", rates: createShippingRate(12, 9, 8, 11, 12) },
  kwara: { label: "Kwara", rates: createShippingRate(8, 5, 5, 8, 10) },
  lagos: { label: "Lagos", rates: createShippingRate(6, 5, 5, 7, 8) },
  nasarawa: {
    label: "Nasarawa",
    rates: createShippingRate(12, 9, 8, 11, 12),
  },
  niger: { label: "Niger", rates: createShippingRate(12, 9, 8, 11, 12) },
  ogun: { label: "Ogun", rates: createShippingRate(8, 5, 5, 8, 10) },
  ondo: { label: "Ondo", rates: createShippingRate(8, 5, 5, 8, 10) },
  osun: { label: "Osun", rates: createShippingRate(8, 5, 5, 8, 10) },
  oyo: { label: "Oyo", rates: createShippingRate(8, 5, 5, 8, 10) },
  plateau: {
    label: "Plateau",
    rates: createShippingRate(12, 9, 8, 11, 12),
  },
  rivers: { label: "Rivers", rates: createShippingRate(10, 7, 5, 8, 10) },
  sokoto: { label: "Sokoto", rates: createShippingRate(12, 9, 8, 11, 12) },
  taraba: { label: "Taraba", rates: createShippingRate(12, 9, 8, 11, 12) },
  yobe: { label: "Yobe", rates: createShippingRate(12, 9, 8, 11, 12) },
  zamfara: { label: "Zamfara", rates: createShippingRate(12, 9, 8, 11, 12) },
  abuja: {
    label: "Abuja (FCT)",
    rates: createShippingRate(10, 7, 5, 8, 10),
  },
};

const SHIPPING_STATE_ALIASES: Record<string, string> = {
  fct: "abuja",
  federalcapitalterritory: "abuja",
};

const normalizeStateKey = (state?: string) => {
  const normalized = state?.toLowerCase().replace(/[^a-z]/g, "") || "";
  if (normalized.endsWith("state")) {
    return normalized.slice(0, -5);
  }
  return normalized;
};

const getShippingRule = (state?: string): ShippingFeeRule | undefined => {
  const normalizedKey = normalizeStateKey(state);
  if (!normalizedKey) return undefined;

  if (SHIPPING_FEE_RULES[normalizedKey]) {
    return SHIPPING_FEE_RULES[normalizedKey];
  }

  if (SHIPPING_STATE_ALIASES[normalizedKey]) {
    return SHIPPING_FEE_RULES[SHIPPING_STATE_ALIASES[normalizedKey]];
  }

  return Object.values(SHIPPING_FEE_RULES).find(
    (rule) => normalizeStateKey(rule.label) === normalizedKey
  );
};

const getShippingPercentageByState = (
  state: string | undefined,
  total: number
) => {
  const rule = getShippingRule(state);
  if (!rule) return 0;

  if (total < 100000) return rule.rates.below100k;
  if (total < 300000) return rule.rates.below300k;
  if (total < 1000000) return rule.rates.below1m;
  if (total < 15000000) return rule.rates.below15m;
  return rule.rates.above15m;
};

export const SHIPPING_STATE_OPTIONS = Object.entries(SHIPPING_FEE_RULES).map(
  ([key, value]) => ({
    value: key,
    label: value.label,
  })
);

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

export const shippingFeeCalulation = (total: number, percentage?: number) => {
  const totalAmount = Number(total || 0);
  const percentageValue = Number(percentage || 0);
  const result = (totalAmount / 100) * percentageValue;
  return Number.isFinite(result) ? result : 0;
};

// export const showTotalPrice = (
//   showTotalPriceInCart: number,
//   shippingFee: number
// ) => {
//   const total = Number(showTotalPriceInCart || 0);
//   const shippingFeeResult = shippingFeeCalulation(total, shippingFee);
//   return Number(showTotalPriceInCart || 0) + Number(shippingFeeResult || 0);
// };

export const showShippingFeePrice = (
  showTotalPriceInCart: number,
  shippingFee: number | string
) => {
  const total = Number(showTotalPriceInCart || 0);
  const percentage =
    typeof shippingFee === "string"
      ? getShippingPercentageByState(shippingFee, total)
      : Number(shippingFee || 0);
  const shippingFeeResult = shippingFeeCalulation(total, percentage);
  return Number(shippingFeeResult || 0);
};

export const showTotalPrice = (
  showTotalPriceInCart: number,
  shippingFee: number
) => {
  return Number(showTotalPriceInCart || 0) + Number(shippingFee || 0);
};
