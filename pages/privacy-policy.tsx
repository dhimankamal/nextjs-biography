import Breadcrumb from "@/components/Breadcrumb";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

interface Props {}

const PrivacyPolicy: NextPage<Props> = ({}) => {
  return (
    <>
      <NextSeo
        title={`Privacy Policy - Learn How We Protect Your Personal Data | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        description={`At ${process.env.NEXT_PUBLIC_SITE_NAME}, we take your privacy seriously. Our Privacy Policy outlines how we collect, use, and protect your personal information when you use our website. We are committed to safeguarding your data and ensuring its confidentiality. Learn more about our privacy practices and your rights by reading our Privacy Policy.`}
        canonical={`${process.env.NEXT_PUBLIC_DOMAIN_URL}privacy-policy`}
      />
      <div className="container mx-auto text-center space-y-4 px-2">
        <Breadcrumb
          crumbs={[
            { name: "Home", href: "/" },
            { name: `Privacy Policy for ${process.env.NEXT_PUBLIC_SITE_NAME} test`, href: "/privacy-policy" },
          ]}
        />

        <div className="lg:w-5/6 mx-auto space-y-4 text-xl opacity-70 py-10">
          <p>
            At {process.env.NEXT_PUBLIC_SITE_NAME}, the privacy of our visitors is of extreme importance
            to us. This privacy policy document outlines the types of personal
            information that is received and collected by {process.env.NEXT_PUBLIC_SITE_NAME} and how it
            is used.
          </p>
          <h2 className="text-2xl font-semibold">Log Files</h2>
          <p>
            Like many other websites, {process.env.NEXT_PUBLIC_SITE_NAME} makes use of log files. The
            information inside the log files includes internet protocol (IP)
            addresses, type of browser, Internet Service Provider (ISP),
            date/time stamp, referring/exit pages, and number of clicks to
            analyze trends, administer the site, track users movement around the
            site, and gather demographic information. IP addresses and other
            such information are not linked to any information that is
            personally identifiable.
          </p>
          <h2 className="text-2xl font-semibold">Cookies and Web Beacons</h2>
          <p>
            {process.env.NEXT_PUBLIC_SITE_NAME} uses cookies to store information about visitors
            preferences, to record user-specific information on which pages the
            site visitor accesses or visits, and to personalize or customize our
            web page content based upon visitors browser type or other
            information that the visitor sends via their browser.
          </p>
          <h2 className="text-2xl font-semibold">DoubleClick DART Cookie</h2>
          <p>
            Google, as a third party vendor, uses cookies to serve ads on
            {process.env.NEXT_PUBLIC_SITE_NAME}. Googles use of the DART cookie enables it to serve ads
            to our sites visitors based upon their visit to {process.env.NEXT_PUBLIC_SITE_NAME} and
            other sites on the Internet. Users may opt out of the use of the
            DART cookie by visiting the Google ad and content network privacy
            policy at the following URL -
            <a className="break-all" href="http://www.google.com/privacy_ads.html">
              http://www.google.com/privacy_ads.html
            </a>
            .
          </p>
          <p>
            Some of our advertising partners may use cookies and web beacons on
            our site. Our advertising partners include:
          </p>
          <h2 className="text-2xl font-semibold">Google AdSense</h2>
          <p>
            These third-party ad servers or ad networks use technology to the
            advertisements and links that appear on {process.env.NEXT_PUBLIC_SITE_NAME} send directly to
            your browsers. They automatically receive your IP address when this
            occurs. Other technologies (such as cookies, JavaScript, or Web
            Beacons) may also be used by the third-party ad networks to measure
            the effectiveness of their advertisements and/or to personalize the
            advertising content that you see.
          </p>
          <p>
            {process.env.NEXT_PUBLIC_SITE_NAME} has no access to or control over these cookies that are
            used by third-party advertisers.
          </p>
          <p>
            You should consult the respective privacy policies of these
            third-party ad servers for more detailed information on their
            practices as well as for instructions about how to opt-out of
            certain practices. {process.env.NEXT_PUBLIC_SITE_NAME} privacy policy does not apply to, and
            we cannot control the activities of, such other advertisers or web
            sites.
          </p>
          <p>
            If you wish to disable cookies, you may do so through your
            individual browser options. More detailed information about cookie
            management with specific web browsers can be found at the browsers
            respective websites.
          </p>
          <p>
            If you require any more information or have any questions about our
            privacy policy, please feel free to contact us by email at
            {process.env.NEXT_PUBLIC_EMAIL}.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
