import AuthLayout from "../../components/Auth/AuthLayout";
import RegisterForm from "../../components/Auth/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-[calc(100vh-88px)] mt-22 p-10 flex justify-center items-center">
      <AuthLayout title="Crear cuenta" subtitle="Únete a Blume">
        <RegisterForm />
      </AuthLayout>
    </div>
  );
}
