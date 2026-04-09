import { useMemo } from "react";
import {
  getCartItemCount,
  getCartLineItems,
  getCartSubtotal,
} from "../../../entities/cart/selectors";
import { useCart } from "../../../providers/CartProvider";
import { useProducts } from "../../../providers/ProductsProvider";

export function useCartSummary() {
  const { items } = useCart();
  const { products } = useProducts();

  const lineItems = useMemo(
    () => getCartLineItems(items, products),
    [items, products],
  );
  const totalItems = useMemo(() => getCartItemCount(items), [items]);
  const subtotal = useMemo(
    () => getCartSubtotal(items, products),
    [items, products],
  );

  return {
    lineItems,
    totalItems,
    subtotal,
    isEmpty: items.length === 0,
  };
}
