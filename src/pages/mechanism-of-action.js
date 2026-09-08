import React from "react";
import "../styles/home.scss";
import "../styles/macanical.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import SafetyInformation from "../components/SafetyInformation";

export default function MechanismOfActionPage() {
  return (
    <Layout title="Zaynich Component Layout">
      <InsideBanner
        desktop="/assets/img/Zaynivch W-journey.jpg"
        mobile="/assets/img/ZaynivchMBanners-17.jpg"
        alt="Zaynich page banner"
      />

      <section className="img-wrapper">
        <div className="container">
          <img src="/assets/img/molecule-img.png" alt="molecule img" />
        </div>
      </section>

      <SafetyInformation />
    </Layout>
  );
}
