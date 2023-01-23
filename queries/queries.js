import { gql } from "@apollo/client";

const getProjects = gql`
  query projects($type: ProjectType, $search: String) {
    getProjects(type: $type, search: $search) {
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
