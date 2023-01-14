import {
  Drawer as MuiDrawer,
  IconButton,
  styled,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  CSSObject
} from "@mui/material";
import { ArrowBack, ArrowForward, ViewTimeline } from "@mui/icons-material";
import { FunctionComponent, useState } from "react";

interface SideBarProps {}

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

const SideBar: FunctionComponent<SideBarProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={() => setOpen(!open)}>{open ? <ArrowBack /> : <ArrowForward />}</IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
              <ViewTimeline />
            </ListItemIcon>

            <ListItemText primary="Project" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
