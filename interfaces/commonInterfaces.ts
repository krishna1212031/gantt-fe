
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

export type Order = 'asc' | 'desc';
