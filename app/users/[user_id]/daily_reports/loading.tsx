import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-8 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
