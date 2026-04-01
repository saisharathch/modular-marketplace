import { Link, useParams } from "react-router-dom";
import { useProducts } from "../providers/ProductsProvider";
import { useCart } from "../providers/CartProvider";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import EmptyState from "../components/EmptyState";

function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="The product you are looking for does not exist."
      />
    );
  }

  const relatedProducts = products
    .filter(
      (item) => item.id !== product.id && item.category === product.category,
    )
    .slice(0, 3);

  return (
    <div className="space-y-12">
      <div>
        <Link
          to="/catalog"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to Catalog
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950 text-slate-500">
            Product Preview
          </div>
        </div>

        <div>
          <p className="text-sm text-blue-400">{product.category}</p>
          <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
          <p className="mt-4 max-w-xl text-slate-400">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-bold text-white">
              ${product.price}
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              Digital Product
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
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
              to="/cart"
              className="rounded-lg border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-slate-500"
            >
              Go to Cart
            </Link>
          </div>

          <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">What’s included</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>• Reusable assets and starter content</li>
              <li>• Clean structure for fast customization</li>
              <li>• Ready-to-use patterns for modern frontend apps</li>
              <li>• Built for frontend productivity and scalability</li>
            </ul>
          </div>
        </div>
      </div>

      <section>
        <SectionHeader
          title="Related Products"
          description="Explore similar products in the same category"
        />

        {relatedProducts.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                category={item.category}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="No related products"
              description="There are no similar products available right now."
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductDetailPage;
