import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

import HomePage from "../pages/HomePage/HomePage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import CartPage from "../pages/CartPage/CartPage";
import WishlistPage from "../pages/WishlistPage/WishlistPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import CheckoutSuccessPage from "../pages/CheckoutSuccessPage/CheckoutSuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      // Rutas privadas
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "cart",
            element: <CartPage />,
          },
          { 
            path: "wishlist",
            element: <WishlistPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "checkout",
            element: <CheckoutSuccessPage />,
        },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;