export type ProductCategory =
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Sports"
  | "Books";

export interface Product {
  id: string;
  title: string;
  price: number;
  category: ProductCategory;
  description: string;
  image: string;
}
