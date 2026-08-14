import AuthLayout from "../../components/Auth/AuthLayout";
import RegisterForm from "../../components/Auth/RegisterForm";
import GridAnimation from "../../components/Auth/GridAnimation";

export default function Register() {
  return (
    <div
      className="
        min-h-[calc(100vh-88px)]
        mt-16
        sm:mt-22
        px-4
        sm:p-8
        lg:p-10
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
      {/* Formulario de Registro */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <AuthLayout title="Crear cuenta" subtitle="Únete a Blume">
          <RegisterForm />
        </AuthLayout>
      </div>

      {/* Animación Grid (Solo visible en pantallas grandes lg+) */}
      <div className="hidden lg:flex justify-center items-center w-full lg:w-1/2">
        <GridAnimation />
      </div>
    </div>
  );
}
