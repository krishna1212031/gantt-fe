import { FunctionComponent, useState, useEffect } from "react";
import { IPaginatedData, Order, Project } from "../../../interfaces/commonInterfaces";
import ProjectTable from "../../../components/projects/projectTable/projectTable";
import { projectListHeader } from "../../../constants/constants";
import { GetServerSideProps } from "next";
import ProjectListTab from "../../../components/tabs/projectListTab";
import { Box, Paper, Typography } from "@mui/material";
import HeadingFilterBox from "../../../components/headingFilterBox/headingFilterBox";
import { useRouter } from "next/router";
import { get } from "../../../utils/request";

// TODO:
// 1. Add error state
// 2. Add loading state

interface ProjectListProps {
  data?: IPaginatedData<Project>;
  message?: string;
}

interface IFilters {
  search?: string;
  fromDate?: string;
  toDate?: string;
  sort: string;
}

const blankPaginateData: IPaginatedData<Project> = { docs: [], limit: 0, page: 0, pages: 0, total: 0 };

const ProjectList: FunctionComponent<ProjectListProps> = ({ data = blankPaginateData, message }) => {
  const { docs, ...paginate } = data;
  const router = useRouter();
  const [projects, setProjects] = useState(docs);
  const [pagination, setPagination] = useState<Omit<IPaginatedData<Project>, "docs">>(paginate);
  const [apiError, setApiError] = useState(message || null);
  const [filters, setFilters] = useState<IFilters>({ sort: "-_id" });

  useEffect(() => {
    const { docs, ...rest } = data;
    setProjects(data.docs || []);
    setPagination(rest);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { docs, ...rest }
        } = await get<IPaginatedData<Project>>(`/api/projects/v1`, {
          type: (router.query.type || "active") as string,
          ...filters,
          page: pagination.page
        });
        setProjects(docs);
        setPagination(rest);
        setApiError(null);
      } catch (error: any) {
        const { docs, ...rest } = data;
        setProjects(docs);
        setPagination(rest);
        setApiError(error.message);
      }
    };

    fetchData();
  }, [filters, pagination.page]);

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
        <Typography variant="h4" component="h1" gutterBottom>
          Projects
        </Typography>
        <HeadingFilterBox onSearch={handleSearch} onFilterFromDate={handleFilterFromDate} onFilterToDate={handleFilterToDate} />
        <ProjectListTab />
        {apiError && <div>{apiError}</div>}
        <ProjectTable
          tableHead={projectListHeader}
          tableBody={projects}
          onSort={handleSort}
          sort={filters.sort}
          pagination={pagination}
          onPageChange={page => setPagination(prev => ({ ...prev, page }))}
        />
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
    console.error(error);
    return {
      props: { message: error.message }
    };
  }
};
