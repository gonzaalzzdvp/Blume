import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";
import GridAnimation from "../../components/Auth/GridAnimation";

export default function Login() {
  return (
    <div
      className="
        min-h-[calc(100vh-88px)]
        mt-16
        sm:mt-22
        px-4
        py-8
        sm:p-8
        lg:px-10
        flex
        flex-col
        lg:flex-row
        items-center
        justify-center
        gap-8
        lg:gap-12
        max-w-7xl
        mx-auto
      "
    >
      {/* Formulario de Login */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <AuthLayout title="Bienvenido" subtitle="Inicia sesión para continuar">
          <LoginForm />
        </AuthLayout>
      </div>

      {/* Animación Grid (Solo visible en pantallas grandes lg+) */}
      <div className="hidden lg:flex justify-center items-center w-full lg:w-1/2">
        <GridAnimation />
      </div>
    </div>
  );
}
