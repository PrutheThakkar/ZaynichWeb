import React from "react";
import "../styles/home.scss";
import "../styles/board.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import SafetyInformation from "../components/SafetyInformation";

const CrossIcon = () => (
  <span className="coverage-mark coverage-mark--no">
    <img src="/assets/img/cross-icon.svg" alt="cross-icon" />
  </span>
);
const YesMark = () => <span className="coverage-mark coverage-mark--yes">✓</span>;
const VariableMark = () => <span className="coverage-mark coverage-mark--variable">±</span>;
const FeaturedYes = () => (
  <td className="spectrum-table__featured-cell">
    <YesMark />
  </td>
);

export default function BroadSpectrumPage() {
  return (
    <Layout title="Zaynich Component Layout">
      <InsideBanner
        desktop="/assets/img/Zaynivch W Banners-14.jpg"
        mobile="/assets/img/ZaynivchMBanners-20.jpg"
        alt="Zaynich page banner"
      />

      <section className="spectrum-table-section" id="spectrumComparison" aria-labelledby="spectrumComparisonTitle">
        <div className="spectrum-table-section__container">
          <h1 className="spectrum-table-section__title" id="spectrumComparisonTitle">
            Broadest spectrum of ZAYNICH<sup>®</sup> established
            <span>through independently published studies</span>
          </h1>

          <div className="spectrum-table-scroll">
             <div className="spectrum-legend" aria-label="Coverage legend">
            <div className="spectrum-legend__item">
              <YesMark />
              <span>&gt;90% coverage</span>
            </div>
            <div className="spectrum-legend__item">
              <CrossIcon />
              <span>&lt;30% coverage</span>
            </div>
            <div className="spectrum-legend__item">
              <VariableMark />
              <span>Variable coverage</span>
            </div>
          </div>

            <table className="spectrum-table">
              <thead>
                <tr>
                  <th className="spectrum-table__organism">Organism</th>
                  <th className="spectrum-table__mechanism">Resistance mechanism</th>
                  <th className="spectrum-table__drug spectrum-table__drug--featured">
                    <span className="drug-name">Zaynich®</span>
                    <small>Zidebactam (1 g) + Cefepime (2 g)</small>
                  </th>
                  <th className="spectrum-table__drug">Cefiderocol</th>
                  <th className="spectrum-table__drug">
                    Ceftazidime/<span>avibactam</span>
                  </th>
                  <th className="spectrum-table__drug">
                    Meropenem/<span>vaborbactam</span>
                  </th>
                  <th className="spectrum-table__drug">
                    Aztreonam/<span>avibactam</span>
                  </th>
                  <th className="spectrum-table__drug">
                    Cefepime/<span>taniborbactam</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope="row">
                    <em>Acinetobacter baumannii</em>
                  </th>
                  <td className="row2-class">OXA-carbapenemases</td>
                  <FeaturedYes />
                  <td>
                    <VariableMark />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <em>Pseudomonas aeruginosa</em>
                  </th>
                  <td className="row2-class">NDM + efflux + porin loss</td>
                  <FeaturedYes />
                  <td>
                    <VariableMark />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <em>Stenotrophomonas maltophilia</em>
                  </th>
                  <td className="row2-class">MBLs</td>
                  <FeaturedYes />
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <VariableMark />
                  </td>
                </tr>

                <tr>
                  <th rowSpan={2} scope="rowgroup">
                    <em>Escherichia coli</em>
                  </th>
                  <td className="row2-class">NDM + PBP3 insert</td>
                  <FeaturedYes />
                  <td>
                    <VariableMark />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <VariableMark />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                </tr>

                <tr>
                  <td className="row2-class">OXA-48-like</td>
                  <FeaturedYes />
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                </tr>

                <tr>
                  <th rowSpan={4} scope="rowgroup">
                    <em>Klebsiella pneumoniae</em>
                  </th>
                  <td className="row2-class">KPC</td>
                  <FeaturedYes />
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                </tr>

                <tr>
                  <td className="row2-class">NDM</td>
                  <FeaturedYes />
                  <td>
                    <VariableMark />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <VariableMark />
                  </td>
                </tr>

                <tr>
                  <td className="row2-class">OXA-48-like</td>
                  <FeaturedYes />
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                </tr>

                <tr>
                  <td className="row2-class">NDM + OXA-48-like</td>
                  <FeaturedYes />
                  <td>
                    <VariableMark />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <CrossIcon />
                  </td>
                  <td>
                    <YesMark />
                  </td>
                  <td>
                    <VariableMark />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="spectrum-table-section__rotate-hint">Rotate your screen for the best table view.</p>

         
        </div>
      </section>

      <SafetyInformation />
    </Layout>
  );
}
