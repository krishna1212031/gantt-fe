import { gql } from "@apollo/client";

const getProjects = gql`
  query projects($type: ProjectType) {
    getProjects(type: $type) {
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
