import AuthLayout from "../../components/Auth/AuthLayout";
import RegisterForm from "../../components/Auth/RegisterForm";
import GridAnimation from "../../components/Auth/GridAnimation";

export default function Register() {
  return (
    <div className="min-h-[calc(100vh-88px)] mt-22 p-10 flex justify-center ">
      <div className="w-full flex justify-center">
        <AuthLayout title="Crear cuenta" subtitle="Únete a Blume">
          <RegisterForm />
        </AuthLayout>
      </div>
      <div className="flex justify-center items-center w-full">
        <GridAnimation />
      </div>
    </div>
  );
}
