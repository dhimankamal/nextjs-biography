import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: {
      [key: string]: unknown;
    }[];
  }
}

const HorizontalAd = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2446438232158113"
      data-ad-slot="4110269193"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default HorizontalAd;
