"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Heart, MapPin, Wallet } from "lucide-react";
import Link from "next/link";
import { Badge, Card, ClientOnly, IconButton, Skeleton, Stack } from "@chakra-ui/react"; // prettier-ignore

import { ApplicationForm } from "./application-form";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useGlobalToast } from "@/hooks/useGlobalToast";
import { useJobStore } from "@/lib/store";
import { Job, JobEnum } from "@/types/jobs";
import { formatJobType } from "@/utils/utils";

interface JobCardProps {
  job: Job;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  const [open, setOpen] = useState(false);

  const { isFavorite, addFavorite, removeFavorite, setJob } = useJobStore();
  const favorite = isFavorite(job?.id);

  const { showToast } = useGlobalToast();

  function handleFavorite(event: React.MouseEvent) {
    event.stopPropagation(); // Prevent click from propagating to parent
    if (favorite) {
      removeFavorite(job.id);
      showToast({
        title: "Success",
        type: "success",
        description: "Job removed successfully.",
      });
    } else {
      addFavorite(job);
      showToast({
        title: "Success",
        type: "success",
        description: "Job saved successfully.",
      });
    }
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card.Root
        className="h-full flex flex-col bg-card bg-gradient-to-br from-card to-accent/5"
        colorPalette="primary"
        variant="subtle"
      >
        <Card.Header className="flex flex-row items-center gap-4">
          <Avatar
            className="h-14 w-14 ring-2 ring-primary/10"
            colorPalette="primary"
            name={job?.company_name}
            src={job?.company_logo}
          />
          <div className="flex-1 min-w-0">
            <Card.Title
              className="text-lg font-semibold truncate-2-lines leading-tight"
              title={job?.title}
            >
              {job?.title}
            </Card.Title>
            <Card.Description
              className="text-sm text-muted-foreground truncate"
              title={job?.company_name}
            >
              {job?.company_name}
            </Card.Description>
          </div>
          <ClientOnly fallback={<Skeleton boxSize="8" />}>
            <IconButton
              aria-label={
                favorite ? "Remove from favorites" : "Add to favorites"
              }
              asChild
              className="shrink-0"
              colorPalette="red"
              onClick={handleFavorite}
              size="md"
              variant="plain"
            >
              <Heart
                color="red"
                size={20}
                className={`h-5 w-5 transition-colors ${
                  favorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </IconButton>
          </ClientOnly>
        </Card.Header>
        <Card.Body className="flex-1">
          <Stack direction="column" width="fit">
            <Badge className="w-fit" colorPalette="gray">
              <Wallet className="mr-1 h-4 w-4" />
              {job?.salary || "Not Available"}
            </Badge>
            <Badge className="w-fit">
              <MapPin className="mr-1 h-4 w-4" />
              {job?.candidate_required_location}
            </Badge>
            <Badge className="w-fit" colorPalette="secondary">
              <Globe className="mr-1 h-4 w-4" />
              {formatJobType(job?.job_type as JobEnum)}
            </Badge>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Button
            asChild
            borderColor="primary.focusRing"
            borderWidth={1}
            className="w-1/3"
            color="primary.solid"
            onClick={() => setJob(job)}
            variant="outline"
          >
            <Link href={`/job/${job?.id}`}>View</Link>
          </Button>

          <Button asChild className="w-2/3" color="white" onClick={handleOpen}>
            <span>Apply Now</span>
          </Button>
        </Card.Footer>
      </Card.Root>

      <ApplicationForm job={job} open={open} setOpen={setOpen} />
    </motion.div>
  );
}
