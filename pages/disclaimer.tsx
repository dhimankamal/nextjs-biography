import Breadcrumb from "@/components/Breadcrumb";
import { NextPage } from "next";

interface Props {}

const Disclaimer: NextPage<Props> = ({}) => {
  return (
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
          (https://www.gossipgeeks.net/) is for general information purposes
          only. The information is provided by GossipGeeks and while we
          endeavour to keep the information up to date and correct, we make no
          representations or warranties of any kind, express or implied, about
          the completeness, accuracy, reliability, suitability or availability
          with respect to the website or the information, products, services, or
          related graphics contained on the website for any purpose. Any
          reliance you place on such information is therefore strictly at your
          own risk.
        </p>
        <p>
          In no event will we be liable for any loss or damage including without
          limitation, indirect or consequential loss or damage, or any loss or
          damage whatsoever arising from loss of data or profits arising out of,
          or in connection with, the use of this website.
        </p>
        <p>
          Through this website you are able to link to other websites which are
          not under the control of GossipGeeks. We have no control over the
          nature, content and availability of those sites. The inclusion of any
          links does not necessarily imply a recommendation or endorse the views
          expressed within them.
        </p>
        <p>
          Every effort is made to keep the website up and running smoothly.
          However, GossipGeeks takes no responsibility for, and will not be
          liable for, the website being temporarily unavailable due to technical
          issues beyond our control.
        </p>
        <p>
          All content published on GossipGeeks is for informational and
          entertainment purposes only. The website does not claim ownership of
          any images used unless otherwise noted. If you believe that any
          content appearing on GossipGeeks infringes on your copyright, please
          let us know by contacting us.
        </p>
        <p>
          Finally, GossipGeeks reserves the right to modify, suspend, or
          discontinue any aspect of the website at any time without prior
          notice.
        </p>
        <p>Thank you for visiting GossipGeeks.</p>
      </div>
    </div>
  );
};

export default Disclaimer;
