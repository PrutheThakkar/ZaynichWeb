import React from "react";
import "../styles/home.scss";

import Layout from "../components/Layout";
import InsideBanner from "../components/InsideBanner";
import SafetyInformation from "../components/SafetyInformation";

/**
 * Ported from risks-&-hospitalisation.html. In the original site this page
 * wasn't linked from navigation (the "Risks & Hospitalisation" menu item
 * points at what-is-amr.html#amrRisk instead) and only carried the generic
 * inside-banner + safety block. Kept here for parity — renamed because "&"
 * isn't a safe URL/file character.
 */
export default function RisksAndHospitalisationPage() {
  return (
    <Layout title="Zaynich Component Layout">
      <InsideBanner
        desktop="/assets/img/Zaynivch-W-Banner-1.jpg"
        alt="Zaynich page banner"
      />

      <SafetyInformation />
    </Layout>
  );
}
