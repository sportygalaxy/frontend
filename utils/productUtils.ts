interface CartItem {
  id: string;
  colors: string;
  sizes: string;
  qty: number;
  price?: number;
}

interface TransformedCart {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }[];
  variant: any;
}

export function transformCartArray(
  userId: string,
  cart: any[]
): TransformedCart {
  console.log("ccc check cart", cart);
  return {
    userId,
    items: cart?.map((item) => ({
      productId: item.id,
      quantity: item.qty,
      ...(item.sizes && { size: item.sizes }),
      ...(item.colors && { color: item.colors }),
    })),
    variant: cart?.[0]?.variant,
  };
}

// example usage
// transformCartArray(userId, cart);
