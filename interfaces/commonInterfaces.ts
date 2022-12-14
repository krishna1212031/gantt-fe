
export interface Project {
  projectID: string;
  name: string;
  scheduledStartDate: string;
  scheduledEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  status: string;
  projectOwner: string;
}
