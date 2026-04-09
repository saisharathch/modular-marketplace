import type { Product } from "../../../entities/product/types";
import { initialProducts } from "../../../entities/product/mockData";
import { STORAGE_KEYS } from "../../../shared/constants/storageKeys";
import { loadFromStorage, saveToStorage } from "../../../shared/lib/storage";

export interface CreateProductInput {
  title: string;
  price: number;
  category: Product["category"];
  description: string;
  image: string;
}

export interface UpdateProductInput {
  title: string;
  price: number;
  category: Product["category"];
  description: string;
  image: string;
}

export interface ProductRepository {
  getAll(): Product[];
  getById(id: string): Product | undefined;
  create(input: CreateProductInput): Product[];
  update(id: string, input: UpdateProductInput): Product[];
  remove(id: string): Product[];
}

function generateProductId(): string {
  return crypto.randomUUID();
}

export const productRepository: ProductRepository = {
  getAll() {
    return loadFromStorage<Product[]>(STORAGE_KEYS.products, initialProducts);
  },

  getById(id) {
    return this.getAll().find((product) => product.id === id);
  },

  create(input) {
    const products = this.getAll();

    const newProduct: Product = {
      id: generateProductId(),
      ...input,
    };

    const updatedProducts = [newProduct, ...products];
    saveToStorage(STORAGE_KEYS.products, updatedProducts);

    return updatedProducts;
  },

  update(id, input) {
    const products = this.getAll();

    const updatedProducts = products.map((product) =>
      product.id === id
        ? {
            ...product,
            ...input,
          }
        : product,
    );

    saveToStorage(STORAGE_KEYS.products, updatedProducts);
    return updatedProducts;
  },

  remove(id) {
    const products = this.getAll();
    const updatedProducts = products.filter((product) => product.id !== id);

    saveToStorage(STORAGE_KEYS.products, updatedProducts);
    return updatedProducts;
  },
};
