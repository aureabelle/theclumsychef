import Document, { Head, Main, NextScript } from "next/document";

export default class DefaultDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/public/favicon.ico"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
