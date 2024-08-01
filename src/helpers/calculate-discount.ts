interface Coupon {
  id: string;
  type: "PERCENTAGE" | "PRODUCT_OFF" | "PRICE_OFF";
  value: number;
  unitCount: number | null;
  usedCount: number;
  expiration: Date | null;
  global: boolean;
}

interface Order {
  id: string;
  total: number;
  items: Array<{
    product: { price: number };
  }>;
}

interface CouponUser {
  userId: string;
  couponId: string;
  used: boolean;
  remainingCount: number | null;
}

export async function calculateDiscount(
  order: Order,
  coupon: Coupon
): Promise<number> {
  switch (coupon.type) {
    case "PERCENTAGE":
      return (order.total * coupon.value) / 100;
    case "PRODUCT_OFF":
      const minProductPrice = Math.min(
        ...order.items.map((item) => item.product.price)
      );
      return minProductPrice * coupon.value;
    case "PRICE_OFF":
      return coupon.value;
    default:
      return 0;
  }
}
