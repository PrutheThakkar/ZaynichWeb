import React from "react";
import { graphql } from "gatsby";
import "../styles/home.scss";
import "../styles/what-is-amr.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import CountUp from "../components/CountUp";
import AmrRiskMetric from "../components/AmrRiskMetric";
import SafetyInformation from "../components/SafetyInformation";

/** Wraps every standalone "AMR" occurrence in a <span> so it keeps its accent styling. */
function highlightAmr(text) {
  if (!text) return text;
  return String(text)
    .split(/(AMR)/g)
    .map((part, i) => (part === "AMR" ? <span key={i}>AMR</span> : part));
}

/** ACF only stores the formatted stat as one string (e.g. "4.95M", "35,000+"); split it
 * back into the numeric/suffix pieces CountUp needs to animate. */
function parseStatValue(raw) {
  const str = String(raw ?? "").trim();
  const match = str.match(/^([\d,.]+)\s*(.*)$/);
  if (!match) {
    return { count: 0, decimals: 0, suffix: str, separator: false };
  }
  const [, numberPart, suffix] = match;
  const cleanNumber = numberPart.replace(/,/g, "");
  const decimals = cleanNumber.includes(".") ? cleanNumber.split(".")[1].length : 0;
  return {
    count: parseFloat(cleanNumber) || 0,
    decimals,
    suffix: suffix || "",
    separator: numberPart.includes(","),
  };
}

export default function WhatIsAmrPage({ data }) {
  const page = data?.allWpPage?.edges?.[0]?.node;
  const amr = page?.whatIsAmr;
  const stats = amr?.number ?? [];
  const riskMetrics = amr?.appropriateNumber ?? [];

  return (
    <Layout title="Zaynich Component Layout">
      <InsideBanner
        desktop="/assets/img/Zaynivch W-pdf.jpg"
        mobile="/assets/img/Zaynivch-M-Banners-18.jpg"
        alt="Zaynich page banner"
      />

      <section className="amr-overview" id="amrOverview" aria-labelledby="amrOverviewTitle">
        <div className="amr-overview__container">
          <div className="amr-overview__heading">
            <h2 className="section-title" id="amrOverviewTitle">
              {highlightAmr(amr?.title)}
            </h2>
          </div>

          <div className="amr-overview__intro">
            <p className="amr-overview__description">{amr?.paragraph}</p>

            <div className="amr-overview__who">
              <span aria-hidden="true"></span>
              <p>WHO ranks AMR among the top 10 global public health threats facing humanity.</p>
              <span aria-hidden="true"></span>
            </div>
          </div>

          <div className="amr-stats">
            <div className="amr-stats__group">
              <div className="amr-stats__group-heading">
                <span className="amr-stats__line amr-stats__line--left" aria-hidden="true"></span>
                <div className="title-wrapper">
                  <h3>Globally</h3>
                </div>
                <span className="amr-stats__line amr-stats__line--right" aria-hidden="true"></span>
              </div>

              <div className="amr-stats__cards">
                {stats.slice(0, 2).map((stat, i) => {
                  const value = parseStatValue(stat?.numberField);
                  return (
                    <article className="amr-stat-card" key={i}>
                      <CountUp
                        className="amr-stat-card__number"
                        count={value.count}
                        decimals={value.decimals}
                        suffix={value.suffix}
                        separator={value.separator}
                      />
                      <span className="amr-stat-card__divider" aria-hidden="true"></span>
                      <p className="amr-stat-card__text">{stat?.numberBottomText}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="amr-stats__group">
              <div className="amr-stats__group-heading">
                <span className="amr-stats__line amr-stats__line--left" aria-hidden="true"></span>
                <div className="title-wrapper">
                  <h3>United States</h3>
                </div>
                <span className="amr-stats__line amr-stats__line--right" aria-hidden="true"></span>
              </div>

              <div className="amr-stats__cards">
                {stats.slice(2, 4).map((stat, i) => {
                  const value = parseStatValue(stat?.numberField);
                  return (
                    <article className="amr-stat-card" key={i}>
                      <CountUp
                        className={`amr-stat-card__number${value.separator ? " amr-stat-card__number--small" : ""}`}
                        count={value.count}
                        decimals={value.decimals}
                        suffix={value.suffix}
                        separator={value.separator}
                      />
                      <span className="amr-stat-card__divider" aria-hidden="true"></span>
                      <p className="amr-stat-card__text">{stat?.numberBottomText}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="amr-future" id="amrFuture" aria-labelledby="amrFutureTitle">
        <div className="amr-future__container">
          <div className="amr-future__content">
            <h2 className="section-title section-title--left" id="amrFutureTitle">
              {highlightAmr(amr?.whatHappenTitle)}
            </h2>

            <p className="amr-future__description">{amr?.whatHappenParagraph}</p>

            <span className="amr-future__accent-line" aria-hidden="true"></span>
          </div>

          <div className="amr-future__projection-card">
            <div className="amr-future__card-heading">
              <span aria-hidden="true"></span>
              <h3>By 2050, Globally</h3>
              <span aria-hidden="true"></span>
            </div>

            <div className="amr-future__stats">
              <article className="amr-future-stat">
                <CountUp className="amr-future-stat__number" count={10} decimals={0} suffix="M" />
                <p className="bold amr-future-stat__description">
                  deaths projected per year from AMR if left unaddressed, surpassing today’s annual toll from
                  cancer.
                </p>
              </article>

              <article className="amr-future-stat">
                <CountUp className="amr-future-stat__number" count={39} decimals={0} suffix="M" />
                <p className="bold amr-future-stat__description">
                  estimated lives lost worldwide 2025–2050 under current resistance trends
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="amr-risk" id="amrRisk" aria-labelledby="amrRiskTitle">
        <div className="amr-risk__container">
          <div className="amr-risk__top">
            <div className="amr-risk__metrics">
              <h3 className="amr-risk__eyebrow">{amr?.whenAppropriateTitle}</h3>

              <div className="amr-risk__metric-grid">
                {riskMetrics.map((metric, i) => {
                  const progress = parseFloat(metric?.number) || 0;
                  return (
                    <AmrRiskMetric
                      key={i}
                      progress={progress}
                      value={`~${progress}%`}
                      text={metric?.text}
                      delay={i * 180}
                    />
                  );
                })}
              </div>

              <p className="amr-risk__source">
                A separate meta-analysis of 39 studies found inappropriate empiric therapy nearly tripled the
                adjusted odds of mortality in Gram-negative infections (OR 3.30).
              </p>
            </div>

            <div className="amr-risk__content">
              <h2 className="section-title section-title--left" id="amrRiskTitle">
                <strong>AMR</strong> Risk and <span>Hospitalization</span>
              </h2>

              <p className="bold amr-risk__description">
                Resistant infections behave differently in hospitalized patients: they are harder to identify
                quickly, harder to treat effectively, and far riskier when treatment is delayed or wrong.
              </p>

              <span className="amr-risk__content-line" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </section>

      <div className="amr-risk__callout">
        <h3>The window to act is narrowing</h3>
        <p className="bold">
          From 2.8 million U.S. infections a year to a projected 10 million global deaths annually by 2050, the
          data points to one conclusion: earlier, more effective treatment for drug-resistant infections saves
          lives and lowers the cost of care.
        </p>
      </div>

      <SafetyInformation />
    </Layout>
  );
}

export const query = graphql`
  query WhatIsAmrPageQuery {
    allWpPage(filter: { databaseId: { eq: 47 } }) {
      edges {
        node {
          whatIsAmr {
            title
            paragraph
            number {
              numberField
              numberBottomText
            }
            whatHappenTitle
            whatHappenParagraph
            whenAppropriateTitle
            appropriateNumber {
              number
              text
            }
          }
        }
      }
    }
  }
`;
