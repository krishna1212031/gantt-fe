
import { Grid, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import Filters from "../projects/filters/filters";

interface HeadingFilterBoxProps {
  title: string;
  onSearch: (val: string) => void;
  debounceTime?: number;
}

const gridStyle = {
  padding: "10px 0 18px"
};

const HeadingFilterBox: FunctionComponent<HeadingFilterBoxProps> = ({ title, onSearch, debounceTime }) => {
  return (
    <Grid container sx={gridStyle} justifyContent="space-between">
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Filters onSearch={onSearch} debounceTime={debounceTime} />
    </Grid>
  );
};

export default HeadingFilterBox;
