import type { Product } from "./types";

export function getProductById(
  products: Product[],
  id: string,
): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(
  products: Product[],
  category: string,
): Product[] {
  if (!category || category === "All") return products;

  return products.filter((product) => product.category === category);
}

export function searchProducts(products: Product[], query: string): Product[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return products;

  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)
    );
  });
}
