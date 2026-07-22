import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import Catalog from "./components/Product/Catalog";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CartPage from "./pages/Cart/CartPage";
import Checkout from "./pages/Cart/Checkout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/Auth/Profile";
import ThankYouPage from "./pages/ThankYouPage";

import Dashboard from "./admin/pages/Dashboard";

import ProductFormPage from "./admin/pages/Products/ProductFormPage";
import ProductList from "./admin/pages/Products/ProductList";
import CategoriesPage from "./admin/pages/categories/CategoriesPage";
import CategoryFormPage from "./admin/pages/categories/CategoryFormPage";
import OrderPage from "./admin/pages/Orders/OrdersPage";
import OrderDetailPage from "./admin/pages/Orders/OrderDetailPage";

import AdminLayout from "./admin/layouts/AdminLayout";
import Layout from "./layouts/Layout";
import { SidebarProvider } from "./admin/context/SidebarContext";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

import ScrollToTop from "./helper/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/thank-you"
            element={
              <PrivateRoute>
                <ThankYouPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <SidebarProvider>
                <AdminLayout />
              </SidebarProvider>
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductFormPage />} />
          <Route path="products/:id/edit" element={<ProductFormPage />} />

          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/new" element={<CategoryFormPage />} />
          <Route path="categories/:id/edit" element={<CategoryFormPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
