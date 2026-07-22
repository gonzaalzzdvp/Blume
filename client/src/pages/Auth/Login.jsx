import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";
import ProductEfect from '../../components/Auth/ProductEffect'

export default function Login() {
  return (
    <div className="h-[calc(100vh-88px)] mt-22 flex">
      <div className="w-full">
        <AuthLayout title="Bienvenido" subtitle="Inicia sesión para continuar">
          <LoginForm />
        </AuthLayout>
      </div>
      <div className="w-full">
        <ProductEfect />
      </div>
    </div>
  );
}
