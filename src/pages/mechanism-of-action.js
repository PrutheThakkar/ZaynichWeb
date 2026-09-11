import React from "react";
import { graphql } from "gatsby";
import "../styles/home.scss";
import "../styles/macanical.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import AutoplayVideo from "../components/AutoplayVideo";
import SafetyInformation from "../components/SafetyInformation";

const FALLBACK_VIDEO_SRC = "/assets/vid/ZAYNICH%20MOA%20US%20080926.mp4";

export default function MechanismOfActionPage({ data }) {
  const page = data?.allWpPage?.edges?.[0]?.node;
  const video = page?.mechanismOfActions?.machanismVideo?.node;
  const videoSrc = video?.sourceUrl || FALLBACK_VIDEO_SRC;

  const bannerMob = page?.insidePages?.bannerImagesMob?.node;

  return (
    <Layout title="Zaynich Component Layout">
      <InsideBanner
        desktop="/assets/img/Zaynivch W-journey.jpg"
        mobile="/assets/img/ZaynivchMBanners-17.jpg"
        mobileImage={bannerMob?.gatsbyImage}
        alt={bannerMob?.altText || "Zaynich page banner"}
      />

      <section className="img-wrapper">
        <div className="container">
          <h1 className="img-wrapper__title">
            Watch the Dual Mechanism of ZAYNICH<sup>TM</sup>
          </h1>

          <AutoplayVideo
            key={videoSrc}
            src={videoSrc}
            ariaLabel={video?.altText || video?.title || "ZAYNICH mechanism of action video"}
          />
        </div>
      </section>

      <SafetyInformation />
    </Layout>
  );
}

export const query = graphql`
  query MechanismOfActionPageQuery {
    allWpPage(filter: { databaseId: { eq: 62 } }) {
      edges {
        node {
          mechanismOfActions {
            machanismVideo {
              node {
                altText
                slug
                uri
                title
                sourceUrl
              }
            }
          }
          insidePages {
            bannerImagesMob {
              node {
                altText
                gatsbyImage(
                  height: 900
                  width: 768
                  quality: 90
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  }
`;
