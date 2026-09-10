import React from "react";
import { graphql } from "gatsby";
import "../styles/home.scss";
import "../styles/zaynich-journey.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import JourneyVideo from "../components/JourneyVideo";
import SafetyInformation from "../components/SafetyInformation";
import { splitJourneyContent } from "../utils/wpJsxContent";

const FALLBACK_VIDEO_SRC = "/assets/vid/R&D%20(Zaynich).mp4";

export default function ZaynichJourneyPage({ data }) {
  const page = data?.allWpPage?.edges?.[0]?.node;
  const journey = page?.theZaynichJourney;
  const video = journey?.videoLink;
  const videoSrc = video?.url || FALLBACK_VIDEO_SRC;
  const { headerHtml, contentHtml } = splitJourneyContent(journey?.relentlessDiscovery);

  return (
    <Layout title={page?.title} bodyClass="zaynich-journey-page">
      <InsideBanner
        desktop="/assets/img/Zaynivch W Banners-13.jpg"
        mobile="/assets/img/Zaynivch-M-Banners-19.jpg"
        alt="Zaynich page banner"
      />

      {(videoSrc || headerHtml || contentHtml) && (
        <section className="zaynich-approval" id="zaynichApproval" aria-label={page?.title}>
          <div className="zaynich-approval__container">
            {headerHtml && <div dangerouslySetInnerHTML={{ __html: headerHtml }} />}
            {videoSrc && <JourneyVideo key={videoSrc} src={videoSrc} title={video?.title} />}
            {contentHtml && <div dangerouslySetInnerHTML={{ __html: contentHtml }} />}
          </div>
        </section>
      )}

      <SafetyInformation />
    </Layout>
  );
}

export const query = graphql`
  query ZaynichJourneyPageQuery {
    allWpPage(filter: { databaseId: { eq: 51 } }) {
      edges {
        node {
          title
          theZaynichJourney {
            videoLink {
              title
              url
            }
            relentlessDiscovery
          }
        }
      }
    }
  }
`;
