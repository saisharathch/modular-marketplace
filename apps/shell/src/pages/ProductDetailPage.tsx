import { Link, useParams } from "react-router-dom";
import { useCart } from "../providers/CartProvider";
import { useProducts } from "../providers/ProductsProvider";

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { products } = useProducts();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900 p-8">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <p className="mt-2 text-slate-400">
          The product you are looking for does not exist.
        </p>
        <Link
          to="/catalog"
          className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
        >
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950 text-slate-500">
          Product Preview
        </div>
      </div>

      <div>
        <p className="text-sm text-blue-400">{product.category}</p>
        <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
        <p className="mt-4 text-slate-400">{product.description}</p>

        <div className="mt-6">
          <span className="text-2xl font-bold text-white">
            ${product.price}
          </span>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                category: product.category,
              })
            }
            className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          >
            Add to Cart
          </button>

          <Link
            to="/catalog"
            className="rounded-lg border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-slate-500"
          >
            Back to Catalog
          </Link>
        </div>

        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">What’s included</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>• Reusable assets and starter content</li>
            <li>• Clean structure for fast customization</li>
            <li>• Ready-to-use patterns for modern frontend apps</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
