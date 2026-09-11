import React, { useId } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import useAnimatedProgress from "../hooks/useAnimatedProgress";
import SafetyInformation from "../components/SafetyInformation";
import { wpJsxContentToHtml } from "../utils/wpJsxContent";
import "../styles/efficacy.scss";

const efficacyOutcomes = [
  ["Composite response", "89.0% (250/281)", "68.4% (93/136)", "68.4% (93/136)"],
  ["Clinical cure", "96.8% (272/281)", "94.9% (129/136)", "94.9% (129/136)"],
  ["Microbiological response", "91.1% (256/281)", "70.6% (96/136)", "70.6% (96/136)"],
];

const pathogenResponses = [
  ["Escherichia coli", "92% (162/176)", "69% (60/87)", "/assets/img/icon-new-1.svg"],
  ["Klebsiella pneumoniae", "79% (41/52)", "63% (15/24)", "/assets/img/icon-2-new.svg"],
  ["Proteus mirabilis", "88% (22/25)", "86% (6/7)", "/assets/img/icon-3-new.svg"],
  ["Enterobacter cloacae complex", "85% (11/13)", "57% (4/7)", "/assets/img/icon-4-new.svg"],
  ["Pseudomonas aeruginosa", "57% (4/7)", "20% (1/5)", "/assets/img/icon-5-new.svg"],
];

const DEFAULT_DEFINITIONS = [
  { paraFirst: "Clinical cure was defined as complete resolution, or return to premorbid state, of baseline signs and symptoms of cUTI or pyelonephritis present at screening, with no new urinary symptoms or worsening of symptoms." },
  { paraFirst: "Microbiological response was defined as reduction of the baseline qualifying pathogen(s) to &lt;10<sup>3</sup> CFU/mL in urine." },
];

function CheckIcon() {
  return <svg viewBox="0 0 52 52" fill="none" aria-hidden="true"><path d="M29 5H12a7 7 0 0 0-7 7v28a7 7 0 0 0 7 7h28a7 7 0 0 0 7-7V24" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /><path d="m16 24 9 11L46 8" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function PathogenIcon({ src }: { src: string }) {
  return <img className="efficacy__pathogen-icon" src={src} alt="" aria-hidden="true" />;
}

function PatientArrow({ comparator = false }: { comparator?: boolean }) {
  return (
    <div className={`efficacy__patients${comparator ? " efficacy__patients--comparator" : ""}`}>
      <div className="efficacy__patient-pattern" aria-hidden="true">
        {Array.from({ length: 120 }, (_, index) => (
          <svg key={index} viewBox="0 0 16 36" fill="currentColor">
            <circle cx="8" cy="4" r="3" />
            <path d="M4 9h8a3 3 0 0 1 3 3v10h-3v12H9V23H7v11H4V22H1V12a3 3 0 0 1 3-3Z" />
          </svg>
        ))}
      </div>
      <p>{comparator ? "93/136 patients" : "250/281 patients"}</p>
    </div>
  );
}

function ResponseChart({ value, comparator = false, caption }: { value: number; comparator?: boolean; caption?: React.ReactNode }) {
  const { ref, progress } = useAnimatedProgress();
  const animatedValue = value * progress;
  const decimals = Number.isInteger(value) ? 0 : 1;
  return (
    <div className={`efficacy__chart${comparator ? " efficacy__chart--comparator" : ""}`}>
      <div ref={ref} className="efficacy__ring" role="img" aria-label={`${value}% composite response with ${comparator ? "meropenem" : "ZAYNICH"}`}>
        <svg viewBox="0 0 220 220" aria-hidden="true">
          <circle className="efficacy__ring-track" cx="110" cy="110" r="96" />
          <circle className="efficacy__ring-value" cx="110" cy="110" r="96" pathLength="100" strokeDasharray={`${animatedValue} ${100 - animatedValue}`} style={{ opacity: progress === 0 ? 0 : 1 }} transform="rotate(-90 110 110)" />
        </svg>
        <span aria-hidden="true">{animatedValue.toFixed(decimals)}%</span>
      </div>
      <p>{caption ?? (comparator ? "with meropenem" : <>Composite response<br />with ZAYNICH<sup>TM</sup></>)}</p>
    </div>
  );
}

function InfusionIcon({ progress }: { progress: number }) {
  const liquidClipId = `infusion-liquid-${useId().replace(/:/g, "")}`;
  const liquidHeight = 108 - 44 * progress;
  const tubeProgress = Math.min(progress / 0.25, 1);
  return <svg className="efficacy__infusion-icon" viewBox="0 0 160 250" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 244V20q0-10 10-10h30q0 10 12 10M72 15V9m-8 8q8-12 16 0" />
    <path d="M52 20h38q12 0 12 14v70q0 39-31 39t-31-39V34q0-14 12-14Z" />
    <defs>
      <clipPath id={liquidClipId}>
        <path d="M45 29h52v76q0 32-26 32t-26-32Z" />
      </clipPath>
    </defs>
    <rect x="45" y={137 - liquidHeight} width="52" height={liquidHeight} clipPath={`url(#${liquidClipId})`} fill="currentColor" stroke="none" />
    <path d="M62 147h18l-5 9h-8Zm5 10h8v22h-8Z" fill="currentColor" />
    <path d="M71 179v34c0 40 53 40 53 0V63c0-29 33-29 33 0v104" opacity=".3" />
    <path d="M71 179v34c0 40 53 40 53 0V63c0-29 33-29 33 0v104" pathLength="100" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${tubeProgress * 100} 100`} opacity={progress > 0 && progress < 1 ? 1 : 0} />
    <path d="M121 84h6v22h-6Zm34 70h4v21h-4Z" />
  </svg>;
}

function TrialArm({ comparator = false }: { comparator?: boolean }) {
  const { ref, progress } = useAnimatedProgress({ duration: 4200 });
  const boxFill = Math.max(0, Math.min((progress - 0.25) / 0.75, 1));
  return (
    <div ref={ref} className={`efficacy__trial-arm${comparator ? " efficacy__trial-arm--comparator" : ""}`}>
      <InfusionIcon progress={progress} />
      <div className="efficacy__dose-card efficacy__dose-card--transfer" style={{ "--dose-fill": boxFill, color: boxFill > 0.65 ? "white" : "#25202a" } as React.CSSProperties}>
        <span className="efficacy__dose-liquid" aria-hidden="true" />
        <h3>{comparator ? "Meropenem" : <>ZAYNICH<sup>TM</sup></>}</h3>
        {comparator ? <p>1 g IV every 8 hours</p> : <div className="efficacy__dose-details"><p>2 g cefepime +<br />1 g zidebactam</p><p>IV every<br />8 hours</p></div>}
      </div>
    </div>
  );
}

export default function EfficacyPage({ data }: { data: any }) {
  const page = data?.allWpPage?.edges?.[0]?.node;
  const ce = page?.clinicalEfficacy;

  const bannerDesk = page?.insidePages?.bannerImagesDesk?.node;
  const bannerMob = page?.insidePages?.bannerImagesMob?.node;
  const bannerImage = getImage(bannerDesk?.gatsbyImage || bannerMob?.gatsbyImage);
  const bannerAlt = bannerDesk?.altText || bannerMob?.altText || "It's below MIC. Then why are we still dying?";

  const topTitleHtml = wpJsxContentToHtml(ce?.clinicalPageTopTitle);
  const firstSectionParaHtml = wpJsxContentToHtml(ce?.clinicalEfficacyFirstSectionPara);
  const hightRatesTitle = ce?.hightRatesTitle || "High rates of clinical cure and microbiological response";
  const definitions = ce?.hightRatesList?.length ? ce.hightRatesList : DEFAULT_DEFINITIONS;
  const zaynichClinicalTitleHtml = wpJsxContentToHtml(ce?.zaynichClinicalTitle) || "The Zaynich<sup>TM</sup> Clinical Trial";
  const zaynichClinicalParaHtml = wpJsxContentToHtml(ce?.zaynichClinicalPara);
  const zaynichSectionParaHtml = wpJsxContentToHtml(ce?.zaynichSectionPara);

  return (
    <Layout title="Clinical efficacy | ZAYNICH" bodyClass="efficacy-page">
      <div className="efficacy">
        <div className="efficacy__banner">
          {bannerImage ? (
            <GatsbyImage image={bannerImage} alt={bannerAlt} />
          ) : (
            <picture>
              <source media="(max-width: 768px)" srcSet="/assets/img/Zaynivch%20T%20Banners_m-efficacy.jpg" />
              <img src="/assets/img/Zaynivch%20T%20Banners_Efficacy.jpg" alt={bannerAlt} />
            </picture>
          )}
        </div>
        <section className="efficacy__intro" aria-labelledby="efficacy-title">
          {topTitleHtml ? (
            <div dangerouslySetInnerHTML={{ __html: topTitleHtml }} />
          ) : (
            <>
              <h1 id="efficacy-title">Proven efficacy in adults with cUTI, including pyelonephritis</h1>
              <p className="efficacy__headline"><span className="efficacy__brand">ZAYNICH<sup>TM</sup></span>demonstrated an 89% composite response at Test of Cure</p>
            </>
          )}
          {firstSectionParaHtml ? (
            <div dangerouslySetInnerHTML={{ __html: firstSectionParaHtml }} />
          ) : (
            <p className="efficacy__description">In a multinational, double-blind, noninferiority trial, ZAYNICH<sup>TM</sup> was evaluated versus meropenem in adults with complicated urinary tract infections (cUTI), including pyelonephritis.</p>
          )}
        </section>

        <section className="efficacy__results" aria-label="Composite response at Test of Cure">
          <div className="efficacy__comparison">
            <div className="efficacy__arm"><PatientArrow /><ResponseChart value={89} /></div>
            <img className="efficacy__versus" src="/assets/img/vs-icon.svg" alt="" aria-hidden="true" />
            <div className="efficacy__arm efficacy__arm--comparator"><PatientArrow comparator /><ResponseChart value={68.4} comparator /></div>
          </div>
          <p className="efficacy__difference">Treatment difference: <span>20.6% (95% CI: 12.3, 29.5)</span></p>
          <p className="efficacy__definition">Composite response was defined as both clinical cure and<br className="efficacy__desktop-break" /> microbiological response at the Test of Cure (TOC) visit, 10 days after the end of treatment.</p>
        </section>
        <section className="efficacy__outcomes" aria-labelledby="efficacy-outcomes-title">
          <h2 className="efficacy__section-title" id="efficacy-outcomes-title">{hightRatesTitle}</h2>
          <p className="efficacy__section-subtitle">At the Test of Cure visit:</p>
          <div className="efficacy__table-scroll" role="region" aria-label="Efficacy outcomes table" tabIndex={0}>
            <div className="efficacy__table-frame efficacy__table-frame--outcomes">
              <table className="efficacy__data-table" aria-labelledby="efficacy-outcomes-title">
                <colgroup><col style={{ width: "34%" }} /><col style={{ width: "22%" }} /><col style={{ width: "19%" }} /><col style={{ width: "25%" }} /></colgroup>
                <thead><tr><th scope="col">Efficacy Outcome</th><th scope="col">ZAYNICH<sup>TM</sup></th><th scope="col">Meropenem</th><th scope="col">Treatment Difference<br />(95% CI)</th></tr></thead>
                {/* Treatment-difference values transcribed from the supplied design; confirm before publication. */}
                <tbody>{efficacyOutcomes.map(([outcome, zaynich, meropenem, difference]) => <tr key={outcome}><th scope="row">{outcome}</th><td>{zaynich}</td><td>{meropenem}</td><td>{difference}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <ul className="efficacy__definitions">
            {definitions.map((item: { paraFirst: string }, i: number) => (
              <li key={i}><CheckIcon /><p dangerouslySetInnerHTML={{ __html: wpJsxContentToHtml(item.paraFirst) }} /></li>
            ))}
          </ul>
        </section>

        <section className="efficacy__pathogens" aria-labelledby="efficacy-pathogens-title">
          <h2 className="efficacy__section-title" id="efficacy-pathogens-title">{hightRatesTitle}</h2>
          <p className="efficacy__section-subtitle" id="efficacy-pathogens-subtitle">Composite response at Test of Cure by baseline pathogen</p>
          <div className="efficacy__table-scroll" role="region" aria-label="Response by baseline pathogen table" tabIndex={0}>
            <div className="efficacy__table-frame efficacy__table-frame--pathogens">
              <table className="efficacy__data-table" aria-describedby="efficacy-pathogens-subtitle">
                <colgroup><col style={{ width: "50%" }} /><col style={{ width: "25%" }} /><col style={{ width: "25%" }} /></colgroup>
                <thead><tr><th scope="col">Gram-negative pathogen</th><th scope="col">ZAYNICH<sup>TM</sup></th><th scope="col">Meropenem</th></tr></thead>
                <tbody>{pathogenResponses.map(([pathogen, zaynich, meropenem, icon]) => <tr key={pathogen}><th scope="row"><span className="efficacy__pathogen-name"><PathogenIcon src={icon} /><span>{pathogen}</span></span></th><td>{zaynich}</td><td>{meropenem}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="efficacy__esbl" aria-labelledby="esbl-title">
          <h2 className="efficacy__section-title" id="esbl-title">Efficacy in ESBL-screen-positive isolates</h2>
          <p className="efficacy__esbl-description">Among patients with E. coli, K. pneumoniae, or P. mirabilis isolates with<br className="efficacy__desktop-break" /> an extended-spectrum beta-lactamase (ESBL)-screen-positive phenotype:</p>
          <svg className="efficacy__thumb-watermark" viewBox="0 0 240 270" fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M183 235c-50 16-77 18-121 18H39c-24 0-26-31-7-35-29 0-32-34-9-38-27-3-27-35-2-38-29-5-23-38 1-38h48C43 74 45 6 68 7c29 1 21 53 55 76l60 29M184 98h36q14 0 14 14v124q0 14-14 14h-36Z" />
          </svg>
          <div className="efficacy__esbl-charts">
            <ResponseChart value={89} caption={<>62/70<br />of ZAYNICH<sup>TM</sup>-treated patients achieved composite response at Test of Cure</>} />
            <img className="efficacy__versus" src="/assets/img/vs-icon.svg" alt="" aria-hidden="true" />
            <ResponseChart value={70} comparator caption={<>31/44<br />of meropenem-<br />treated patients.</>} />
          </div>
        </section>

        <section className="efficacy__trial" aria-labelledby="clinical-trial-title">
          <h2 className="efficacy__section-title" id="clinical-trial-title" dangerouslySetInnerHTML={{ __html: zaynichClinicalTitleHtml }} />
          {zaynichClinicalParaHtml ? (
            <div dangerouslySetInnerHTML={{ __html: zaynichClinicalParaHtml }} />
          ) : (
            <p className="efficacy__trial-intro">A multinational Phase 3 study in adults with cUTI, including pyelonephritis<br />A total of 530 adults with cUTI, including pyelonephritis, were randomized 2:1 to receive:</p>
          )}
          <div className="efficacy__trial-arms">
            <TrialArm />
            <span className="efficacy__trial-or">or</span>
            <TrialArm comparator />
          </div>
          {zaynichSectionParaHtml ? (
            <div dangerouslySetInnerHTML={{ __html: zaynichSectionParaHtml }} />
          ) : (
            <div className="efficacy__trial-copy">
              <p>Both treatments were infused over 1 hour for 7 to 10 days. Dose adjustments were made for patients with renal impairment. Switching from IV to oral antibacterial therapy was not permitted.</p>
              <p>The primary efficacy analysis was conducted in the microbiological modified intent-to-treat (mMITT) population, which included <span className="efficacy__trial-population"><span>281 ZAYNICH<sup>TM</sup>-treated patients</span> and 136 meropenem-treated patients.</span></p>
              <p>At baseline, 68% of patients had cUTI and 32% had pyelonephritis. Concomitant bacteremia was identified in 6% of ZAYNICH<sup>TM</sup>-treated patients and 7% of meropenem-treated patients.</p>
            </div>
          )}
        </section>
      </div>
      <SafetyInformation />
    </Layout>
  );
}

export const query = graphql`
  query ClinicalEfficacyPageQuery {
    allWpPage(filter: { databaseId: { eq: 294 } }) {
      edges {
        node {
          clinicalEfficacy {
            clinicalPageTopTitle
            clinicalEfficacyFirstSectionPara
            fullSectionCode
            hightRatesTitle
            highRatesTable
            hightRatesList {
              paraFirst
            }
            microbiologicalResponseTable
            efficacySection
            zaynichClinicalTitle
            zaynichClinicalPara
            imageSectionIv
            zaynichSectionPara
          }
          insidePages {
            bannerImagesDesk {
              node {
                altText
                gatsbyImage(
                  height: 760
                  width: 3840
                  quality: 90
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                )
              }
            }
            bannerImagesMob {
              node {
                altText
                gatsbyImage(
                  height: 760
                  width: 3840
                  quality: 90
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  }
`;
