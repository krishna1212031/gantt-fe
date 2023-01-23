import client from "../../../apollo-client";
import { getProjects } from "../../../queries/queries";
import { FunctionComponent, useState, useEffect } from "react";
import { Project } from "../../../interfaces/commonInterfaces";
import CommonTable from "../../../components/common/commonTable";
import { projectListHeader } from "../../../constants/constents";
import { GetServerSideProps } from "next";
import ProjectListTab from "../../../components/tabs/projectListTab";
import { Box, Paper } from "@mui/material";
import HeadingFilterBox from "../../../components/headingFilterBox/headingFilterBox";
import { useRouter } from "next/router";

interface ProjectListProps {
  projectList: Array<Project>;
}

const ProjectList: FunctionComponent<ProjectListProps> = ({ projectList }) => {
  const router = useRouter();
  const [projects, setProjects] = useState(projectList);

  useEffect(() => {
    setProjects(projectList);
  }, [projectList])
  

  const handleSearch = async (val: string) => {
    try {
      const filteredProjects = await client.query({
        query: getProjects,
        variables: { type: router.query.type, search: val },
      })
      setProjects(filteredProjects.data.getProjects);
    } catch (error) {
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          padding: "8px 14px",
          minHeight: "calc(100vh - 64px)",
        },
      }}
    >
      <Paper>
        <HeadingFilterBox title="Projects" onSearch={handleSearch} />
        <ProjectListTab />
        <CommonTable tableHead={projectListHeader} tableBody={projects} />
      </Paper>
    </Box>
  );
};

export default ProjectList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: getProjects,
    variables: { type: context.query.type },
  });

  return {
    props: {
      projectList: data.getProjects,
    },
  };
};
