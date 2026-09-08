import React from "react";
import "../styles/home.scss";
import "../styles/compassionate.scss";

import Layout from "../components/Layout";
import SafetyInformation from "../components/SafetyInformation";

const CASES = [
  {
    href: "/assets/pdfs/Dr Saumya_Feb 2026.pdf",
    label: "Open recurrent XDR Klebsiella pneumoniae pyelonephritis case PDF",
    title: "Recurrent XDR Klebsiella pneumoniae Pyelonephritis",
    description: "Ovarian cancer with recurrent kidney infection",
  },
  {
    href: "/assets/pdfs/WCK 5222_Dubey 2023.pdf",
    label: "Open intra-abdominal sepsis and secondary pneumonia case PDF",
    title: "Intra-abdominal Sepsis & Secondary Pneumonia",
    description: "Critically ill patient with XDR NDM-producing Pseudomonas aeruginosa",
  },
  {
    href: "/assets/pdfs/Dr Surabhi Madan_2026.pdf",
    label: "Open XDR Pseudomonas aeruginosa pyelonephritis case PDF",
    title: "XDR Pseudomonas aeruginosa Pyelonephritis",
    description: "Therapeutic dead-end kidney infection",
  },
  {
    href: "/assets/pdfs/WCK 5222_Tirlangi 2023.pdf",
    label: "Open disseminated infection in acute T-cell leukemia case PDF",
    title: "Disseminated Infection in Acute T-Cell Leukemia",
    description: "Salvage therapy for XDR NDM-producing Pseudomonas aeruginosa",
  },
  {
    href: "/assets/pdfs/Manesh A 2025.pdf",
    label: "Open malignant otitis externa and skull base osteomyelitis case PDF",
    title: "Malignant Otitis Externa & Skull Base Osteomyelitis",
    description: "Deep-seated XDR Pseudomonas aeruginosa infections",
  },
  {
    href: "/assets/pdfs/WCK 5222_Dr Soman_Feb 2024.pdf",
    label: "Open sino-pulmonary infection and skull base osteomyelitis case PDF",
    title: "Sino-pulmonary Infection & Skull Base Osteomyelitis",
    description: "Renal transplant recipient with XDR Pseudomonas aeruginosa",
  },
  {
    href: "/assets/pdfs/US patient Compassionate use_July2025.pdf",
    label: "Open cholangitis and liver transplantation case PDF",
    title: "Cholangitis & Liver Transplantation",
    description: "Cefiderocol-resistant Pseudomonas aeruginosa and Klebsiella pneumoniae",
  },
];

export default function CompassionateUsePage() {
  return (
    <Layout title="Zaynich Component Layout" bodyClass="zaynich-compassionate">
      <section className="inside-banner" id="insideBanner" aria-label="Page banner">
        <h2 className="real-world-cases__title" id="realWorldCasesTitle">
          Explore real-world cases where investigational ZAYNICH<sup>®</sup>
          <span> was used for patients with limited or no remaining treatment options.</span>
        </h2>
      </section>

      <section className="real-world-cases" id="realWorldCases" aria-labelledby="realWorldCasesTitle">
        <div className="real-world-cases__container">
          <div className="real-world-cases__grid">
            {CASES.map((item) => (
              <a
                className="case-card"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                key={item.href}
              >
                <span className="case-card__content">
                  <span className="case-card__title">{item.title}</span>
                  <span className="case-card__description">{item.description}</span>
                </span>

                <span className="case-card__icon" aria-hidden="true">
                  <img src="/assets/img/svg-pointer.svg" alt="svg" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SafetyInformation />
    </Layout>
  );
}
