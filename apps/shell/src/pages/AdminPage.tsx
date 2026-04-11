import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../providers/ProductsProvider";
import { useAdminStats } from "../features/admin/model/useAdminStats";
import { AdminStatsGrid } from "../features/admin/components/AdminStatsGrid";
import { ProductsTable } from "../features/admin/components/ProductsTable";
import { Button, ConfirmDialog, PageHeader } from "../components/ui";

export default function AdminPage() {
  const { products, deleteProduct } = useProducts();
  const { totalProducts, totalCategories, averagePrice } = useAdminStats();

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === pendingDeleteId),
    [products, pendingDeleteId],
  );

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    deleteProduct(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin"
        title="Catalog Management"
        description="Manage product inventory, review catalog composition, and maintain a clean marketplace experience."
        actions={
          <Link to="/admin/add">
            <Button>Add Product</Button>
          </Link>
        }
      />

      <AdminStatsGrid
        totalProducts={totalProducts}
        totalCategories={totalCategories}
        averagePrice={averagePrice}
      />

      <ProductsTable
        products={products}
        onDelete={(productId) => setPendingDeleteId(productId)}
      />

      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="Delete product"
        description={
          selectedProduct
            ? `Are you sure you want to delete "${selectedProduct.title}"? This action cannot be undone.`
            : "Are you sure you want to delete this product?"
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
