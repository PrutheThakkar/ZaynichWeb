import React from "react";
import "../styles/home.scss";
import "../styles/what-is-amr.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import CountUp from "../components/CountUp";
import AmrRiskMetric from "../components/AmrRiskMetric";
import SafetyInformation from "../components/SafetyInformation";

export default function WhatIsAmrPage() {
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
              What Is <span>AMR</span> and How Widespread Is It?
            </h2>
          </div>

          <div className="amr-overview__intro">
            <p className="amr-overview__description">
              Antimicrobial resistance (AMR) occurs when bacteria, viruses, fungi, and parasites evolve and no
              longer respond to the medicines designed to kill them — turning once-treatable infections into
              serious, sometimes untreatable, threats.
            </p>

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
                <article className="amr-stat-card">
                  <CountUp className="amr-stat-card__number" count={4.95} decimals={2} suffix="M" />
                  <span className="amr-stat-card__divider" aria-hidden="true"></span>
                  <p className="amr-stat-card__text">deaths globally (2019) associated with bacterial AMR</p>
                </article>

                <article className="amr-stat-card">
                  <CountUp className="amr-stat-card__number" count={1.27} decimals={2} suffix="M" />
                  <span className="amr-stat-card__divider" aria-hidden="true"></span>
                  <p className="amr-stat-card__text">
                    deaths directly attributable to resistant infections (2019)
                  </p>
                </article>
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
                <article className="amr-stat-card">
                  <CountUp className="amr-stat-card__number" count={2.8} decimals={1} suffix="M+" />
                  <span className="amr-stat-card__divider" aria-hidden="true"></span>
                  <p className="amr-stat-card__text">resistant infections occur every year in the U.S.</p>
                </article>

                <article className="amr-stat-card">
                  <CountUp
                    className="amr-stat-card__number amr-stat-card__number--small"
                    count={35000}
                    decimals={0}
                    suffix="+"
                    separator
                  />
                  <span className="amr-stat-card__divider" aria-hidden="true"></span>
                  <p className="amr-stat-card__text">deaths each year as a direct result</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="amr-future" id="amrFuture" aria-labelledby="amrFutureTitle">
        <div className="amr-future__container">
          <div className="amr-future__content">
            <h2 className="section-title section-title--left" id="amrFutureTitle">
              What Happens If
              <span>AMR </span>Goes Untreated
            </h2>

            <p className="amr-future__description">
              Without new treatments and stronger stewardship, projections point to a steep and accelerating
              human toll.
            </p>

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
              <h3 className="amr-risk__eyebrow">When Appropriate Therapy Is Delayed</h3>

              <div className="amr-risk__metric-grid">
                <AmrRiskMetric
                  progress={20}
                  value="~20%"
                  text="higher risk of in-hospital mortality or discharge to hospice"
                  delay={0}
                />
                <AmrRiskMetric
                  progress={70}
                  value="~70%"
                  text="increase in length of hospital stay"
                  delay={180}
                />
                <AmrRiskMetric
                  progress={65}
                  value="~65%"
                  text="increase in total in-hospital treatment costs"
                  delay={360}
                />
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
