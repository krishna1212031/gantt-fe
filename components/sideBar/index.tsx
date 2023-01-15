import { IconButton, Divider, List, ListItemButton, ListItemIcon, Icon, Collapse, ListItemText } from "@mui/material";
import { ArrowBack, ArrowForward, ExpandLess, ExpandMore } from "@mui/icons-material";
import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { AccordionContainer, Drawer, DrawerHeader, ListItem } from "./styles";
import { useRouter } from "next/router";
import { RequireOnlyOne } from "../../interfaces/utils";

interface SideBarProps {}

interface SideBarItemRaw {
  icon: string;
  text: string;
  link?: string;
  children?: Required<Omit<SideBarItemRaw, "children">>[];
}

type SideBarItem = RequireOnlyOne<SideBarItemRaw, "link" | "children">;

const sideBarItems: SideBarItem[] = [
  { icon: "home", text: "Home", link: "/" },
  {
    icon: "view_timeline",
    text: "Projects",
    children: [
      {
        icon: "star",
        text: "List",
        link: "/w"
      }
    ]
  },
  {
    icon: "view_list",
    text: "Tasks",
    link: "/w/projects"
  }
];

const SideBar: FunctionComponent<SideBarProps> = () => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hovered, setHovered] = useState(false);
  // store the index of opned item in the sidebar
  const [openItem, setOpenItem] = useState<number | null>(
    sideBarItems.findIndex(item => item.children && item.children.find(child => router.pathname === child.link))
  );

  const open = openDrawer || hovered;

  const handleArrowClick = () => {
    setOpenDrawer(!openDrawer);
    setHovered(false);
  };

  const handleSideBarClick = (index: number) => {
    if (openItem === index) {
      setOpenItem(null);
    } else {
      setOpenItem(index);
    }
  };

  const IconAndText = ({ open, item }: { open: boolean; item: SideBarItem }) => (
    <>
      <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
        <Icon>{item.icon}</Icon>
      </ListItemIcon>

      <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
    </>
  );

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <Drawer variant="permanent" open={open} onMouseLeave={() => setHovered(false)}>
        <DrawerHeader>
          <IconButton onClick={handleArrowClick}>{openDrawer ? <ArrowBack /> : <ArrowForward />}</IconButton>
        </DrawerHeader>

        <Divider />

        <List onMouseEnter={() => setHovered(true)}>
          {sideBarItems.map((item, index) => (
            <ListItem
              disablePadding
              key={item.text}
              isActive={
                item.children
                  ? Boolean(openItem !== index && item.children.find(child => router.pathname === child.link))
                  : router.pathname === item.link
              }
            >
              {item.children ? (
                <AccordionContainer open={openItem === index}>
                  <ListItemButton
                    sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}
                    onClick={() => handleSideBarClick(index)}
                  >
                    <IconAndText open={open} item={item} />

                    {open && (openItem === index ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                  <Collapse in={openItem === index} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      {item.children.map(child => (
                        <ListItem disablePadding key={child.text} isActive={router.pathname === child.link}>
                          <Link href={child.link}>
                            <ListItemButton sx={{ pl: open ? 4 : 2.5, pr: 2.5, py: 0, minHeight: 32 }}>
                              <IconAndText open={open} item={child} />
                            </ListItemButton>
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </AccordionContainer>
              ) : (
                <Link href={item.link}>
                  <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                    <IconAndText open={open} item={item} />
                  </ListItemButton>
                </Link>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
