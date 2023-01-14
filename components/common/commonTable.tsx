import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FunctionComponent } from "react";
import { Project } from "../../interfaces/commonInterfaces";
import moment from "moment";

interface CommonTableProps {
  tableHead: string[];
  tableBody: Project[];
}

const tableCellStyle = {
  fontWeight: 600,
};

const CommonTable: FunctionComponent<CommonTableProps> = ({
  tableHead,
  tableBody,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHead.map((header) => (
              <TableCell sx={tableCellStyle} key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody.map((row) => (
            <TableRow
              key={row.projectID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.status}
              </TableCell>
              <TableCell>{row.projectID}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.projectOwner}</TableCell>
              <TableCell>
                {row.actualStartDate
                  ? moment(row.actualStartDate).format("LL")
                  : moment(row.scheduledStartDate).format("LL")}
              </TableCell>
              <TableCell>
                {row.actualEndDate
                  ? moment(row.actualEndDate).format("LL")
                  : moment(row.scheduledEndDate).format("LL")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
