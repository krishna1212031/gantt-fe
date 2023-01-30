import { FunctionComponent, useState, useEffect } from "react";
import { Order, Project } from "../../../interfaces/commonInterfaces";
import CommonTable from "../../../components/common/commonTable";
import { projectListHeader } from "../../../constants/constants";
import { GetServerSideProps } from "next";
import ProjectListTab from "../../../components/tabs/projectListTab";
import { Box, Paper } from "@mui/material";
import HeadingFilterBox from "../../../components/headingFilterBox/headingFilterBox";
import { useRouter } from "next/router";
import { get } from "../../../utils/request";

interface ProjectListProps {
  data?: {
    docs: Array<Project>;
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
  message?: string;
}

interface IFilters {
  search?: string;
  fromDate?: string;
  toDate?: string;
  sort: string;
}

const ProjectList: FunctionComponent<ProjectListProps> = ({ data, message }) => {
  const router = useRouter();
  const [projects, setProjects] = useState(data?.docs || []);
  const [apiError, setApiError] = useState(message || null);
  const [filters, setFilters] = useState<IFilters>({ sort: "-_id" });

  useEffect(() => {
    setProjects(data?.docs || []);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await get(`/api/projects/v1`, { type: (router.query.type || "active") as string, ...filters });
        setProjects(data.docs);
        setApiError(null);
      } catch (error: any) {
        setProjects([]);
        setApiError(error.message);
      }
    };

    fetchData();
  }, [filters]);

  const handleSearch = (val: string) => setFilters(prev => ({ ...prev, search: val }));

  const handleFilterFromDate = (val: moment.Moment | null) => setFilters(prev => ({ ...prev, fromDate: val?.toJSON() }));

  const handleFilterToDate = (val: moment.Moment | null) => setFilters(prev => ({ ...prev, toDate: val?.toJSON() }));

  const handleSort = (order: Order, orderBy: string) => setFilters(prev => ({ ...prev, sort: order === "asc" ? orderBy : `-${orderBy}` }));

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
        {apiError && <div>{apiError}</div>}
        <CommonTable tableHead={projectListHeader} tableBody={projects} onSort={handleSort} sort={filters.sort} />
      </Paper>
    </Box>
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
  } catch (error: any) {
    console.log(error);
    return {
      props: { message: error.message }
    };
  }
};
