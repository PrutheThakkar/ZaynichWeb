import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import CountUp from "../components/CountUp";
import useAnimatedProgress from "../hooks/useAnimatedProgress";
import SafetyInformation from "../components/SafetyInformation";
import { wpJsxContentToHtml } from "../utils/wpJsxContent";
import "../styles/safety-profile.scss";

const reactions = [
  { name: "Diarrhea", zaynich: "4%", meropenem: "4%" },
  { name: "Hypertension*", zaynich: "3%", meropenem: "2%" },
  { name: "Headache", zaynich: "3%", meropenem: "5%" },
  { name: "Hypokalemia", zaynich: "3%", meropenem: "1%" },
];

const DEFAULT_ADDITIONAL_WARNINGS = [
  {
    additionalListName: "<h3>Positive direct Coombs’ tests</h3>",
    additionalListPara:
      "<p>Positive direct Coombs’ tests, with or without hemolysis, have been reported during treatment with cefepime, a component of ZAYNICH<sup>TM</sup>.</p>",
  },
  {
    additionalListName: "<h3>Prolonged prothrombin time</h3>",
    additionalListPara:
      "<p>Decreased prothrombin activity has been reported with cephalosporins, including cefepime. Monitor prothrombin time in patients at risk and administer exogenous vitamin K as indicated.</p>",
  },
  {
    additionalListName: "<h3>Interactions with<br /> urine glucose testing</h3>",
    additionalListPara:
      "<p>Cefepime may result in a false-positive reaction for glucose in the urine with certain testing methods. Glucose tests based on enzymatic glucose oxidase reactions are recommended.</p>",
  },
  {
    additionalListName: "<h3>Development of<br /> drug-resistant bacteria</h3>",
    additionalListPara:
      "<p>Prescribing ZAYNICH<sup>TM</sup> in the absence of a proven or strongly suspected bacterial infection or prophylactic indication is unlikely to provide benefit and increases the risk of developing drug-resistant bacteria.</p>",
  },
];

const DEFAULT_RENAL_COPY_HTML = `<div className="safety-profile__renal-copy">
  <p className="safety-profile__purple">Adjust ZAYNICH<sup>TM</sup> dosing in patients with renal impairment</p>
  <p>Dosage adjustment is recommended in adults with an eGFR &lt;60 mL/min, including patients receiving intermittent hemodialysis.</p>
  <p>Because neurotoxicity has been reported with cefepime and most cases occurred in patients with renal impairment who did not receive appropriate dosage adjustment, renal function and appropriate dosing should be considered when treating patients with ZAYNICH<sup>TM</sup>.</p>
</div>`;

function TreatmentCircle({ comparator = false }: { comparator?: boolean }) {
  const { ref, progress } = useAnimatedProgress();
  return (
    <div className="safety-profile__treatment" ref={ref}>
      <svg className="safety-profile__treatment-outline" viewBox="0 0 180 180" aria-hidden="true">
        <circle cx="90" cy="90" r="87" fill="none" stroke="#555" strokeWidth="3" pathLength="100"
          strokeDasharray={`${75 * progress} 100`} transform="rotate(-135 90 90)" />
      </svg>
      <span>received<br />{comparator ? "meropenem" : <>ZAYNICH<sup>TM</sup></>}</span>
    </div>
  );
}

function PatientIcons() {
  return (
    <div className="safety-profile__people" aria-hidden="true">
      {Array.from({ length: 16 }, (_, index) => (
        <svg key={index} viewBox="0 0 24 52" fill="currentColor">
          <circle cx="12" cy="6" r="5" />
          <path d="M6 13h12a4 4 0 0 1 4 4v13a3 3 0 0 1-4 3v15a3 3 0 0 1-6 0 3 3 0 0 1-6 0V33a3 3 0 0 1-4-3V17a4 4 0 0 1 4-4Z" />
        </svg>
      ))}
    </div>
  );
}

function WarningIcon() {
  return (
    <svg className="safety-profile__warning-icon" viewBox="0 0 100 90" fill="none" aria-hidden="true">
      <path d="M46 8a5 5 0 0 1 8 0l41 72a4 4 0 0 1-4 6H9a4 4 0 0 1-4-6Z" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d="M44 33h12l-2 25h-8Z" fill="currentColor" />
      <circle cx="50" cy="69" r="5" fill="currentColor" />
    </svg>
  );
}

function PrecautionIcon({ type }: { type: "hand" | "brain" | "bacteria" }) {
  if (type === "bacteria") {
    return (
      <img
        className="safety-profile__precaution-icon safety-profile__precaution-icon--bacteria"
        src="/assets/img/Clostridioides-icon.svg"
        alt=""
        aria-hidden="true"
      />
    );
  }

  return (
    <svg className="safety-profile__precaution-icon" viewBox="0 0 76 76" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="38" cy="38" r="36" strokeWidth="1" />
      {type === "hand" && <>
        <path d="m24 62 5-18-3-12 6-19q3-3 4 1l-4 17 7-21q4-2 4 2l-6 20 7-19q4-2 4 2l-6 21 7-15q4-1 3 3l-6 20 7-7q5-2 4 3L44 53l-4 13" />
        <path d="M36 43q3-8 10-5M32 51l4 3m-9 3 4 2" />
        <circle cx="25" cy="65" r="1.5" /><circle cx="34" cy="61" r="1.5" />
      </>}
      {type === "brain" && <>
        <path d="M36 15c-6-5-12 1-11 6-8-2-12 5-8 10-8 3-7 12-1 15-4 7 2 13 8 12 0 8 9 10 12 4ZM40 15c6-5 12 1 11 6 8-2 12 5 8 10 8 3 7 12 1 15 4 7-2 13-8 12 0 8-9 10-12 4Z" />
        <path d="M26 23q7 1 5 8m-11 3q8-2 8 6m-7 8q7-5 10 2m-3 8 3-4m18-31q-7 1-5 8m11 3q-8-2-8 6m7 8q-7-5-10 2m3 8-3-4M38 11v55" />
      </>}
    </svg>
  );
}

export default function SafetyProfilePage({ data }: { data: any }) {
  const page = data?.allWpPage?.edges?.[0]?.node;
  const sp = page?.safetyProfile;

  const bannerDesk = page?.insidePages?.bannerImagesDesk?.node;
  const bannerMob = page?.insidePages?.bannerImagesMob?.node;
  const bannerImage = getImage(bannerDesk?.gatsbyImage || bannerMob?.gatsbyImage);
  const bannerAlt =
    bannerDesk?.altText ||
    bannerMob?.altText ||
    "Relax, side effects will get it discontinued. Not with this safety profile, genius.";

  const discontinuationsHtml = wpJsxContentToHtml(sp?.discontinuationsSection);
  const contraindicationsParaHtml = wpJsxContentToHtml(sp?.contraindicationsPara);
  const additionalWarnings = sp?.additionalWarningList?.length ? sp.additionalWarningList : DEFAULT_ADDITIONAL_WARNINGS;

  const renalCopyMatch = (sp?.renalFunctionsPara || "").match(/<div className="safety-profile__renal-copy">[\s\S]*?<\/div>/);
  const renalCopyHtml = wpJsxContentToHtml(renalCopyMatch ? renalCopyMatch[0] : DEFAULT_RENAL_COPY_HTML);

  return (
    <Layout title="Safety profile | ZAYNICH" bodyClass="safety-profile-page">
      <div className="safety-profile">
        <div className="safety-profile__banner">
          {bannerImage ? (
            <GatsbyImage image={bannerImage} alt={bannerAlt} />
          ) : (
            <img src="/assets/img/Zaynivch%20T%20Banners_Safety.jpg" alt={bannerAlt} />
          )}
        </div>

        <section className="safety-profile__study" aria-labelledby="safety-profile-title">
          {sp?.safetyProfileFirstTitle ? (
            <h1 id="safety-profile-title">{sp.safetyProfileFirstTitle}</h1>
          ) : (
            <h1 id="safety-profile-title">The safety profile of ZAYNICH<sup>TM</sup></h1>
          )}
          <div className="safety-profile__intro">
            {sp?.safetyProfileFirstPara ? (
              <p>{sp.safetyProfileFirstPara}</p>
            ) : (
              <p>The safety of ZAYNICH<sup>TM</sup> was evaluated in a Phase 3 clinical trial in adults with<br className="safety-profile__desktop-break" /> complicated urinary tract infections (cUTI), including pyelonephritis.</p>
            )}
          </div>
          <div className="safety-profile__cohorts">
            <div className="safety-profile__cohort">
              <PatientIcons />
              <p className="safety-profile__count"><CountUp as="strong" count={352} /><span>patients</span></p>
              <TreatmentCircle />
            </div>
            <div className="safety-profile__cohort safety-profile__cohort--comparator">
              <PatientIcons />
              <p className="safety-profile__count"><CountUp as="strong" count={177} /><span>patients</span></p>
              <TreatmentCircle comparator />
            </div>
          </div>
          <p className="safety-profile__duration">The median duration of therapy was 8 days in both treatment groups.</p>
        </section>

        <section className="safety-profile__reactions" aria-labelledby="adverse-reactions-title">
          <h2 id="adverse-reactions-title">{sp?.mostCommonTitle || "Most common adverse reactions"}</h2>
          {sp?.mostCommonSecPara ? (
            <p className="safety-profile__summary">{sp.mostCommonSecPara}</p>
          ) : (
            <p className="safety-profile__summary">The most frequently reported adverse reactions occurring in <span>≥2% of patients treated<br className="safety-profile__desktop-break" /> with ZAYNICH<sup>TM</sup></span> were diarrhea, hypertension, headache, and hypokalemia.</p>
          )}
          <div className="safety-profile__table-wrap">
            <table aria-labelledby="adverse-reactions-title" aria-describedby="safety-profile-footnote safety-profile-comparison">
              <thead><tr><th scope="col">Adverse reaction</th><th scope="col">ZAYNICH<sup>TM</sup> (N=352)</th><th scope="col">Meropenem (N=177)</th></tr></thead>
              <tbody>
                {reactions.map(({ name, zaynich, meropenem }) => (
                  <tr key={name}><th scope="row">{name}</th><td>{zaynich}</td><td>{meropenem}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="safety-profile__footnote" id="safety-profile-footnote"><em>*Hypertension includes blood pressure inadequately controlled and hypertension.</em></p>
          <p className="safety-profile__comparison" id="safety-profile-comparison">Important: Trial 1 was not designed to evaluate meaningful comparisons of the incidence of adverse reactions between the ZAYNICH<sup>TM</sup> and meropenem treatment groups.</p>
        </section>
        <section className="safety-profile__discontinuations" aria-labelledby="discontinuations-title">
          <h2 className="safety-profile__pill" id="discontinuations-title">{sp?.discontinuationsTitle || "Discontinuations due to adverse reactions"}</h2>
          {discontinuationsHtml ? (
            <div dangerouslySetInnerHTML={{ __html: discontinuationsHtml }} />
          ) : (
            <>
              <p><span className="safety-profile__purple">1.4% (5/352)</span> of patients receiving ZAYNICH<sup>TM</sup> discontinued treatment due to an adverse reaction.</p>
              <div className="safety-profile__discontinuation-card">
                <p className="safety-profile__discontinuation-label">The adverse reactions resulting in discontinuation were:</p>
                <ul>
                  <li>Anaphylactic reaction</li>
                  <li>Clostridioides difficile colitis</li>
                  <li>Hyperbilirubinemia</li>
                  <li>Drug hypersensitivity</li>
                  <li>Enterococcal urinary tract infection</li>
                </ul>
              </div>
              <p>Each occurred in 0.3% (1/352) of ZAYNICH<sup>TM</sup>-treated patients.</p>
              <p className="safety-profile__no-deaths safety-profile__purple">No deaths were reported in the Phase 3 trial.</p>
            </>
          )}
        </section>

        <section className="safety-profile__precautions" aria-labelledby="precautions-title">
          <div className="safety-profile__precautions-heading">
            <WarningIcon />
            <h2 className="safety-profile__pill" id="precautions-title">{sp?.warningsAndPrecautionsTitle || "WARNINGS AND PRECAUTIONS"}</h2>
            <WarningIcon />
          </div>
          <div className="safety-profile__precautions-grid">
            <article className="safety-profile__hypersensitivity">
              <h3><PrecautionIcon type="hand" /><span>Hypersensitivity<br /> reactions</span></h3>
              <p>Serious hypersensitivity reactions, including anaphylaxis, have been reported in patients treated with ZAYNICH<sup>TM</sup>.</p>
              <p>Before initiating ZAYNICH<sup>TM</sup>, carefully inquire about previous hypersensitivity reactions to cefepime, cephalosporins, penicillins, or other beta-lactams because cross-hypersensitivity among beta-lactam antibacterial drugs has been reported.</p>
              <p>If an allergic reaction to ZAYNICH<sup>TM</sup> occurs, discontinue ZAYNICH<sup>TM</sup> and institute appropriate supportive measures.</p>
            </article>
            <article className="safety-profile__neurotoxicity">
              <h3><PrecautionIcon type="brain" /><span>Neurotoxicity</span></h3>
              <p>Neurotoxicity has been reported during treatment with cefepime,<br className="safety-profile__desktop-break" /> a component of ZAYNICH<sup>TM</sup>, including life-threatening or fatal occurrences.<br />Reported manifestations include:</p>
              <ul>
                <li>Encephalopathy, including confusion, hallucinations, stupor,<br className="safety-profile__desktop-break" /> and coma</li>
                <li>Aphasia</li>
                <li>Myoclonus</li>
                <li>Seizures</li>
              </ul>
              <p>Nonconvulsive status epilepticus<br />Most cases occurred in patients with renal impairment who did not receive appropriate dosage adjustment. However, cases have also occurred in patients who received dosage adjustment appropriate for their degree of renal impairment.<br />If neurotoxicity associated with ZAYNICH<sup>TM</sup> therapy occurs, discontinue ZAYNICH<sup>TM</sup> and institute appropriate supportive measures.</p>
            </article>
            <article className="safety-profile__infection">
              <h3><PrecautionIcon type="bacteria" /><span>Clostridioides difficile infection</span></h3>
              <p>Clostridioides difficile infection (CDI) has been reported with nearly all antibacterial agents, including ZAYNICH<sup>TM</sup>, and may range in severity from mild diarrhea to fatal colitis.</p>
              <p>Consider CDI in patients who develop diarrhea following antibacterial drug use. CDI has been reported to occur more than 2 months after administration of antibacterial agents.</p>
            </article>
          </div>
        </section>
        <section className="safety-profile__additional" aria-labelledby="additional-warnings-title">
          <h2 className="safety-profile__pill" id="additional-warnings-title">{sp?.additionalWorkingTitle || "Additional Warnings And Precautions"}</h2>
          <div className="safety-profile__warning-watermark"><WarningIcon /></div>
          <div className="safety-profile__additional-grid">
            {additionalWarnings.map((item: { additionalListName: string; additionalListPara: string }, i: number) => (
              <article className="safety-profile__additional-card" key={i}>
                <div dangerouslySetInnerHTML={{ __html: wpJsxContentToHtml(item.additionalListName) }} />
                <div dangerouslySetInnerHTML={{ __html: wpJsxContentToHtml(item.additionalListPara) }} />
              </article>
            ))}
          </div>
        </section>

        <section className="safety-profile__contraindications" aria-labelledby="contraindications-title">
          <h2 className="safety-profile__pill" id="contraindications-title">{sp?.contraindicationsTitle || "Contraindications"}</h2>
          {contraindicationsParaHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contraindicationsParaHtml }} />
          ) : (
            <p>ZAYNICH<sup>TM</sup> is contraindicated in patients with a known history of serious hypersensitivity to: cefepime or zidebactam or other beta-lactam antibacterial drugs</p>
          )}
        </section>

        <section className="safety-profile__renal" aria-labelledby="renal-function-title">
          <img className="safety-profile__kidney-watermark" src="/assets/img/kidney.svg" alt="" aria-hidden="true" />
          <h2 className="safety-profile__pill" id="renal-function-title">{sp?.renalFunctionsTitle || "RENAL FUNCTION MATTERS"}</h2>
          <div dangerouslySetInnerHTML={{ __html: renalCopyHtml }} />
          <Link className="safety-profile__dosing-link" to="/dosage/#zaynichDosage">VIEW DOSING IN RENAL IMPAIRMENT</Link>
        </section>
      </div>
      <SafetyInformation />
    </Layout>
  );
}

export const query = graphql`
  query SafetyProfilePageQuery {
    allWpPage(filter: { databaseId: { eq: 331 } }) {
      edges {
        node {
          safetyProfile {
            safetyProfileFirstTitle
            safetyProfileFirstPara
            mostCommonTitle
            mostCommonSecPara
            discontinuationsTitle
            discontinuationsSection
            warningsAndPrecautionsTitle
            worningAndPrecautionsSection
            additionalWorkingTitle
            additionalWarningList {
              additionalListName
              additionalListPara
            }
            contraindicationsTitle
            contraindicationsPara
            renalFunctionsTitle
            renalFunctionsPara
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
