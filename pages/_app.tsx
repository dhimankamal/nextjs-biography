import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Head>
        <title>GossipGeeks</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="GossipGeeks, celebrity news, entertainment news, celebrity gossip"
        />
        <meta name="author" content="kamal" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.gossipgeeks.com" />
        <link rel="icon" href="/fevicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <NextNProgress color="#06b6d4"/>
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
