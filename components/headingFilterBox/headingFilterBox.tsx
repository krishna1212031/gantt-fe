import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import Filters, { FiltersProps } from "../projects/filters/filters";

interface HeadingFilterBoxProps extends FiltersProps {
  onCreate: () => void;
}

const gridStyle = {
  padding: "10px 0 16px"
};

const HeadingFilterBox: FunctionComponent<HeadingFilterBoxProps> = ({ onCreate, ...filterProps }) => {
  return (
    <Grid container sx={gridStyle} justifyContent="space-between">
      <Button variant="contained" onClick={onCreate}>
        New Project
      </Button>
      <Filters {...filterProps} />
    </Grid>
  );
};

export default HeadingFilterBox;
