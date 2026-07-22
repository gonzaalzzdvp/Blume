import { useEffect } from "react";

import { useForm } from "react-hook-form";

export default function CategoryForm({
  initialData = {},
  loading,
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      name: initialData.name || "",
    });
  }, [initialData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        bg-white
        rounded-2xl
        shadow
        p-8
        space-y-6
      "
    >
      <div>
        <label className="block mb-2">
          Nombre
        </label>

        <input
          {...register("name")}
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        />
      </div>

      <button
        disabled={loading}
        className="
          px-6
          py-3
          bg-(--pinkRose)
          text-white
          rounded-xl
        "
      >
        {loading
          ? "Guardando..."
          : "Guardar"}
      </button>
    </form>
  );
}