import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await login(data);
      toast.success("Bienvenido");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Correo o contraseña incorrectos.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          disabled={isLoading}
          {...register("email", {
            required: "Ingrese su correo.",
          })}
          className="
            w-80
            p-3
            rounded-lg
            outline-none
            inputShadow
            font-ranade-regular
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="relative w-80">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            disabled={isLoading}
            {...register("password", {
              required: "Ingrese su contraseña.",
            })}
            className="
              w-full
              p-3
              pr-12
              rounded-lg
              outline-none
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
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {errors.root && <p className="text-red-500">{errors.root.message}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="
          w-80
          bg-(--pinkRose)
          text-white
          py-3
          rounded-lg
          hover:bg-(--blackBean)
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
            Iniciando sesión...
          </>
        ) : (
          "Iniciar sesión"
        )}
      </button>

      <p className="w-80 text-center font-ranade-regular">
        ¿No tienes cuenta?
        <Link
          to="/register"
          className="
            ml-2
            text-(--pinkRose)
            hover:underline
            font-ranade-bold
          "
        >
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
