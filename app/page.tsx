import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/app/get-query-client";
import Home from "@/components/pages/home";
import { getCategories, getJobs } from "@/services/jobs.service";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Props = { searchParams: SearchParams };

export default async function HomePage({ searchParams }: Props) {
  const queryClient = getQueryClient();

  // Build the payload dynamically from searchParams
  const page = parseInt(((await searchParams).page as string) ?? "1", 10);
  const limit = parseInt(((await searchParams).limit as string) ?? "12", 10);
  const search = ((await searchParams).search as string) ?? "";
  const category = ((await searchParams).category as string) ?? "";
  const location = ((await searchParams).location as string) ?? "";
  const payload = { page, limit, search, location, category };

  try {
    // Prefetch categories
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => getCategories(),
    });
  } catch (error) {
    console.error(error);
  }

  try {
    // Prefetch first page data
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["jobs", { limit, search, location, category }],
      queryFn: ({ pageParam = 1 }) => getJobs({ ...payload, page: pageParam }),
      initialPageParam: 1,
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
