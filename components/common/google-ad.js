import { useEffect, Fragment } from "react";

const GoogleAd = ({ slot }) => {
  useEffect(() => {
    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({
        google_ad_client: "ca-pub-4041154744236119",
        enable_page_level_ads: true,
      });
    }
  }, []);

  return (
    <Fragment>
      <ins
        className="adsbygoogle"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Fragment>
  );
};

export default GoogleAd;
