export enum JobEnum {
  FULL_TIME = "full_time",
  CONTRACT = "contract",
  PART_TIME = "part_time",
  FREELANCE = "freelance",
  INTERNSHIP = "internship",
}

export type JobType = {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  job_type: JobEnum;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
};

export interface Job {
  id: string;
  title: string;
  company_name: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  company_logo: string;
  publication_date: string;
  job_type: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
}

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
};
