import { useInfiniteQuery } from "@tanstack/react-query";

import { LIMIT } from "@/constants";
import { getJobs } from "@/services/jobs.service";

type Params = { search?: string; category?: string };

export function useRemoteJobs({ search, category }: Params) {
  return useInfiniteQuery({
    queryKey: ["jobs", { search, category }], // Ensure filters are included
    queryFn: ({ pageParam = 0 }) =>
      getJobs({ page: pageParam, limit: LIMIT, search, category }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.jobs || lastPage.jobs.length < LIMIT) return undefined; // Stop when no more jobs
      return allPages.length * LIMIT; // Offset = (number of pages loaded) * LIMIT
    },
  });
}
