import { Link } from "react-router-dom";
import type { Product } from "../../../entities/product/types";
import { Badge, Button } from "../../../components/ui";

interface ProductsTableProps {
  products: Product[];
  onDelete: (productId: string) => void;
}

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <p className="text-slate-400">No products available yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950">
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-800/50 transition">
                <td className="px-6 py-4 text-sm text-white font-medium">
                  {product.title}
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  <Badge>{product.category}</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Badge variant="success">Active</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link to={`/admin/edit/${product.id}`}>
                      <Button size="sm" variant="secondary">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
