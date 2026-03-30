import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../providers/ProductsProvider";

const categories = ["All", "UI Kit", "Template", "Tool"];

function CatalogPage() {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Catalog</h2>
          <p className="mt-1 text-sm text-slate-400">
            Browse developer-focused digital products
          </p>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-white outline-none placeholder:text-slate-500 sm:max-w-xs"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-white text-slate-950"
                  : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-slate-800 bg-slate-900 p-8 text-center">
          <h3 className="text-lg font-semibold">No products found</h3>
          <p className="mt-2 text-sm text-slate-400">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
