import React from "react";

import Layout from "../components/Layout";
import { Link } from "gatsby";

const SITEMAP_SECTIONS = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Burden of Anti-Microbial Resistance",
    links: [
      { label: "What is AMR?", to: "/what-is-amr/" },
      { label: "Risks & Hospitalisation", to: "/what-is-amr/#amrRisk" },
    ],
  },
  {
    label: "The Zaynich™ Journey",
    to: "/the-zaynich-journey/",
  },
  {
    label: "How Zaynich™ Works?",
    links: [
      { label: "Broad Spectrum", to: "/broad-spectrum/" },
      { label: "Mechanism of Action", to: "/mechanism-of-action/" },
      { label: "Dosage", to: "/dosage/" },
    ],
  },
  {
    label: "Clinical Data",
    links: [
      { label: "Clinical Efficacy", to: "/efficacy/" },
      { label: "Safety Profile", to: "/safety-profile/" },
    ],
  },
  {
    label: "Prescribing Information",
    href: "/assets/pdfs/Zaynich_Final%20PI_C2C_PDF.pdf",
  },
];

export default function SitemapPage() {
  return (
    <Layout title="Sitemap — Zaynich" bodyClass="sitemap-page">
      <section className="sitemap">
        <div className="container">
          <h1>Sitemap</h1>
          <ul className="sitemap__list">
            {SITEMAP_SECTIONS.map((section) => (
              <li key={section.label} className="sitemap__item">
                {section.to ? (
                  <Link to={section.to} className="sitemap__link sitemap__link--top">
                    {section.label}
                  </Link>
                ) : section.href ? (
                  <a
                    href={section.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sitemap__link sitemap__link--top"
                  >
                    {section.label}
                  </a>
                ) : (
                  <span className="sitemap__heading">{section.label}</span>
                )}

                {section.links && (
                  <ul className="sitemap__sublist">
                    {section.links.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className="sitemap__link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
