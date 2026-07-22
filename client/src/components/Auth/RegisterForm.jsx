import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";

export default function RegisterForm() {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Cuenta creada correctamente.");
      navigate("/");
    } catch (error) {
      const errors = error.response?.data;

      toast.error(
        errors?.detail ||
          Object.values(errors || {})
            .flat()
            .join("\n") ||
          "No fue posible crear la cuenta.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex gap-5">
        <input
          placeholder="Nombre"
          {...register("first_name", {
            required: true,
          })}
          className="w-full p-3 rounded-lg inputShadow"
        />

        <input
          placeholder="Apellido"
          {...register("last_name", {
            required: true,
          })}
          className="w-full p-3 rounded-lg inputShadow"
        />
      </div>

      <input
        type="email"
        placeholder="Correo"
        {...register("email", {
          required: true,
        })}
        className="w-full p-3 rounded-lg inputShadow"
      />

      <input
        type="password"
        placeholder="Contraseña"
        {...register("password", {
          required: true,
          minLength: 8,
        })}
        className="w-full p-3 rounded-lg inputShadow"
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        {...register("confirm_password", {
          validate: (value) =>
            value === watch("password") || "Las contraseñas no coinciden.",
        })}
        className="w-full p-3 rounded-lg inputShadow"
      />

      {errors.confirm_password && (
        <p className="text-red-500 text-sm">
          {errors.confirm_password.message}
        </p>
      )}

      <button
        className="
          w-full
          bg-(--pinkRose)
          hover:bg-(--blackBean)
          text-white
          py-3
          rounded-lg
          cursor-pointer
        "
      >
        Crear cuenta
      </button>

      <p className="text-center">
        ¿Ya tienes cuenta?
        <Link to="/login" className="ml-2 text-(--pinkRose) hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
