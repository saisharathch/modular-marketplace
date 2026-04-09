import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import { useProducts } from "../providers/ProductsProvider";

function HomePage() {
  const { products } = useProducts();

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 px-8 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
            Developer Marketplace
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Discover premium frontend tools, templates, and UI systems
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">
            Modular Marketplace helps developers explore high-quality digital
            products for faster shipping, better UI consistency, and stronger
            frontend workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/catalog"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Browse Catalog
            </Link>

            <Link
              to="/admin"
              className="rounded-lg border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:border-slate-500"
            >
              Open Admin
            </Link>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          title="Featured Products"
          description="A curated set of popular tools and templates from the marketplace"
        />

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Why Modular Marketplace"
          description="Built to showcase modern frontend architecture and product thinking"
        />

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">Reusable Systems</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Explore components, templates, and assets designed to accelerate
              frontend development and reduce repetitive work.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">Product-First UX</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Navigate a clean marketplace experience with structured browsing,
              detail pages, cart flow, and admin management.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-lg font-semibold">Scalable Architecture</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Built using modular frontend patterns, shared UI components, and
              reusable state flows that support long-term growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
