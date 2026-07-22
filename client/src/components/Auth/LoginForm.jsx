import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,

    handleSubmit,

    formState: { errors },

    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Bienvenido");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Correo o contraseña incorrectos.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", {
            required: "Ingrese su correo.",
          })}
          className="w-80 p-3 rounded-lg outline-none inputShadow"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "Ingrese su contraseña.",
          })}
          className="w-80 p-3 rounded-lg outline-none inputShadow"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}

      <button
        className="
          w-80
          bg-(--pinkRose)
          text-white
          py-3
          rounded-lg
          hover:bg-(--blackBean)
          cursor-pointer
        "
      >
        Iniciar sesión
      </button>

      <p className="w-80 text-center">
        ¿No tienes cuenta?
        <Link to="/register" className="ml-2 text-(--pinkRose) hover:underline">
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
