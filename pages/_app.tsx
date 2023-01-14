import "../styles/globals.css";
import type { AppProps } from 'next/app'

const body = {
  display: "flex",
  flexDirection: "column",
};

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

