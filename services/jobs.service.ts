import axiosInstance from "@/lib/axios";
import { Payload } from "@/types/general";

export const getJobs = async ({
  page = 0,
  limit = 12,
  search,
  category,
}: Payload) => {
  const params: Record<string, string | number> = {
    limit,
    offset: page, // Use `offset` for pagination
  };

  if (search) params.search = search;
  if (category) params.category = category;

  const response = await axiosInstance.get("/remote-jobs", { params });
  return response.data;
};

export const getCategories = async () => {
  // Initialize URL with id
  let url = `/remote-jobs/categories`;

  const response = await axiosInstance.get(url);
  return response.data.jobs;
};
