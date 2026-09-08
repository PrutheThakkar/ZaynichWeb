import React from "react";
import "../styles/home.scss";
import "../styles/zaynich-journey.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import SafetyInformation from "../components/SafetyInformation";

export default function DosagePage() {
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
              Dosage
            </h2>

            <p className="bold">
              Recommended dosage is ZAYNICH 3 grams (2 grams cefepime and 1 gram zidebactam) every 8 hours by
              intravenous infusion over 1 hour for 7 to 10 days in adult patients with an estimated glomerular
              filtration rate (eGFR) greater than or equal to 60 mL/min.
            </p>

            <p className="bold">
              Dosage adjustment is recommended in adult patients with renal impairment who have an eGFR less
              than 60 mL/min.
            </p>

            <p className="bold">
              Administer each intravenous infusion over 1 hour for patients with renal impairment.
            </p>

            <span className="zaynich-dosage__accent" aria-hidden="true"></span>
          </div>

          <div className="zaynich-dosage__table-block">
            <h3>
              Recommended Dosage of
              <span> ZAYNICH in Adult Patients with Renal Impairment (2.2)</span>
            </h3>

            <div className="zaynich-dosage__table-wrap">
              <table className="zaynich-dosage__table">
                <thead>
                  <tr>
                    <th scope="col">
                      eGFR<sup>a</sup> (mL/min)
                    </th>
                    <th scope="col">
                      Dose<sup>b</sup>
                    </th>
                    <th scope="col">Dosing Interval</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>60 to 89</td>
                    <td>
                      ZAYNICH 3 grams<sup>c</sup>
                    </td>
                    <td>Every 8 hours</td>
                  </tr>

                  <tr>
                    <td>30 to 59</td>
                    <td>
                      ZAYNICH 1.5 grams<sup>c</sup>
                    </td>
                    <td>Every 8 hours</td>
                  </tr>

                  <tr>
                    <td>15 to 29</td>
                    <td>
                      ZAYNICH 1.5 grams<sup>c</sup>
                    </td>
                    <td>Every 12 hours</td>
                  </tr>

                  <tr>
                    <td>
                      8 to 14, with or without intermittent hemodialysis (IHD)<sup>e</sup>
                    </td>
                    <td>
                      ZAYNICH 1.5 grams<sup>d</sup>
                    </td>
                    <td>Every 24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>

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
