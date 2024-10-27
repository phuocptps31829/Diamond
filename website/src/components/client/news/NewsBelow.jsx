import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "../product/News";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/Pagination";
import { useLocation } from "react-router-dom";

export default function NewsBelow({ news, isLoading }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedNews, setPaginatedNews] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    if (!isLoading && news) {
      const trimmedNews = news;
      const total = Math.ceil(trimmedNews.length / itemsPerPage);
      setTotalPages(total);

      if (currentPage > total) {
        setCurrentPage(total);
      } else {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedNews(trimmedNews.slice(startIndex, endIndex));
      }
    }
  }, [currentPage, news, isLoading, totalPages]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    queryParams.set("page", newPage);
    window.history.pushState({}, "", `${location.pathname}?${queryParams}`);
  };

  return (
    <div className="mx-auto max-w-screen-xl p-4 lg:pb-6">
      <div className="flex items-center gap-5">
        <h2 className="whitespace-nowrap text-[22px] font-bold text-primary-500 sm:text-[28px]">
          Tin tức khác
        </h2>
        <div className="h-[2.5px] w-full bg-[linear-gradient(to_right,#007BBB,#F57116)]"></div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        { isLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={ index }>
              <div className="h-full overflow-hidden rounded-xl bg-[#ffffff56] shadow-sm">
                <div className="block gap-4 overflow-hidden rounded-md md:row-span-3 md:grid-rows-subgrid">
                  <div className="h-[250px] w-full rounded-lg">
                    <Skeleton className="h-full w-full rounded-t-lg" />
                  </div>
                  <div className="flex h-full flex-col p-5">
                    <Skeleton className="mb-2 h-[18px] w-3/4 rounded-md" />
                    <div className="mb-[6px] flex items-center gap-2 text-[12px]">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-[14px] w-1/2 rounded-md" />
                      <div>|</div>
                      <Skeleton className="h-[14px] w-1/4 rounded-md" />
                    </div>
                    <Skeleton className="line-clamp-2 h-[36px] w-full overflow-hidden text-ellipsis rounded-md text-[12px] text-[#6D7280] sm:text-[14px]" />
                    <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-[14px] w-1/4 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
          : paginatedNews.map((newsItem, index) => (
            <div key={ index }>
              <NewsItem { ...newsItem } />
            </div>
          )) }
      </div>
      { totalPages > 1 && (
        <Pagination className="py-5">
          <PaginationContent className="hover:cursor-pointer">
            <PaginationItem>
              <PaginationPrevious
                onClick={ () =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                className={
                  currentPage === 1 ? "opacity-50 hover:cursor-default" : ""
                }
              />
            </PaginationItem>
            { Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={ index }>
                <PaginationLink
                  onClick={ () => handlePageChange(index + 1) }
                  isActive={ currentPage === index + 1 }
                >
                  { index + 1 }
                </PaginationLink>
              </PaginationItem>
            )) }
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={ () =>
                  handlePageChange(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                className={
                  currentPage === totalPages
                    ? "opacity-50 hover:cursor-default"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) }
    </div>
  );
}

NewsBelow.propTypes = {
  news: PropTypes.array,
  isLoading: PropTypes.bool,
};
