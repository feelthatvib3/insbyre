import { Skeleton } from 'shared/ui/skeleton';

export function CatalogueFiltersSidebarSkeleton() {
  return (
    <div className="h-fit min-h-[512px] w-full max-w-[228px] shrink-0 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-7 w-[125px]" />
        <div className="flex flex-wrap items-center gap-1.5">
          <Skeleton className="h-8 w-[51px] rounded-full" />
          <Skeleton className="h-8 w-[107px] rounded-full" />
          <Skeleton className="h-8 w-[59px] rounded-full" />
          <Skeleton className="h-8 w-[52px] rounded-full" />
          <Skeleton className="h-8 w-[84px] rounded-full" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-7 w-[60px]" />
        <div className="space-y-4">
          <Skeleton className="h-2 rounded-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-[48px]" />
            <Skeleton className="h-6 w-[48px]" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-7 w-[150px]" />
        <div className="flex flex-wrap items-center gap-1.5">
          <Skeleton className="h-8 w-[129px] rounded-full" />
          <Skeleton className="h-8 w-[147px] rounded-full" />
          <Skeleton className="h-8 w-[147px] rounded-full" />
          <Skeleton className="h-8 w-[148px] rounded-full" />
          <Skeleton className="h-8 w-[143px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
