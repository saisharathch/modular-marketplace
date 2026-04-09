import { Link } from "react-router-dom";
import { useCart } from "../providers/CartProvider";
import { useEffect } from "react";
import { productRepository } from "../features/products/model/productRepository";

function SuccessPage() {
  const { items, clearCart } = useCart();
  const products = productRepository.getAll();
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-xl text-center">
      <h2 className="text-3xl font-bold text-green-400">Order Successful 🎉</h2>

      <p className="mt-4 text-slate-400">
        Your order has been placed successfully.
      </p>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6 text-left">
        <h3 className="text-lg font-semibold">Order Items</h3>

        <ul className="mt-4 space-y-2 text-sm text-slate-400">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;

            return (
              <li key={item.productId}>
                {product.title} × {item.quantity}
              </li>
            );
          })}
        </ul>
      </div>

      <Link
        to="/catalog"
        className="mt-8 inline-block rounded-lg bg-white px-5 py-3 text-sm font-medium text-slate-950 hover:bg-slate-200"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default SuccessPage;
