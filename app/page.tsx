import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/app/get-query-client";
import Home from "@/components/pages/home";
import { LIMIT } from "@/constants";
import { getCategories, getJobs } from "@/services/jobs.service";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Props = { searchParams: SearchParams };

export default async function HomePage({ searchParams }: Props) {
  const queryClient = getQueryClient();

  // Build the payload dynamically from searchParams
  const search = ((await searchParams).search as string) ?? "";
  const category = ((await searchParams).category as string) ?? "";
  const payload = { search, category };

  try {
    // Prefetch categories
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => getCategories(),
    });

    // Prefetch first page of jobs for SSR
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["jobs", { search, category }],
      queryFn: ({ pageParam = 0 }) => getJobs({ ...payload, page: pageParam }), // prettier-ignore
      initialPageParam: 0,
      getNextPageParam: (lastPage: { jobs: string | any[]; page: number }) =>
        lastPage.jobs.length < LIMIT ? undefined : lastPage.jobs.length, // Ensure we get new pages properly
    });
  } catch (error) {
    console.error(error);
  }

  return (
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home {...payload} />
    </HydrationBoundary>
  );
}
