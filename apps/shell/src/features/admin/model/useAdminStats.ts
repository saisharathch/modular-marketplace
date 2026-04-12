import { useMemo } from "react";
import { useProducts } from "@/providers/ProductsProvider";

export function useAdminStats() {
  const { products } = useProducts();

  return useMemo(() => {
    const totalProducts = products.length;

    const totalCategories = new Set(products.map((product) => product.category))
      .size;

    const averagePrice =
      totalProducts === 0
        ? 0
        : products.reduce((sum, product) => sum + product.price, 0) /
          totalProducts;

    return {
      totalProducts,
      totalCategories,
      averagePrice,
    };
  }, [products]);
}
