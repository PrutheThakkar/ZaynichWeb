import React from "react";
import { graphql } from "gatsby";
import "../styles/home.scss";
import "../styles/board.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import SafetyInformation from "../components/SafetyInformation";
import { wpJsxContentToHtml } from "../utils/wpJsxContent";

export default function BroadSpectrumPage({ data }) {
  const spectrum = data?.allWpPage?.edges?.[0]?.node?.broadSpectrum;
  const titleHtml = wpJsxContentToHtml(spectrum?.broadSpectrumTitle);
  const tableHtml = wpJsxContentToHtml(spectrum?.tableSection);

  return (
    <Layout title="Zaynich Component Layout">
      <InsideBanner
        desktop="/assets/img/Zaynivch W Banners-14.jpg"
        mobile="/assets/img/ZaynivchMBanners-20.jpg"
        alt="Zaynich page banner"
      />

      <section className="spectrum-table-section" id="spectrumComparison" aria-labelledby="spectrumComparisonTitle">
        <div className="spectrum-table-section__container">
          {titleHtml && <div dangerouslySetInnerHTML={{ __html: titleHtml }} />}

          {tableHtml && <div className="spectrum-table-scroll" dangerouslySetInnerHTML={{ __html: tableHtml }} />}

          <p className="spectrum-table-section__rotate-hint">Rotate your screen for the best table view.</p>
        </div>
      </section>

      <SafetyInformation />
    </Layout>
  );
}

export const query = graphql`
  query BroadSpectrumPageQuery {
    allWpPage(filter: { databaseId: { eq: 60 } }) {
      edges {
        node {
          broadSpectrum {
            broadSpectrumTitle
            tableSection
          }
        }
      }
    }
  }
`;
