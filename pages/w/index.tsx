import client from "../../apollo-client";
import { getProjects } from "../../queries/queries";
import { FunctionComponent } from "react";
import { Project } from "../../interfaces/commonInterfaces";
import CommonTable from "../../components/common/CommonTable";
import { projectListHeader } from "../../constents/constents";
import { GetServerSideProps } from "next";

interface ProjectListProps {
  projectList: Array<Project>;
}

const ProjectList: FunctionComponent<ProjectListProps> = ({ projectList }) => {
  return (
    <section className="container" style={{ height: "100%" }}>
      
      <CommonTable tableHead={projectListHeader} tableBody={projectList} />
    </section>
  );
};

export default ProjectList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: getProjects,
    variables: { type: context.query.type},
  });

  return {
    props: {
      projectList: data.getProjects,
    },
  };
}
