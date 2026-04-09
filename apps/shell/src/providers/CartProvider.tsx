import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "../types/cart";
import { cartRepository } from "../features/cart/model/cartRepository";
import { productRepository } from "../features/products/model/productRepository";

type AddToCartInput = {
  productId: string;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: AddToCartInput) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => cartRepository.getAll());

  const products = productRepository.getAll();

  useEffect(() => {
    cartRepository.save(items);
  }, [items]);

  const addToCart = ({ productId }: AddToCartInput) => {
    setItems((currentItems) => {
      const existing = currentItems.find(
        (item) => item.productId === productId,
      );

      if (existing) {
        return currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { productId, quantity: 1 }];
    });
  };

  const increaseQty = (productId: string) => {
    setItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (productId: string) => {
    setItems((items) =>
      items
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productId: string) => {
    setItems((items) => items.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    cartRepository.clear();
    setItems([]);
  };

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + product.price * item.quantity;
    }, 0);
  }, [items]);

  const value = {
    items,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
