import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;
    const boundaries = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= boundaries ||
        i > totalPages - boundaries ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <View className="flex-row items-center justify-center py-4 px-2">
      {/* Previous button */}
      <TouchableOpacity
        className={`px-3 py-1.5 rounded-md border border-neutral-200 ${
          currentPage === 1 ? "opacity-50" : ""
        }`}
        onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        activeOpacity={currentPage === 1 ? 1 : 0.7}
      >
        <Text className="text-sm font-medium text-neutral-700">Previous</Text>
      </TouchableOpacity>

      {/* Page numbers */}
      <View className="flex-row items-center mx-1">
        {getPageNumbers().map((pageNum, idx) => (
          <React.Fragment key={idx}>
            {typeof pageNum === "number" ? (
              <TouchableOpacity
                className={`min-w-[32px] h-8 items-center justify-center rounded-md mx-0.5 ${
                  pageNum === currentPage
                    ? "bg-primary-500"
                    : "bg-white border border-neutral-200"
                }`}
                onPress={() => onPageChange(pageNum)}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-sm font-medium ${
                    pageNum === currentPage ? "text-white" : "text-neutral-700"
                  }`}
                >
                  {pageNum}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text className="text-neutral-500 px-1">...</Text>
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Next button */}
      <TouchableOpacity
        className={`px-3 py-1.5 rounded-md border border-neutral-200 ${
          currentPage === totalPages ? "opacity-50" : ""
        }`}
        onPress={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        activeOpacity={currentPage === totalPages ? 1 : 0.7}
      >
        <Text className="text-sm font-medium text-neutral-700">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
