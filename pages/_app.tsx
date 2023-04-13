import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { DefaultSeo } from "next-seo";
import Script from "next/script";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2446438232158113"
      />
      <GoogleAnalytics trackPageViews />
      <DefaultSeo
        title="GossipGeeks - Your Ultimate Source for Celebrity News and Information"
        description="GossipGeeks is your ultimate source for the latest news and information about your favorite celebrities. Get the latest breaking news, exclusive stories, and behind-the-scenes features about your favorite stars."
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://www.gossipgeeks.net/",
          siteName: "Gossipgeeks",
        }}
        // twitter={{
        //   handle: "@handle",
        //   site: "@",
        //   cardType: "summary_large_image",
        // }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="GossipGeeks, celebrity news, entertainment news, celebrity gossip"
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/fevicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {router.pathname === "/webstory/[webstory]" ? (
        <Component {...pageProps} />
      ) : (
        <div className="min-h-screen flex flex-col">
          <NextNProgress color="#06b6d4" />
          <Navbar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
