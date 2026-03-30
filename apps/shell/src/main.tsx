import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./providers/CartProvider";
import { ProductsProvider } from "./providers/ProductsProvider";
import { router } from "./routes/AppRoutes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductsProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
    </ProductsProvider >
  </React.StrictMode>,
);
