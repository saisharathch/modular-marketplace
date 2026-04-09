import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../providers/ProductsProvider";
import EmptyState from "../components/EmptyState";
import SectionHeader from "../components/SectionHeader";
import SkeletonCard from "../components/SkeletonCard";

const categories = ["All", "UI Kit", "Template", "Tool"];

function CatalogPage() {
  const { products } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <SectionHeader title="Catalog" description="Browse our marketplace" />

        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white placeholder-slate-500"
          />

          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-4 py-2 font-medium transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-slate-600 bg-slate-800 text-slate-300 hover:border-blue-500 hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <EmptyState
              title="No Products Found"
              description="Try adjusting your filters"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
