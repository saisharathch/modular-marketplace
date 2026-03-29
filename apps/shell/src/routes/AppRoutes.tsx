import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import CatalogPage from "../pages/CatalogPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import SuccessPage from "../pages/SuccessPage";

function NotFoundPage() {
  return (
    <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-slate-400">
        The page you requested does not exist.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300"
      >
        Back to home
      </Link>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "success", element: <SuccessPage /> },
      { path: "*", element: <NotFoundPage /> },
      {}
    ],
  },
]);
