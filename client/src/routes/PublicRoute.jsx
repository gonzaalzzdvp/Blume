import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}