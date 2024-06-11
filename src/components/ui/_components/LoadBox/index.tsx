import { Skeleton } from "@/components/ui/skeleton";

export function LoadBox() {
 return (
  <div className="flex flex-col space-y-3 w-full items-center py-4 my-auto">
   <Skeleton className="h-[125px] w-11/12 rounded-xl bg-secondary" />
   <div className="flex items-center space-x-4 w-11/12">
    <Skeleton className="h-12 w-12 rounded-full bg-secondary" />
    <div className="space-y-2 w-full">
     <Skeleton className="h-4 w-9/12 bg-secondary" />
     <Skeleton className="h-4 w-7/12 bg-secondary" />
     <Skeleton className="h-4 w-5/12 bg-secondary" />
    </div>
   </div>
  </div>
 );
}
