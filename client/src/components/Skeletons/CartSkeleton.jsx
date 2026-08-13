export default function CartSkeleton() {
  return (
    <main className="mt-24 min-h-[calc(100vh-88px)] max-w-6xl mx-auto p-6 animate-pulse">
      {/* Título */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-44 rounded bg-gray-200" />
        <div className="h-8 w-8 rounded-full bg-gray-200" />
      </div>

      <div className="flex flex-col gap-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="p-5 flex justify-between items-center rounded-xl shadow-md"
          >
            <div className="flex gap-5">
              {/* Imagen */}
              <div className="w-28 h-28 rounded-lg bg-gray-200" />

              {/* Información */}
              <div className="flex flex-col justify-between py-1">
                <div className="space-y-3">
                  <div className="h-6 w-52 rounded bg-gray-200" />
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="h-5 w-16 rounded bg-gray-200" />
                </div>

                {/* Cantidad */}
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="w-6 h-5 rounded bg-gray-200" />
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Precio */}
            <div className="flex flex-col items-end gap-5">
              <div className="h-7 w-20 rounded bg-gray-200" />
              <div className="w-6 h-6 rounded bg-gray-200" />
            </div>
          </div>
        ))}

        {/* Resumen */}
        <div className="mt-8 border-t border-(--grayBlume) pt-6">
          <div className="flex justify-between items-center">
            <div className="h-12 w-40 rounded-lg bg-gray-200" />

            <div className="flex flex-col items-end gap-2">
              <div className="h-4 w-12 rounded bg-gray-200" />
              <div className="h-8 w-28 rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-6 h-14 w-full rounded-xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}