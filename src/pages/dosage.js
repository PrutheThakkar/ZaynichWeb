import React from "react";
import { graphql } from "gatsby";
import "../styles/home.scss";
import "../styles/zaynich-journey.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import SafetyInformation from "../components/SafetyInformation";
import { wpJsxContentToHtml } from "../utils/wpJsxContent";

export default function DosagePage({ data }) {
  const page = data?.allWpPage?.edges?.[0]?.node;
  const dosage = page?.dosage;
  const paragraphs = (dosage?.dosagePara || "")
    .split(/\r?\n\r?\n/)
    .map((para) => para.trim())
    .filter(Boolean);
  const tableHtml = wpJsxContentToHtml(dosage?.dosageTable);

  return (
    <Layout title="Zaynich Component Layout">
      <InsideBanner
        desktop="/assets/img/Zaynivch W Banners-15.jpg"
        mobile="/assets/img/ZaynivchmBanners-21.jpg"
        alt="Zaynich page banner"
      />

      <section className="zaynich-dosage" id="zaynichDosage" aria-labelledby="zaynichDosageTitle">
        <div className="zaynich-dosage__container">
          <div className="zaynich-dosage__intro">
            <h2 className="section-title section-title--left" id="zaynichDosageTitle">
              {dosage?.dosageTitle || "Dosage"}
            </h2>

            {paragraphs.map((para, i) => (
              <p className="bold" key={i} dangerouslySetInnerHTML={{ __html: wpJsxContentToHtml(para) }} />
            ))}

            <span className="zaynich-dosage__accent" aria-hidden="true"></span>
          </div>

          <div className="zaynich-dosage__table-block">
            <h3>
              Recommended Dosage of
              <span> ZAYNICH<sup>TM</sup> in Adult Patients with Renal Impairment (2.2)</span>
            </h3>

            {tableHtml && <div className="zaynich-dosage__table-wrap" dangerouslySetInnerHTML={{ __html: tableHtml }} />}

            <p className="zaynich-dosage__footnote">
              <sup>a</sup>
              As calculated using the 4-variable Modification of Diet in Renal Disease equation.
            </p>
          </div>
        </div>
      </section>

      <SafetyInformation />
    </Layout>
  );
}

export const query = graphql`
  query DosagePageQuery {
    allWpPage(filter: { databaseId: { eq: 64 } }) {
      edges {
        node {
          dosage {
            dosageTitle
            dosagePara
            dosageTable
          }
        }
      }
    }
  }
`;
