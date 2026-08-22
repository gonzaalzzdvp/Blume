import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";

import { Toaster } from "react-hot-toast";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
            }}
            containerStyle={{
              top: "100px",
              right: "20px",
            }}
          />
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
);
