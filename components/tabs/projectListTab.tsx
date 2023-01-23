import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import { useRouter } from "next/router";

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return <Tab sx={{ fontWeight: 600 }} LinkComponent={Link} {...props} />;
}

const tabList = [
  {
    label: "Active Projets",
    type: "active"
  },
  {
    label: "Inactive Projets",
    type: "inactive"
  }
];

export default function ProjectListTab() {
  const router = useRouter();
  const tabIndex = tabList.findIndex(({ type }) => type === router.query.type);
  const [value, setValue] = React.useState(tabIndex === -1 ? 0 : tabIndex);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#e7ebf0" }}>
      <Tabs value={value} onChange={handleChange} aria-label="Active/Inactive Projects">
        {tabList.map((tab, index) => (<LinkTab key={index} label={tab.label} href={`?type=${tab.type}`} />))}
      </Tabs>
    </Box>
  );
}
