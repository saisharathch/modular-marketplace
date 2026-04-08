import React, { createContext, useContext, useEffect, useState } from "react";
import { initialProducts } from "../data/initialProducts";
import type { Product } from "../types/product";

type CreateProductInput = {
  title: string;
  price: number;
  category: string;
  description: string;
};

type ProductsContextValue = {
  products: Product[];
  addProduct: (product: CreateProductInput) => void;
  updateProduct: (id: string, data: CreateProductInput) => void;
  deleteProduct: (id: string) => void;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

const PRODUCTS_STORAGE_KEY = "modular-marketplace-products";

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);

    if (!storedProducts) return initialProducts;

    try {
      return JSON.parse(storedProducts);
    } catch {
      return initialProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: CreateProductInput) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...product,
    };

    setProducts((currentProducts) => [newProduct, ...currentProducts]);
  };

  const updateProduct = (id: string, updatedData: CreateProductInput) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product,
      ),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    );
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
