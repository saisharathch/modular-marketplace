import { useNavigate } from "react-router-dom";
import { ProductForm } from "../components/products/ProductForm";
import { getEmptyProductFormValues } from "../features/products/lib/mapProductToFormValues";
import type { ProductFormValues } from "../features/products/model/productSchema";
import { useProducts } from "../providers/ProductsProvider";

export default function AddProductPage() {
  const navigate = useNavigate();
  const { products, addProduct } = useProducts();

  const handleCreateProduct = (values: ProductFormValues) => {
    // Duplicate title guard
    const duplicate = products.some(
      (product) =>
        product.title.trim().toLowerCase() ===
        values.title.trim().toLowerCase(),
    );

    if (duplicate) {
      alert("A product with this title already exists.");
      return;
    }

    addProduct(values);
    navigate("/admin");
  };

  return (
    <ProductForm
      title="Add Product"
      submitLabel="Create Product"
      initialValues={getEmptyProductFormValues()}
      onSubmit={handleCreateProduct}
    />
  );
}
