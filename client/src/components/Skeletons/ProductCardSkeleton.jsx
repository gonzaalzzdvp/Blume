import Skeleton from "./Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-(--grayBlume)">
      <Skeleton className="aspect-square w-full" />

      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />

        <Skeleton className="h-4 w-1/2" />

        <Skeleton className="mt-6 h-6 w-1/3" />

        <Skeleton className="mt-4 h-11 w-full rounded-lg" />
      </div>
    </div>
  );
}