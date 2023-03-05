import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GossipGeeks</title>
        <meta
          name="description"
          content="GossipGeeks is your ultimate source for the latest news and information about your favorite celebrities. Get the latest breaking news, exclusive stories, and behind-the-scenes features about your favorite stars."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="GossipGeeks, celebrity news, entertainment news, celebrity gossip"
        />
        <meta name="author" content="kamal" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.gossipgeeks.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
