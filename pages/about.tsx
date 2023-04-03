import Breadcrumb from "@/components/Breadcrumb";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

interface Props {}

const About: NextPage<Props> = ({}) => {
  return (
    <>
      <NextSeo
        title={`About Us - Discover Our Story and Mission | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        description={`Discover the story and mission behind ${process.env.NEXT_PUBLIC_SITE_NAME}, your ultimate source for the latest celebrity news and exclusive features. Learn more about our team and how we bring you the latest breaking news, behind-the-scenes stories, and exclusive content about your favorite stars. Join our community and stay up-to-date with the latest in entertainment news.`}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN_URL}about`}
      />

      <div className="container mx-auto text-center space-y-4 px-2">
        <Breadcrumb
          crumbs={[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about" },
          ]}
        />

        <div className="lg:w-5/6 mx-auto space-y-4 text-xl opacity-70 py-10">
          <p>
            Welcome to {process.env.NEXT_PUBLIC_SITE_NAME}, your ultimate source for the latest news and
            information about your favorite celebrities!
          </p>
          <p>
            At {process.env.NEXT_PUBLIC_SITE_NAME}, we are passionate about all things
            celebrity-related. We strive to provide our readers with the most
            up-to-date and accurate information on their favorite stars,
            including their latest projects, personal lives, and everything in
            between.
          </p>
          <p>
            Our team of expert writers and editors are dedicated to bringing you
            the latest breaking news and exclusive stories from the world of
            entertainment. We take pride in our commitment to journalistic
            integrity, ensuring that all of our articles are thoroughly
            researched and fact-checked before they are published.
          </p>
          <p>
            Whether youre a die-hard fan of a particular celebrity, or simply
            love keeping up with the latest gossip and trends in the
            entertainment industry, {process.env.NEXT_PUBLIC_SITE_NAME} has everything you need. From
            in-depth interviews and behind-the-scenes features to red carpet
            coverage and juicy rumors, we have got you covered.
          </p>
          <p>
            So why choose {process.env.NEXT_PUBLIC_SITE_NAME}? With our unparalleled coverage and expert
            analysis, we are the go-to destination for all your celebrity news
            and information needs. We are passionate about what we do, and we
            are committed to providing our readers with the best possible
            content and user experience.
          </p>
          <p>
            Thank you for choosing {process.env.NEXT_PUBLIC_SITE_NAME} as your source for all things
            celebrity. We look forward to bringing you the latest and greatest
            in entertainment news!
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
