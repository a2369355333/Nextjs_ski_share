import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Button,
} from "@headlessui/react";

interface PaginationProps {
  totalPages: number;
  total: number;
}

const Pagination = ({ totalPages, total }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "3";

  const currentPage = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  // Add validation to ensure values are valid
  const startItem = (currentPage - 1) * limitNum + 1;
  const endItem = Math.min(currentPage * limitNum, total);

  // Check if values are valid
  const isValidData = !isNaN(startItem) && !isNaN(endItem) && total > 0;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const isOnlyOnePage = totalPages === 1;

  const handleLimitChange = (newLimit: string) => {
    router.push(`/?page=1&limit=${newLimit}`, { scroll: false });
  };

  // Generate page numbers (with ellipsis)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const maxPages = isMobile ? 3 : 7;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (isMobile) {
        if (currentPage <= 2) {
          pages.push(1, 2, 3, "...", totalPages);
        } else if (currentPage >= totalPages - 1) {
          pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, "...", currentPage, "...", totalPages);
        }
      } else {
        if (currentPage <= 4) {
          pages.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (currentPage > totalPages - 4) {
          pages.push(
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          );
        } else {
          pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
          );
        }
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mt-8 mb-5">
      {/* Pagination buttons */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <Button
          type="button"
          disabled={isFirstPage || isOnlyOnePage}
          onClick={() =>
            router.push(`/?page=${currentPage - 1}&limit=${limit}`, {
              scroll: false,
            })
          }
          className={`
            min-w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
            font-medium transition-all duration-300
            ${
              isFirstPage || isOnlyOnePage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : `
                  bg-white text-rose-700 border-2 border-rose-200
                  hover:bg-rose-200 hover:text-rose-800 hover:shadow-md
                  active:bg-rose-300 active:shadow-inner
                `
            }
          `}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Page numbers */}
        {pageNumbers.map((pageNum, i) =>
          pageNum === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="min-w-10 h-10 flex items-center justify-center text-rose-700"
            >
              ...
            </span>
          ) : (
            <Link
              key={`page-${i}-${pageNum}`}
              href={`/?page=${pageNum}&limit=${limit}`}
              scroll={false}
              aria-current={currentPage === pageNum ? "page" : undefined}
              className={`
                min-w-10 h-10 flex items-center justify-center rounded-full
                font-medium transition-all duration-300
                ${
                  currentPage === pageNum
                    ? "bg-rose-400 text-white shadow-[0_4px_20px_rgba(251,113,133,0.4)] scale-110"
                    : `
                      bg-rose-200 text-rose-700
                      hover:bg-rose-300 hover:text-rose-800 hover:shadow-md
                      active:bg-rose-400 active:text-white
                    `
                }
              `}
            >
              {pageNum}
            </Link>
          )
        )}

        {/* Next */}
        <Button
          type="button"
          disabled={isLastPage || isOnlyOnePage}
          onClick={() =>
            router.push(`/?page=${currentPage + 1}&limit=${limit}`, {
              scroll: false,
            })
          }
          className={`
            min-w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
            font-medium transition-all duration-300
            ${
              isLastPage || isOnlyOnePage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : `
                  bg-white text-rose-700 border-2 border-rose-200
                  hover:bg-rose-200 hover:text-rose-800 hover:shadow-md
                  active:bg-rose-300 active:shadow-inner
                `
            }
          `}
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      {/* Page size + range */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-rose-600 font-medium">Page Size:</label>
        <Listbox value={limit} onChange={handleLimitChange}>
          {({ open }) => (
            <>
              <ListboxButton
                className={`
                  relative w-16 px-4 py-2 flex items-center justify-between rounded-full
                  cursor-pointer text-sm font-medium bg-rose-100 text-rose-700
                  hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400
                  transition-all duration-300
                `}
              >
                <span>{limit}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </ListboxButton>

              <ListboxOptions
                modal={false}
                anchor="bottom"
                className="mt-2 w-16 rounded-2xl bg-white shadow-lg
                border-2 border-rose-200 py-1 focus:outline-none [--anchor-gap:8px]"
              >
                {["3", "5", "10", "15", "20"].map((option) => (
                  <ListboxOption
                    key={option}
                    value={option}
                    className="cursor-pointer px-4 py-2 text-sm font-medium
                    flex items-center justify-center transition-colors
                    data-focus:bg-rose-100 data-selected:text-rose-700 text-gray-700"
                  >
                    {option}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </>
          )}
        </Listbox>
        {/* Range display with fixed width to prevent layout shift */}
        <div className="text-sm text-rose-600 font-medium text-right">
          {isValidData ? (
            `${startItem}-${endItem} of ${total}`
          ) : (
            <div className="flex items-center justify-end gap-1">
              <div
                className="w-2 h-2 bg-rose-300 rounded-full animate-pulse"
                style={{ animationDelay: "0ms", animationDuration: "1000ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"
                style={{ animationDelay: "150ms", animationDuration: "1000ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"
                style={{ animationDelay: "300ms", animationDuration: "1000ms" }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
