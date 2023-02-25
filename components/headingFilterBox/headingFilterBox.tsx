import { Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Filters, { FiltersProps } from "../projects/filters/filters";

interface HeadingFilterBoxProps extends FiltersProps {
  title: string;
}

const gridStyle = {
  padding: "10px 0 18px"
};

const HeadingFilterBox: FunctionComponent<HeadingFilterBoxProps> = ({ title, ...filterProps }) => {
  return (
    <Grid container sx={gridStyle} justifyContent="space-between">
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Filters {...filterProps} />
    </Grid>
  );
};

export default HeadingFilterBox;
