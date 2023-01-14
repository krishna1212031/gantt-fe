import { Box, Grid } from "@mui/material";
import { FunctionComponent } from "react";

interface headingSearchBoxProps {}
const boxStyle = {
  height: "auto",
  width: "auto",
};

const gridStyle = {
  padding: "10px 0 18px",
};

const HeadingSearchBox: FunctionComponent<headingSearchBoxProps> = () => {
  return (
    <Grid container sx={gridStyle} justifyContent="space-between">
      <Box sx={boxStyle}>Projects</Box>
      <Box sx={boxStyle}>Search</Box>
    </Grid>
  );
};

export default HeadingSearchBox;
