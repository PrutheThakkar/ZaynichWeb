import React from "react";
import { useStaticQuery, graphql } from "gatsby";

/**
 * The WordPress field currently stores this block as pasted JSX source
 * (`className=`, `{" "}`) rather than plain HTML, which would otherwise
 * lose all styling and show literal `{" "}` text on the page. This repairs
 * it for display — the real fix is cleaning up the content in WordPress.
 */
function normalizeCmsHtml(html) {
  if (!html) return "";
  return html.replace(/className=/g, "class=").replace(/\{"\s*"\}/g, " ");
}

/**
 * The full "ZAYNICH (cefepime and zidebactam) for Injection" indication,
 * usage and safety block. Repeated verbatim at the bottom of every page —
 * sourced from the WordPress options page (zaynichInjectionSection).
 */
export default function SafetyInformation() {
  const data = useStaticQuery(graphql`
    query SafetyInformationQuery {
      wp {
        optionPage {
          zaynichInjectionSection {
            zaynichSection
          }
        }
      }
    }
  `);

  const rawHtml = data?.wp?.optionPage?.zaynichInjectionSection?.zaynichSection;

  return <div dangerouslySetInnerHTML={{ __html: normalizeCmsHtml(rawHtml) }} />;
}
