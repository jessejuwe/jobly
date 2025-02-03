import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CategoryType, Job } from "@/types/jobs";

interface JobStore {
  categories: CategoryType[] | null;
  favoriteJobs: Job[];
  job: Job | null;
  addFavorite: (job: Job) => void;
  isFavorite: (jobId: string) => boolean;
  removeFavorite: (jobId: string) => void;
  setCategories: (amenities: CategoryType[] | null) => void;
  setJob: (job: Job | null) => void;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      categories: null,
      favoriteJobs: [],
      job: null,
      addFavorite: (job) =>
        set((state) => ({
          favoriteJobs: [...state.favoriteJobs, job],
        })),
      isFavorite: (jobId) => get().favoriteJobs.some((job) => job.id === jobId),
      removeFavorite: (jobId) =>
        set((state) => ({
          favoriteJobs: state.favoriteJobs.filter((job) => job.id !== jobId),
        })),
      setCategories: (categories: CategoryType[] | null) => set({ categories }),
      setJob: (job: Job | null) => set({ job }),
    }),
    {
      name: "job-store",
    }
  )
);
