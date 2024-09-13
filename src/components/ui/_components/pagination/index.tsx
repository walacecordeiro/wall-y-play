import { useEffect, useState } from "react";
import {
 PaginationContent,
 PaginationItem,
 PaginationPrevious,
 PaginationLink,
 PaginationNext,
 Pagination,
} from "../../pagination";

type propsMyPagination = {
 currentPage: number;
 previousPage: () => void;
 nextPage: () => void;
};

export default function MyPagination({ previousPage, currentPage, nextPage }: propsMyPagination) {
 return (
  <Pagination className="z-50 flex flex-col gap-4 items-center fixed bottom-0 left-0 bg-gradient-to-t from-background from-10% via-background via-95% to-transparent to-100% py-4 md:w-fit md:px-4 md:rounded-3xl md:m-4 md:border-2 md:bg-background md:shadow-2xl">
   <PaginationContent>
    <PaginationItem>
     <PaginationPrevious
      onClick={previousPage}
      className="p-0 sm:px-2.5 cursor-pointer transition-all active:scale-75 hover:bg-transparent lg:hover:bg-muted"
     />
    </PaginationItem>
    <PaginationItem>
     <PaginationLink
      onClick={previousPage}
      className="cursor-pointer transition-all active:scale-75 hover:bg-transparent lg:hover:bg-muted"
     >
      {currentPage - 1}
     </PaginationLink>
    </PaginationItem>
    <PaginationItem>
     <PaginationLink className="border-primary" isActive>
      {currentPage}
     </PaginationLink>
    </PaginationItem>
    <PaginationItem>
     <PaginationLink
      onClick={nextPage}
      className="cursor-pointer transition-all active:scale-75 hover:bg-transparent lg:hover:bg-muted"
     >
      {currentPage + 1}
     </PaginationLink>
    </PaginationItem>
    <PaginationItem>
     <PaginationNext
      onClick={nextPage}
      className="p-0 sm:px-2.5 cursor-pointer transition-all active:scale-75 hover:bg-transparent lg:hover:bg-muted"
     />
    </PaginationItem>
   </PaginationContent>
  </Pagination>
 );
}
