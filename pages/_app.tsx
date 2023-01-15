import "../styles/globals.css";
import type { AppProps } from "next/app";
import SideBar from "../components/sideBar";
import { Box } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Component {...pageProps} />
      </Box>
    </Box>
  );
}
