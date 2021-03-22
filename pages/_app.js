import Layout from "../components/layout/layout";
import { Provider } from "next-auth/client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // pageProps are passed via SSR. EG /profile route sets session on  ssr
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
