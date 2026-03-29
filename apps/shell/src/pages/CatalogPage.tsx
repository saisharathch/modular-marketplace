import ProductCard from "../components/productCard";
import { products } from "../data/product";

function CatalogPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Catalog</h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;
