import type { Product } from "../product/types";

export interface CartLineItem extends CartItem {
  product: Product;
}
