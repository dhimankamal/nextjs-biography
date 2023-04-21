import { Post } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { prisma } from "@/lib/db";
import Head from "next/head";

interface Props {
  data: Post;
}

export const config = { amp: true };

const WebStory: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data?.title + process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script
          async
          key="amp-story"
          custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        />
        <script
          async
          custom-element="amp-video"
          src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
        />
      </Head>
      <style jsx global>{`
        /* Global styles */
        amp-story {
          font-family: "Fira Code", monospace;
        }
        amp-story-grid-layer {
          padding: 0;
          margin: 0;
        }
        .title {
          background-color: rgba(0, 0, 0, 0.8);
          padding: 10px 20px;
          color: white;
          margin: 0 auto;
          width: 60%;
          border-radius: 0 10px 10px 0;
          font-size: 1rem;
          text-align: left;
          z-index: 1;
          position: absolute;
          bottom: 60px;
        }

        /* Cover page styles */
        amp-story-page#cover {
          background-color: #000;
        }

        /* Download page styles */
        amp-story-page#download {
          background-color: #000;
        }

        .visit-box{
          z-index: 1;
          background-color: rgba(255, 255, 255,0.8);
          padding: 20px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          
        }

        amp-story-page#download a {
          font-size: 1.5em;
          text-align: center;
          display: block;
          margin: 2em auto;
          padding: 1em 2em;
          background-color: #333;
          color: white;
          text-decoration: none;
          z-index: 1;
        }
        amp-img {
          position: absolute;
        }
        img {
          object-fit: cover;
          filter: brightness(0.5);
        }
        .blur img{
          filter: blur(10px);
        }
      `}</style>

      <amp-story
        standalone=""
        title={data?.title}
        publisher="GossipGeeks"
        publisher-logo-src="./logo.svg"
        poster-portrait-src={data?.imageUrl || "./logo.svg"}
        poster-square-src={data?.imageUrl || "./logo.svg"}
        poster-landscape-src={data?.imageUrl || "./logo.svg"}
      >
        {/* <!-- A story consists of one or more pages. Each page is declared by an `amp-story-page` element. Pages are designed by layering videos, images and text. Here we have a page that uses two layers. One layer filling the available space with an image and one text layer that shows a heading. --> */}
        <amp-story-page id="cover">
          <amp-story-grid-layer template="vertical">
            <amp-img
              src={data?.imageUrl || "./logo.svg"}
              layout="fill"
            ></amp-img>
            <h1 className="title">{data?.title}</h1>
          </amp-story-grid-layer>
        </amp-story-page>
        <amp-story-page id="download">
          <amp-story-grid-layer template="vertical">
            <amp-img
              src={data?.imageUrl || "./logo.svg"}
              layout="fill"
              className="blur"
            ></amp-img>

            <div className="visit-box">
              <h2>{data?.title}</h2>
              <a href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}${data?.slug}`}>
                Read now
              </a>
            </div>
          </amp-story-grid-layer>
        </amp-story-page>
      </amp-story>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Post[] = await prisma.post.findMany();
  const paths = data.map(element => `/webstory/${element.slug}`);
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data: Post | null = await prisma.post.findUnique({
    where: {
      slug: String(params?.slug),
    },
  });
  return {
    props: {
      data,
    },
    revalidate:100
  };
};

export default WebStory;
