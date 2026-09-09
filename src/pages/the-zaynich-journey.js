import React from "react";
import "../styles/home.scss";
import "../styles/zaynich-journey.scss";

import Layout from "../components/Layout";
import JourneyBannerSwiper from "../components/JourneyBannerSwiper";
import JourneyVideo from "../components/JourneyVideo";
import SafetyInformation from "../components/SafetyInformation";

export default function ZaynichJourneyPage() {
  return (
    <Layout title="Zaynich Component Layout" bodyClass="zaynich-journey-page">
      <JourneyBannerSwiper />

      <section className="zaynich-approval" id="zaynichApproval" aria-labelledby="zaynichApprovalTitle">
        <div className="zaynich-approval__container">
          <header className="zaynich-approval__header">
            <h1 className="zaynich-approval__title" id="zaynichApprovalTitle">
              Relentless Discovery and Development Efforts Culminate in US FDA Approval of ZAYNICH<sup>®</sup>
            </h1>

            <p className="zaynich-approval__subtitle">A Watershed Moment for India’s Pharmaceutical Innovation</p>

            <span className="zaynich-approval__accent" aria-hidden="true"></span>
          </header>

          <JourneyVideo />

          <div className="zaynich-approval__content">
            <p>
              The US FDA approval of ZAYNICH<sup>®</sup> marks a defining milestone not only for Wockhardt but
              also for India’s pharmaceutical industry. Emerging after more than four decades without a major
              breakthrough in the Gram-negative antibiotic space, ZAYNICH<sup>®</sup> represents a new class of
              life-saving antibacterial therapy built upon a novel β-lactam enhancer mechanism.
            </p>

            <p>
              Its approval is a testament to Wockhardt’s unwavering commitment to scientific innovation and to
              India’s growing capability to discover, develop, and commercialise globally relevant medicines
              that address critical unmet medical needs.
            </p>

            <p>
              More than a product approval, ZAYNICH<sup>®</sup> symbolises the transformation of India from a
              predominantly generic pharmaceutical supplier into a source of breakthrough innovation capable of
              delivering solutions to some of the world’s most pressing healthcare challenges.
            </p>

            <p>
              The achievement reflects the depth of scientific talent nurtured in India and demonstrates that
              Indian pharmaceutical companies can successfully navigate the long, high-risk, and scientifically
              demanding journey of drug discovery and development while meeting the stringent standards of the
              world’s most respected regulatory agencies.
            </p>

            <p>
              ZAYNICH<sup>®</sup> offers a promising therapeutic option against some of the most formidable
              multidrug-resistant Gram-negative pathogens encountered in intensive care units, including{" "}
              <em>Klebsiella pneumoniae</em>, <em>Pseudomonas aeruginosa</em>, and <em>Acinetobacter baumannii</em>.
            </p>

            <p>
              When used appropriately, it has the potential to significantly reduce mortality associated with
              these difficult-to-treat infections and improve outcomes for critically ill patients worldwide.
            </p>

            <p>
              The approval also carries broader implications for India’s innovation ecosystem. It serves as a
              compelling signal to policymakers, regulators, investors, and academic institutions that
              sustained investment in research and innovation can generate globally competitive therapies with
              meaningful societal impact.
            </p>

            <p>
              As India continues to bear a disproportionate burden of antimicrobial resistance, the successful
              development and commercialisation of four novel antibiotics demonstrates that Indian science can
              make substantial contributions towards combating one of the greatest public-health threats of our
              time.
            </p>

            <p>
              The global burden of AMR continues to rise at an alarming pace. Against this backdrop, the
              emergence of ZAYNICH<sup>®</sup> provides renewed hope to physicians and healthcare systems
              struggling with diminishing treatment options for severe resistant infections.
            </p>

            <p>
              Through an extensive compassionate-use programme spanning more than two years and the successful
              completion of a global Phase III clinical trial, ZAYNICH<sup>®</sup> has generated considerable
              optimism among clinicians, researchers, and healthcare stakeholders.
            </p>

            <p>
              Its approval reinforces confidence that scientific innovation can play a pivotal role in
              mitigating the human and economic consequences of antimicrobial resistance.
            </p>

            <p>
              In many respects, ZAYNICH<sup>®</sup> embodies the aspirations of a New India; an India that not
              only manufactures generic medicines for the world but also discovers them, invests in science,
              embraces innovation, and contributes transformative solutions to global healthcare.
            </p>

            <p className="zaynich-approval__closing">
              For Wockhardt, ZAYNICH<sup>®</sup> represents the culmination of decades of perseverance,
              scientific excellence, and belief in the power of innovation to improve and save lives.{" "}
              
            </p>
          </div>
        </div>
      </section>

      <SafetyInformation />
    </Layout>
  );
}
