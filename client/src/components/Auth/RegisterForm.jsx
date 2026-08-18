import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";

export default function RegisterForm() {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await registerUser(data);
      toast.success("Cuenta creada correctamente.");
      navigate("/");
    } catch (error) {
      const backendErrors = error.response?.data;

      toast.error(
        backendErrors?.detail ||
          Object.values(backendErrors || {})
            .flat()
            .join("\n") ||
          "No fue posible crear la cuenta.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Nombre y apellido */}
      <div className="flex gap-5">
        <input
          placeholder="Nombre"
          disabled={isLoading}
          {...register("first_name", {
            required: true,
          })}
          className="
            w-full
            p-3
            rounded-lg
            inputShadow
            font-ranade-regular
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        />

        <input
          placeholder="Apellido"
          disabled={isLoading}
          {...register("last_name", {
            required: true,
          })}
          className="
            w-full
            p-3
            rounded-lg
            inputShadow
            font-ranade-regular
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        />
      </div>

      {/* Correo */}
      <input
        type="email"
        placeholder="Correo"
        disabled={isLoading}
        {...register("email", {
          required: true,
        })}
        className="
          w-full
          p-3
          rounded-lg
          inputShadow
          font-ranade-regular
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      />

      {/* Contraseña */}
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          disabled={isLoading}
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres.",
            },
          })}
          className="
            w-full
            p-3
            pr-12
            rounded-lg
            inputShadow
            font-ranade-regular
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        />

        <button
          type="button"
          disabled={isLoading}
          onClick={() => setShowPassword((current) => !current)}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            flex
            items-center
            justify-center
            w-7
            h-7
            cursor-pointer
            text-gray-500
            hover:text-(--pinkRose)
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          aria-label={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {showPassword ? (
            // Ojo tachado
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c1.542 0 3.012-.31 4.348-.87m2.684-1.14A10.45 10.45 0 0022.066 12C20.774 7.662 16.756 4.5 12 4.5c-1.55 0-3.03.313-4.373.88M3 3l18 18"
              />
            </svg>
          ) : (
            // Ojo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.178.07.21.07.433 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirmar contraseña */}
      <div className="relative w-full">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirmar contraseña"
          disabled={isLoading}
          {...register("confirm_password", {
            required: "Confirme su contraseña.",
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden.",
          })}
          className="
            w-full
            p-3
            pr-12
            rounded-lg
            inputShadow
            font-ranade-regular
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        />

        <button
          type="button"
          disabled={isLoading}
          onClick={() => setShowConfirmPassword((current) => !current)}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            flex
            items-center
            justify-center
            w-7
            h-7
            cursor-pointer
            text-gray-500
            hover:text-(--pinkRose)
            transition-colors
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          aria-label={
            showConfirmPassword
              ? "Ocultar confirmación de contraseña"
              : "Mostrar confirmación de contraseña"
          }
        >
          {showConfirmPassword ? (
            // Ojo tachado
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c1.542 0 3.012-.31 4.348-.87m2.684-1.14A10.45 10.45 0 0022.066 12C20.774 7.662 16.756 4.5 12 4.5c-1.55 0-3.03.313-4.373.88m2.684 1.14A10.45 10.45 0 0022.066 12C20.774 7.662 16.756 4.5 12 4.5c-1.55 0-3.03.313-4.373.88M3 3l18 18"
              />
            </svg>
          ) : (
            // Ojo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.178.07.21.07.433 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>

        {errors.confirm_password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirm_password.message}
          </p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={isLoading}
        className="
          w-full
          bg-(--pinkRose)
          hover:bg-(--blackBean)
          text-white
          py-3
          rounded-lg
          cursor-pointer
          font-ranade-regular
          flex
          items-center
          justify-center
          gap-2
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      >
        {isLoading ? (
          <>
            <svg
              className="w-5 h-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
              />

              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V1C5.477 1 1 5.477 1 12h3z"
              />
            </svg>
            Creando cuenta...
          </>
        ) : (
          "Crear cuenta"
        )}
      </button>

      {/* Login */}
      <p className="text-center font-ranade-regular">
        ¿Ya tienes cuenta?
        <Link
          to="/login"
          className="
            ml-2
            text-(--pinkRose)
            hover:underline
            font-ranade-bold
          "
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
