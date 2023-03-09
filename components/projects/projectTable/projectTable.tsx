import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FunctionComponent } from "react";
import { IPaginatedData, IProjectListHeader, Order, Project } from "../../../interfaces/commonInterfaces";
import moment from "moment";
import { TablePagination, TableSortLabel } from "@mui/material";
import Link from "next/link";

interface ProjectTableProps {
  tableHead: IProjectListHeader[];
  tableBody: Project[];
  onSort: (order: Order, orderBy: string) => void;
  sort: string;
  pagination: Omit<IPaginatedData<unknown>, "docs">;
  onPageChange: (page: number) => void;
}

interface TableHeadProps {
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
}

const tableCellStyle = {
  fontWeight: 600
};

const ProjectTable: FunctionComponent<ProjectTableProps> = ({ tableHead, tableBody, onSort, sort, pagination, onPageChange }) => {
  let order: Order, orderBy: string;
  if (sort.startsWith("-")) {
    order = "desc";
    orderBy = sort.slice(1);
  } else {
    order = "asc";
    orderBy = sort;
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    onSort(isAsc ? "desc" : "asc", property);
  };

  const SortingTableHead = ({ order, orderBy, onRequestSort }: TableHeadProps) => {
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead component="div">
        <TableRow component="div">
          {tableHead.map(header => (
            <TableCell component="div" sx={tableCellStyle} key={header.id} sortDirection={orderBy === header.id ? order : false}>
              <TableSortLabel
                component="div"
                active={orderBy === header.id}
                direction={orderBy === header.id ? order : "asc"}
                onClick={createSortHandler(header.id)}
              >
                {header.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table component="div" sx={{ minWidth: 650 }} aria-label="simple table">
          <SortingTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody component="div">
            {tableBody.map(row => (
              <TableRow
                key={row.projectID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                component={Link}
                href={`/w/projects/${row.projectID}`}
              >
                <TableCell component="div" sx={{ width: 130 }}>
                  {row.status}
                </TableCell>
                <TableCell component="div" sx={{ width: 130 }}>{row.projectID}</TableCell>
                <TableCell component="div" sx={{ width: "auto" }}>{row.name}</TableCell>
                <TableCell component="div" sx={{ width: 300 }}>{row.owner}</TableCell>
                <TableCell component="div" sx={{ width: 200 }}>
                  {row.actualStartDate ? moment(row.actualStartDate).format("LL") : moment(row.scheduledStartDate).format("LL")}
                </TableCell>
                <TableCell component="div" sx={{ width: 200 }}>
                  {row.actualEndDate
                    ? moment(row.actualEndDate).format("LL")
                    : row.scheduledEndDate
                    ? moment(row.scheduledEndDate).format("LL")
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={pagination.total}
        rowsPerPage={pagination.limit}
        rowsPerPageOptions={[pagination.limit]}
        page={pagination.page - 1}
        onPageChange={(_, page) => onPageChange(page + 1)}
        component="div"
      />
    </>
  );
};

export default ProjectTable;
