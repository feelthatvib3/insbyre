import { Skeleton } from 'shared/ui/skeleton';

export function ProductListSkeleton() {
  return (
    <div className="560:grid-cols-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {Array.from({ length: 6 })
        .fill(null)
        .map((_, i) => (
          <div key={i} className="w-full space-y-4">
            <Skeleton className="aspect-[1] w-full rounded-2xl" />
            <div className="space-y-0.5 px-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
    </div>
  );
}
