import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";

export default function Login() {

  return (

    <div className="h-[calc(100vh-88px)] mt-22 flex justify-center items-center">
      <AuthLayout
      title="Bienvenido"
      subtitle="Inicia sesión para continuar"
    >

      <LoginForm />

    </AuthLayout>
    </div>

  );

}