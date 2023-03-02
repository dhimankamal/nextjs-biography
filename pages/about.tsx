import Breadcrumb from "@/components/Breadcrumb";
import { NextPage } from "next";

interface Props {}

const About: NextPage<Props> = ({}) => {
  return (
    <div className="container mx-auto text-center space-y-4 px-2">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About Us", href: "/about" },
        ]}
      />

      <div className="lg:w-5/6 mx-auto space-y-4 text-xl opacity-70 py-10">
        <p>
          Welcome to block, a website dedicated to providing you with insightful
          and entertaining biographies of some of the worlds most talented
          artists. Our team of writers and researchers are passionate about art
          and the people who create it, and we strive to bring you the most
          up-to-date and comprehensive information on the artists that inspire
          us.
        </p>
        <p>
          At blocks, we believe that every artist has a unique story to tell. We
          aim to capture the essence of each artists life and work through
          carefully crafted biographies that are informative, engaging, and
          enjoyable to read. Whether youre a fan of classical art, contemporary
          art, or something in between, our blog has something for everyone.
        </p>
        <p>
          Our biographies cover a range of artists from different eras, genres,
          and styles. From the Renaissance masters to modern-day icons, we
          explore the lives and works of artists from all around the world. We
          also provide insights into their artistic process, inspirations, and
          the cultural and historical contexts in which they worked.
        </p>
        <p>
          Our team of writers and researchers are experts in their fields, with
          a deep understanding of the art world and its rich history. We take
          pride in our commitment to accuracy, and we ensure that all our
          biographies are rigorously researched and fact-checked.
        </p>
        <p>
          We hope that our blog will inspire you to learn more about the artists
          that you admire and introduce you to new artists and art forms that
          you may not have encountered before. We welcome your feedback and
          suggestions, and we invite you to join us on this journey of artistic
          discovery.
        </p>
        <p>
          Thank you for visiting blocks, and we hope that you enjoy exploring
          the world of art with us.
        </p>
      </div>
    </div>
  );
};

export default About;
