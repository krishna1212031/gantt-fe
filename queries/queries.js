import { gql } from "@apollo/client";

const getProjects = gql`
  query projects($type: ProjectType, $search: String, $fromDate: Date, $toDate: Date) {
    getProjects(type: $type, search: $search, fromDate: $fromDate, toDate: $toDate) {
      projectID
      name
      scheduledStartDate
      scheduledEndDate
      actualStartDate
      actualEndDate
      status
      projectOwner
    }
  }
`;

export { getProjects };
