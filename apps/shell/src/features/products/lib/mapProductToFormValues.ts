import type { Product } from "../../../entities/product/types";
import type { ProductFormValues } from "../model/productSchema";

export function mapProductToFormValues(product: Product): ProductFormValues {
  return {
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
  };
}

export function getEmptyProductFormValues(): ProductFormValues {
  return {
    title: "",
    price: 0,
    category: "Electronics",
    description: "",
    image: "",
  };
}
