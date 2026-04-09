import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "../components/products/ProductForm";
import { mapProductToFormValues } from "../features/products/lib/mapProductToFormValues";
import type { ProductFormValues } from "../features/products/model/productSchema";
import { useProducts } from "../providers/ProductsProvider";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();

  const product = useMemo(
    () => products.find((item) => item.id === id),
    [products, id],
  );

  if (!product) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white">
        Product not found.
      </div>
    );
  }

  const handleUpdateProduct = (values: ProductFormValues) => {
    updateProduct(product.id, values);
    navigate("/admin");
  };

  return (
    <ProductForm
      title="Edit Product"
      submitLabel="Save Changes"
      initialValues={mapProductToFormValues(product)}
      onSubmit={handleUpdateProduct}
    />
  );
}
