import { Link } from "react-router-dom";

type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
  description?: string;
};

function ProductCard({ id, title, price, category }: Product) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-700">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{category}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-bold text-white">${price}</span>

        <Link
          to={`/product/${id}`}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
