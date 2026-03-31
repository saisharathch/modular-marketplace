import { Link } from "react-router-dom";
import { useProducts } from "../providers/ProductsProvider";

function AdminPage() {
  const { products, deleteProduct } = useProducts();
  const totalProducts = products.length;
  const totalCategories = new Set(products.map((product) => product.category))
    .size;
  const averagePrice =
    products.length > 0
      ? products.reduce((sum, product) => sum + product.price, 0) /
        products.length
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <p className="mt-1 text-sm text-slate-400">
          Monitor products and manage marketplace content
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Total Products</p>
          <h3 className="mt-2 text-3xl font-bold">{totalProducts}</h3>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Categories</p>
          <h3 className="mt-2 text-3xl font-bold">{totalCategories}</h3>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Average Price</p>
          <h3 className="mt-2 text-3xl font-bold">
            ${averagePrice.toFixed(0)}
          </h3>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Products Overview</h3>
            <p className="mt-1 text-sm text-slate-400">
              Current products available in the marketplace
            </p>
          </div>

          <Link
            to="/admin/products/new"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200 transition"
          >
            Add Product
          </Link>
        </div>

        {products.length === 0 && (
          <div className="mt-6 text-slate-400">
            No products available. Add a new product.
          </div>
        )}

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-slate-400">
                <th className="pb-2">Title</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="rounded-lg bg-slate-950">
                  <td className="rounded-l-lg px-4 py-3 font-medium text-white">
                    {product.title}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 text-slate-300">${product.price}</td>
                  <td className="rounded-r-lg px-4 py-3">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          const confirmed =
                            window.confirm("Delete this product?");
                          if (confirmed) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="text-sm text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
