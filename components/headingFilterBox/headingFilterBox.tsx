import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import Filters, { FiltersProps } from "../projects/filters/filters";

interface HeadingFilterBoxProps extends FiltersProps {}

const gridStyle = {
  padding: "10px 0 16px"
};

const HeadingFilterBox: FunctionComponent<HeadingFilterBoxProps> = ({ ...filterProps }) => {
  return (
    <Grid container sx={gridStyle} justifyContent="space-between">
      <Link href="/w/projects/create">
        <Button variant="contained">New Project</Button>
      </Link>
      <Filters {...filterProps} />
    </Grid>
  );
};

export default HeadingFilterBox;
