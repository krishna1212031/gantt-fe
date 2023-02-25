import { FunctionComponent } from "react";
import { Project } from "../../interfaces/commonInterfaces";
import ProjectTable from "../../components/projects/projectTable/projectTable";
import { projectListHeader } from "../../constants/constants";
import { GetServerSideProps } from "next";
import { get } from "../../utils/request";

interface ProjectListProps {
  data: {
    docs: Array<Project>;
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
}

const ProjectList: FunctionComponent<ProjectListProps> = ({ data }) => {
  return (
    <section className="container" style={{ height: "100%" }}>
      <ProjectTable tableHead={projectListHeader} tableBody={data.docs} onSort={() => {}} sort="projectID" />
    </section>
  );
};

export default ProjectList;

export const getServerSideProps: GetServerSideProps = async context => {
  const type = (context.query.type || "active") as string;
  try {
    const { data } = await get(`/api/projects/v1`, { type });
    return {
      props: { data }
    };
  } catch (error) {
    console.error(error);
    return {
      props: {}
    };
  }
};
