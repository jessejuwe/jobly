"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, Globe, MapPin } from "lucide-react";
import { Badge, Box } from "@chakra-ui/react";

import { Button } from "../ui/button";
import { ApplicationForm } from "../jobs/application-form";
import { useJobStore } from "@/lib/store";
import { JobEnum } from "@/types/jobs";
import { formatJobType } from "@/utils/utils";

export default function JobDetails() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { job } = useJobStore();

  function handleOpen() {
    setOpen(true);
  }

  function Skeleton() {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-2/3 bg-muted rounded"></div>
        <div className="h-4 w-1/3 bg-muted rounded"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-4 w-2/3 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <Box className="text-center py-12" colorPalette="primary">
        <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The job you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild onClick={() => router.push("/")} variant="subtle">
          <span>Back to Jobs</span>
        </Button>
      </Box>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        bg="primary.solid"
        className="btn mb-6 text-white"
        onClick={() => router.push("/")}
        variant="ghost"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{job?.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Badge variant="subtle">
                <Building2 className="mr-1 h-4 w-4" />
                {job?.company_name}
              </Badge>
              <Badge colorPalette="primary" variant="subtle">
                <MapPin className="mr-1 h-4 w-4" />
                {job?.candidate_required_location}
              </Badge>
              <Badge colorPalette="secondary" variant="subtle">
                <Globe className="mr-1 h-4 w-4" />
                {formatJobType(job?.job_type as JobEnum)}
              </Badge>
            </div>
          </div>

          <Button
            asChild
            colorPalette="primary"
            onClick={handleOpen}
            variant="subtle"
          >
            <span>Apply Now</span>
          </Button>
        </div>

        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

      <ApplicationForm job={job} open={open} setOpen={setOpen} />
    </div>
  );
}
