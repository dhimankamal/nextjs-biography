import Breadcrumb from "@/components/Breadcrumb";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

interface Props {}

const Disclaimer: NextPage<Props> = ({}) => {
  return (
    <>
      <NextSeo
        title={`Read Our Website's Legal Disclaimer | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        description={`Read our website's legal disclaimer before using any information or services provided on ${process.env.NEXT_PUBLIC_SITE_NAME}. Our disclaimer outlines the terms and conditions of using our website and its content. By accessing and using our website, you agree to our disclaimer.`}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN_URL}disclaimer`}
      />
      <div className="container mx-auto text-center space-y-4 px-2">
        <Breadcrumb
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Disclaimer", href: "/disclaimer" },
          ]}
        />

        <div className="lg:w-5/6 mx-auto space-y-4 text-xl opacity-70 py-10">
          <p>
            The information contained on this website
            ({process.env.NEXT_PUBLIC_DOMAIN_URL}) is for general information purposes
            only. The information is provided by {process.env.NEXT_PUBLIC_SITE_NAME} and while we
            endeavour to keep the information up to date and correct, we make no
            representations or warranties of any kind, express or implied, about
            the completeness, accuracy, reliability, suitability or availability
            with respect to the website or the information, products, services,
            or related graphics contained on the website for any purpose. Any
            reliance you place on such information is therefore strictly at your
            own risk.
          </p>
          <p>
            In no event will we be liable for any loss or damage including
            without limitation, indirect or consequential loss or damage, or any
            loss or damage whatsoever arising from loss of data or profits
            arising out of, or in connection with, the use of this website.
          </p>
          <p>
            Through this website you are able to link to other websites which
            are not under the control of {process.env.NEXT_PUBLIC_SITE_NAME}. We have no control over
            the nature, content and availability of those sites. The inclusion
            of any links does not necessarily imply a recommendation or endorse
            the views expressed within them.
          </p>
          <p>
            Every effort is made to keep the website up and running smoothly.
            However, {process.env.NEXT_PUBLIC_SITE_NAME} takes no responsibility for, and will not be
            liable for, the website being temporarily unavailable due to
            technical issues beyond our control.
          </p>
          <p>
            All content published on {process.env.NEXT_PUBLIC_SITE_NAME} is for informational and
            entertainment purposes only. The website does not claim ownership of
            any images used unless otherwise noted. If you believe that any
            content appearing on {process.env.NEXT_PUBLIC_SITE_NAME} infringes on your copyright, please
            let us know by contacting us.
          </p>
          <p>
            Finally, {process.env.NEXT_PUBLIC_SITE_NAME} reserves the right to modify, suspend, or
            discontinue any aspect of the website at any time without prior
            notice.
          </p>
          <p>Thank you for visiting {process.env.NEXT_PUBLIC_SITE_NAME}.</p>
        </div>
      </div>
    </>
  );
};

export default Disclaimer;
