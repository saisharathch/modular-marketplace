import type { Product } from "@/entities/product";
import { Badge, DataTable } from "@/shared/ui";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ProductRowActions } from "./ProductRowActions";

interface ProductsTableProps {
  products: Product[];
  onDelete: (productId: string) => void;
}

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
  return (
    <DataTable
      rows={products}
      emptyState={
        <EmptyState
          title="No products yet"
          description="Start building your catalog by adding the first product."
        />
      }
      columns={[
        {
          key: "title",
          header: "Product",
          render: (product) => (
            <div className="space-y-1">
              <p className="font-medium text-white">{product.title}</p>
              <p className="line-clamp-1 text-xs text-slate-400">
                {product.description}
              </p>
            </div>
          ),
        },
        {
          key: "category",
          header: "Category",
          render: (product) => <Badge>{product.category}</Badge>,
        },
        {
          key: "price",
          header: "Price",
          render: (product) => (
            <span className="font-medium text-slate-100">
              {formatCurrency(product.price)}
            </span>
          ),
        },
        {
          key: "actions",
          header: "Actions",
          render: (product) => (
            <ProductRowActions productId={product.id} onDelete={onDelete} />
          ),
        },
      ]}
    />
  );
}
