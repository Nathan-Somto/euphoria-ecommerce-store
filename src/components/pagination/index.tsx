"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";



export default function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  disableNext = false,
  disablePrevious = false,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-4 py-4">
     
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={disablePrevious || currentPage === 1}
        className="p-2"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>


      <span className="text-gray-700 font-medium">
        {currentPage} / {totalPages}
      </span>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={disableNext || currentPage === totalPages}
        className="p-2"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
