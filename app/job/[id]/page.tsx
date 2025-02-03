import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/app/get-query-client";
import JobDetails from "@/components/pages/job";

type Params = Promise<{ id: string }>;
type Props = { params: Params };

export const metadata: Metadata = { title: "Job Detail" };

export default async function JobDetailsPage({ params }: Props) {
  const id = (await params).id;

  const queryClient = getQueryClient();

  return (
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobDetails />
    </HydrationBoundary>
  );
}
