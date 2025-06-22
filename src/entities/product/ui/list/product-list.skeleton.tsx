import { Skeleton } from 'shared/ui/skeleton';

export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 })
        .fill(null)
        .map((_, i) => (
          <div key={i} className="-z-10 space-y-4">
            <Skeleton className="h-[290px] rounded-2xl" />
            <Skeleton className="h-[28px] w-[150px] rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-[16px] w-[256px] rounded-lg" />
              <Skeleton className="h-[16px] w-[320px] rounded-lg" />
            </div>
            <div className="flex items-center gap-x-2">
              <Skeleton className="h-[36px] w-[135px] rounded-full" />
              <Skeleton className="h-[24px] w-[56px] rounded-full" />
            </div>
          </div>
        ))}
    </div>
  );
  return;
}
