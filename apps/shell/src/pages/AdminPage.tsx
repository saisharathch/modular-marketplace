import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useProducts } from "@/providers/ProductsProvider";
import { AdminStatsGrid } from "@/features/admin/components/AdminStatsGrid";
import { ProductsTable } from "@/features/admin/components/ProductsTable";
import { useAdminStats } from "@/features/admin/model/useAdminStats";
import { Button, ConfirmDialog, PageHeader } from "@/shared/ui";

export default function AdminPage() {
  const { products, deleteProduct } = useProducts();
  const { totalProducts, totalCategories, averagePrice } = useAdminStats();

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === pendingDeleteId),
    [products, pendingDeleteId],
  );

  const handleOpenDeleteDialog = (productId: string) => {
    setPendingDeleteId(productId);
  };

  const handleCloseDeleteDialog = () => {
    setPendingDeleteId(null);
  };

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
        description="Manage marketplace products, monitor catalog health, and keep inventory data clean and up to date."
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

      <ProductsTable products={products} onDelete={handleOpenDeleteDialog} />

      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="Delete product"
        description={
          selectedProduct
            ? `Are you sure you want to delete "${selectedProduct.title}"? This action cannot be undone.`
            : "Are you sure you want to delete this product? This action cannot be undone."
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
}
