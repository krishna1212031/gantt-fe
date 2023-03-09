export interface Project {
  projectID: string;
  name: string;
  desc: string;
  scheduledStartDate: string;
  scheduledEndDate?: string;
  actualStartDate?: string;
  actualEndDate?: string;
  expectedEndDate?: string;
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

export type IAddress = {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pinCode: string;
};
