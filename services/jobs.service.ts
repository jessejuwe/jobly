import axiosInstance from "@/lib/axios";
import { Payload } from "@/types/general";

export const getJobs = async (payload: Payload) => {
  const page = payload?.page || 1;
  const limit = payload?.limit || 10;
  const location = payload?.location;
  const search = payload?.search;
  const category = payload?.category;

  const params = { search, location, page, category };

  // Initialize URL with limit and page
  let url = `/remote-jobs?limit=${limit}`;

  // Append other parameters if they exist
  // if (search) url += `&search=${encodeURIComponent(search)}`;
  // if (location) url += `&location=${encodeURIComponent(location)}`;
  // if (category) url += `&category=${encodeURIComponent(category)}`;

  const response = await axiosInstance.get(url, { params });
  return response.data;
};

export const getJobById = async (id: string) => {
  // Initialize URL with id
  let url = `/remote-jobs?id=${id}`;
  const response = await axiosInstance.get(url);
  return response.data.data;
};

export const getCategories = async () => {
  // Initialize URL with id
  let url = `/remote-jobs/categories`;

  const response = await axiosInstance.get(url);
  return response.data.jobs;
};
