import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, ProductsPage } from "./pages";
import { CustomerPage } from "./pages/customer";
import { PackagesPage } from "./pages/packages";
import PaymentPage from "./pages/payment";
import CartPage from "./pages/cart";
import Dashboard from "./components/dashboard/Dashboard";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const router = createBrowserRouter([
    //đường dẫn của react router dom
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/products",
      element: <ProductsPage />,
    },
    {
      path: "/customer",
      element: <CustomerPage />,
    },
    {
      path: "/packages",
      element: <PackagesPage />,
    },
    {
      path: "/payment",
      element: <PaymentPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/product/:id",
      element: <ProductDetailPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
