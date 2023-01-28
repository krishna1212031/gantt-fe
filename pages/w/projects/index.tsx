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

interface IFilters {
  search?: string;
  fromDate?: string;
  toDate?: string;
}

const ProjectList: FunctionComponent<ProjectListProps> = ({ projectList }) => {
  const router = useRouter();
  const [projects, setProjects] = useState(projectList);
  const [filters, setFilters] = useState<IFilters>({});

  useEffect(() => {
    setProjects(projectList);
  }, [projectList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredProjects = await client.query({
          query: getProjects,
          variables: { type: router.query.type, ...filters }
        });
        setProjects(filteredProjects.data.getProjects);
      } catch (error) {}
    };

    fetchData();
  }, [filters]);

  const handleSearch = (val: string) => setFilters(prev => ({ ...prev, search: val }));

  const handleFilterFromDate = (val: moment.Moment | null) => setFilters(prev => ({ ...prev, fromDate: val?.toJSON() }));

  const handleFilterToDate = (val: moment.Moment | null) => setFilters(prev => ({ ...prev, toDate: val?.toJSON() }));

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          padding: "8px 14px",
          minHeight: "calc(100vh - 64px)"
        }
      }}
    >
      <Paper>
        <HeadingFilterBox
          title="Projects"
          onSearch={handleSearch}
          onFilterFromDate={handleFilterFromDate}
          onFilterToDate={handleFilterToDate}
        />
        <ProjectListTab />
        <CommonTable tableHead={projectListHeader} tableBody={projects} />
      </Paper>
    </Box>
  );
};

export default ProjectList;

export const getServerSideProps: GetServerSideProps = async context => {
  const { data } = await client.query({
    query: getProjects,
    variables: { type: context.query.type }
  });

  return {
    props: {
      projectList: data.getProjects
    }
  };
};
