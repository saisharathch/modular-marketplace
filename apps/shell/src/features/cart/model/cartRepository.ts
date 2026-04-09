import type { CartItem } from "../../../entities/cart/types";
import { STORAGE_KEYS } from "../../../shared/constants/storageKeys";
import {
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
} from "../../../shared/lib/storage";

export interface CartRepository {
  getAll(): CartItem[];
  save(items: CartItem[]): void;
  clear(): void;
}

export const cartRepository: CartRepository = {
  getAll() {
    return loadFromStorage<CartItem[]>(STORAGE_KEYS.cart, []);
  },

  save(items) {
    saveToStorage(STORAGE_KEYS.cart, items);
  },

  clear() {
    removeFromStorage(STORAGE_KEYS.cart);
  },
};
