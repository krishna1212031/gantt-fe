import client from "../../../apollo-client";
import { getProjects } from "../../../queries/queries";
import { FunctionComponent } from "react";
import { Project } from "../../../interfaces/commonInterfaces";
import CommonTable from "../../../components/common/commonTable";
import { projectListHeader } from "../../../constants/constents";
import { GetServerSideProps } from "next";
import ProjectListTab from "../../../components/tabs/projectListTab";
import { Box, Paper } from "@mui/material";
import HeadingSearchBox from "../../../components/headingSearchBox/headingSearchBox";

interface ProjectListProps {
  projectList: Array<Project>;
}

const ProjectList: FunctionComponent<ProjectListProps> = ({ projectList }) => {
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
        <HeadingSearchBox />
        <ProjectListTab />
        <CommonTable tableHead={projectListHeader} tableBody={projectList} />
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
