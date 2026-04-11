import { Link } from "react-router-dom";
import { Card, CardContent, Badge, Button } from "./ui";

type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  description?: string;
};

function ProductCard({ id, title, price, category, description }: Product) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-slate-800 to-slate-900" />
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <Badge>{category}</Badge>
          </div>
          {description && (
            <p className="line-clamp-2 text-sm text-slate-400">{description}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-white">
            ${price.toFixed(2)}
          </span>
          <Link to={`/product/${id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
