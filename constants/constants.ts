import { IProjectListHeader } from "../interfaces/commonInterfaces";

export const projectListHeader: IProjectListHeader[] = [
  {label: "Status", id: "status"},
  {label: "Project ID", id: "projectID"},
  {label: "Project Name", id: "name"},
  {label: "Project Owner", id: "owner"},
  {label: "Start Date", id: "startDate"},
  {label: "End Date", id: "endDate"},
];

export const status = {
  inProgress: "#29B6F6",
  delayed: "#FF5252",
  onHold: "#FFF176",
  scheduled: "#ffffff",
  closed: "#90A4AE",
  completed: "#4CAF50",
};
