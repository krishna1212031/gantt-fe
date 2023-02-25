export interface Project {
  projectID: string;
  name: string;
  scheduledStartDate: string;
  scheduledEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  status: string;
  owner: string;
  client: string;
}

export interface IProjectListHeader {
  label: string;
  id: string;
}

export type Order = "asc" | "desc";

export type IPaginatedData<T> = {
  docs: Array<T>;
  total: number;
  limit: number;
  page: number;
  pages: number;
};
