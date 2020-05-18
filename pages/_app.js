import { Fragment } from "react";

import { RecipesProvider } from "../context/recipes";

const MainApp = ({ Component, pageProps, route }) => {
  return (
    <Fragment>
      <RecipesProvider>
        <Component {...pageProps} key={route} />
      </RecipesProvider>
    </Fragment>
  );
};

MainApp.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, route: router.route };
};

export default MainApp;
