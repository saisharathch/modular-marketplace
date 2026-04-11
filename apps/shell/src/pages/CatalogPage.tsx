import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../providers/ProductsProvider";
import EmptyState from "../components/EmptyState";
import SkeletonCard from "../components/SkeletonCard";
import { PageHeader, Input, Button, Card, CardContent } from "../components/ui";

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
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        <PageHeader
          title="Catalog"
          description="Explore premium frontend tools, templates, and UI systems"
        />

        <Card>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "primary" : "secondary"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {filteredProducts.length > 0 && (
              <p className="text-sm text-slate-400">
                Found {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="col-span-full">
              <EmptyState
                title="No Products Found"
                description="Try adjusting your search or filters"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
