import { Link } from "react-router-dom";

import type { Product } from "@/entities/product";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { Badge, Button, Card, CardContent } from "@/shared/ui";
import { useCart } from "@/providers/CartProvider";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ productId: product.id });
  };

  return (
    <Card className="group overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:border-slate-700">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-800">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-white">
              {product.title}
            </h3>
            <Badge>{product.category}</Badge>
          </div>

          <p className="line-clamp-2 text-sm leading-6 text-slate-400">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-white">
            {formatCurrency(product.price)}
          </span>

          <div className="flex items-center gap-2">
            <Link to={`/products/${product.id}`}>
              <Button variant="secondary" size="sm">
                View Details
              </Button>
            </Link>

            <Button size="sm" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
