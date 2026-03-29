import { useNavigate } from "react-router-dom";
import { useCart } from "../providers/CartProvider";

function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;

    navigate("/success");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Checkout</h2>
      <p className="mt-1 text-sm text-slate-400">
        Review your order before placing it
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-400">
                {item.quantity} × ${item.price}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-lg font-semibold">Order Summary</h3>

          <div className="mt-4 flex justify-between text-sm text-slate-400">
            <span>Total</span>
            <span className="font-semibold text-white">${totalPrice}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full rounded-lg bg-white px-4 py-3 text-sm font-medium text-slate-950 hover:bg-slate-200"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
