import "../styles/globals.css";
import type { AppProps } from "next/app";
import SideBar from "../components/sideBar";
import { Box, ThemeProvider } from "@mui/material";
import { ganttTheme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={ganttTheme}>
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Component {...pageProps} />
      </Box>
    </Box>
    </ThemeProvider>
  );
}
