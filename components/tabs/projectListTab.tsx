import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      sx={{ fontWeight: 600 }}
      LinkComponent={Link}
      {...props}
    />
  );
}

export default function ProjectListTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#e7ebf0" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Ative Projets" href="?type=active" />
        <LinkTab label="Inactive Projets" href="?type=inactive" />
      </Tabs>
    </Box>
  );
}
