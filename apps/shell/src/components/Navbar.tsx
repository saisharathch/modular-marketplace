import { Link } from "react-router-dom";
import { useCart } from "../providers/CartProvider";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-lg font-bold">Marketplace</h1>

        <div className="flex gap-6 text-sm text-slate-300">
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/cart">Cart ({totalItems})</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
