import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-8 w-[200px]" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
