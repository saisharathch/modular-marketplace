type Product = {
  id: string;
  title: string;
  price: number;
  category: string;
};

function ProductCard({ title, price, category }: Product) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-slate-700 transition">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-slate-400">{category}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-white font-bold">${price}</span>

        <button className="text-sm text-blue-400 hover:text-blue-300">
          View
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
