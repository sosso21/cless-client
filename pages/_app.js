import {useEffect} from "react";
import "../styles/bootstrap/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {session} from "../plugin/session"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
 session()
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
