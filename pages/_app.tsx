import "../styles/globals.css";
import type { AppProps } from "next/app";
import SideBar from "../components/sideBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SideBar />
      <Component {...pageProps} />
    </>
  );
}
