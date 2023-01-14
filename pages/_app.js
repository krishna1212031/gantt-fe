import "../styles/globals.css";
import Header from "../components/header";

const body = {
  display: "flex",
  flexDirection: "column",
};

function MyApp({ Component, pageProps }) {
  return (
    <div style={body}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
