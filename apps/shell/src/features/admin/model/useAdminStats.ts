import { useMemo } from "react";
import { useProducts } from "../../../providers/ProductsProvider";

export function useAdminStats() {
  const { products } = useProducts();

  return useMemo(() => {
    const totalProducts = products.length;
    const categories = new Set(products.map((product) => product.category));
    const averagePrice =
      totalProducts === 0
        ? 0
        : products.reduce((sum, product) => sum + product.price, 0) /
          totalProducts;

    return {
      totalProducts,
      totalCategories: categories.size,
      averagePrice: Math.round(averagePrice * 100) / 100,
    };
  }, [products]);
}
