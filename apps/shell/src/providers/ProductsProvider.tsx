import { createContext, useContext, useState } from "react";
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
  updateProduct: (id: string, product: CreateProductInput) => void;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (id: string, product: CreateProductInput) => {
    setProducts((currentProducts) =>
      currentProducts.map((currentProduct) =>
        currentProduct.id === id
          ? { ...currentProduct, ...product }
          : currentProduct,
      ),
    );
  };

  const addProduct = (product: CreateProductInput) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...product,
    };

    setProducts((currentProducts) => [newProduct, ...currentProducts]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct }}>
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
