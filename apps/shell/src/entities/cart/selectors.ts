import type { CartItem } from "./types";
import type { Product } from "../product/types";

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(
  items: CartItem[],
  products: Product[],
): number {
  return items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return sum;

    return sum + product.price * item.quantity;
  }, 0);
}

export function getCartLineItems(items: CartItem[], products: Product[]) {
  return items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;

      return {
        ...item,
        product,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter(Boolean);
}
