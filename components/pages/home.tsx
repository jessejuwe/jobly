"use client";

import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ClientOnly } from "@chakra-ui/react";

import { JobCard } from "@/components/jobs/job-card";
import { JobFilters } from "@/components/jobs/job-filters";
import { Button } from "@/components/ui/button";
import { useJobStore } from "@/lib/store";
import { getCategories, getJobs } from "@/services/jobs.service";
import { Job, JobType } from "@/types/jobs";

const JOBS_PER_PAGE = 12;

type Props = {
  page: number;
  limit: number;
  search: string;
  location: string;
  category: string;
};

function JobCardSkeleton() {
  return (
    <div className="h-[350px] bg-card rounded-lg animate-pulse flex flex-col">
      <div className="h-full p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-muted"></div>
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-20 bg-muted rounded"></div>
          <div className="h-6 w-20 bg-muted rounded"></div>
        </div>
        <div className="mt-auto">
          <div className="h-10 bg-muted rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default function Home({
  page,
  limit,
  search,
  location,
  category,
}: Props) {
  const [filters, setFilters] = useState({ search, location, category });

  const observerRef = useRef<HTMLDivElement | null>(null);

  const { setCategories } = useJobStore();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (categories) {
      setCategories(categories);
    }
  }, [categories]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["jobs", { search, location, category }],
    queryFn: ({ pageParam = 1 }) =>
      getJobs({ limit, category, search, location, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages?.length + 1;
      return lastPage?.jobs?.length === JOBS_PER_PAGE ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  // Intersection Observer to trigger fetchNextPage() when the user scrolls down
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const allJobs: Job[] = data?.pages.flatMap((page) => page.jobs) ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <JobFilters onFilterChange={setFilters} />
        </div>
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allJobs.map((job, index) => (
                  <JobCard
                    key={`${index}-${job?.id}`}
                    job={job}
                    index={index}
                  />
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={observerRef} className="h-1" />

              {/* Manual Load More Button */}
              {hasNextPage && (
                <div className="mt-8 flex justify-center">
                  <Button
                    asChild
                    colorPalette="primary"
                    disabled={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    variant="subtle"
                  >
                    <span>
                      {isFetchingNextPage
                        ? "Loading more..."
                        : "Load More Jobs"}
                    </span>
                  </Button>
                </div>
              )}

              {/* No More Jobs Message */}
              {!hasNextPage && (
                <p className="text-center mt-4">No more jobs available</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
