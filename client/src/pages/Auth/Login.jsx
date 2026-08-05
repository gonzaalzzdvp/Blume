import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";
import GridAnimation from "../../components/Auth/GridAnimation";

export default function Login() {
  return (
    <div className="h-[calc(100vh-88px)] mt-22 flex justify-center ">
      <div className="w-full flex justify-center">
        <AuthLayout title="Bienvenido" subtitle="Inicia sesión para continuar">
          <LoginForm />
        </AuthLayout>
      </div>
      <div className="flex justify-center items-center w-full">
        <GridAnimation />
      </div>
    </div>
  );
}
