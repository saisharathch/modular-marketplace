import { useCart } from "../providers/CartProvider";
import { useNavigate } from "react-router-dom";
import { productRepository } from "../features/products/model/productRepository";

function CartPage() {
  const navigate = useNavigate();
  const { items, totalPrice, increaseQty, decreaseQty, removeItem } = useCart();
  const products = productRepository.getAll();

  return (
    <div>
      <h2 className="text-2xl font-semibold">Cart</h2>
      <p className="mt-1 text-sm text-slate-400">
        Review your selected products
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-800 bg-slate-900 p-8 text-center">
          <h3 className="text-lg font-semibold">Your cart is empty</h3>
          <p className="mt-2 text-sm text-slate-400">
            Add a product from the catalog to get started.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;

              return (
                <div
                  key={item.productId}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-blue-400">
                        {product.category}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        ${product.price} each
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.productId)}
                      className="rounded-md border border-slate-700 px-3 py-1 text-sm"
                    >
                      -
                    </button>

                    <span className="min-w-8 text-center">{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.productId)}
                      className="rounded-md border border-slate-700 px-3 py-1 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-lg font-semibold">Order Summary</h3>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
              <span>Total</span>
              <span className="font-semibold text-white">${totalPrice}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
