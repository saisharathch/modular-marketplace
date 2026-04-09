import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../types/product";
import { productRepository } from "../features/products/model/productRepository";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "../features/products/model/productRepository";

type ProductsContextValue = {
  products: Product[];
  addProduct: (product: CreateProductInput) => void;
  updateProduct: (id: string, data: UpdateProductInput) => void;
  deleteProduct: (id: string) => void;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = productRepository.getAll();
    setProducts(allProducts);
  }, []);

  const addProduct = (input: CreateProductInput) => {
    const updated = productRepository.create(input);
    setProducts(updated);
  };

  const updateProduct = (id: string, input: UpdateProductInput) => {
    const updated = productRepository.update(id, input);
    setProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = productRepository.remove(id);
    setProducts(updated);
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  return context;
}
