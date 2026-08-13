import Skeleton from "./Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <main className="min-h-[calc(100vh-88px)] mt-22 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center gap-20">

          {/* Imágenes */}
          <div className="flex items-center gap-20">

            {/* Miniaturas */}
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-20 h-20 rounded-lg"
                />
              ))}
            </div>

            {/* Imagen principal */}
            <Skeleton className="w-80 h-80 rounded-xl" />
          </div>

          {/* Información */}
          <div className="w-112.5 flex flex-col">

            <Skeleton className="h-10 w-3/4 mb-3" />

            <Skeleton className="h-6 w-24 rounded-full mb-5" />

            <Skeleton className="h-5 w-32 mb-2" />

            <Skeleton className="h-9 w-40 mb-6" />

            <Skeleton className="h-6 w-40 mb-3" />

            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-4/5 mb-6" />

            <div className="space-y-3 mb-6">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>

            <Skeleton className="h-12 w-full rounded-lg" />
          </div>

        </div>

        {/* Ingredientes */}
        <div className="mt-14">
          <Skeleton className="h-8 w-48 mb-6" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="aspect-square rounded-xl mb-3" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}