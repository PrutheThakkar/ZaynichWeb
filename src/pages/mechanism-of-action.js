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
          <video controls playsInline preload="metadata">
            <source src="/assets/vid/ZAYNICH%20MOA%20US%20080926.mp4" type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </div>
      </section>

      <SafetyInformation />
    </Layout>
  );
}
