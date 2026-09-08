import React from "react";

/**
 * Static single-image page banner (ported from components/inside-banner.html).
 * The original swapped image sets per-page by reading window.location; here
 * each page simply passes its own banner image in as props.
 */
export default function InsideBanner({ desktop, mobile, alt = "Zaynich page banner" }) {
  return (
    <section className="inside-banner" id="insideBanner" aria-label="Page banner">
      <picture className="inside-banner__media">
        <source className="inside-banner__source" media="(max-width: 768px)" srcSet={mobile || desktop} />
        <img className="inside-banner__image" src={desktop} alt={alt} fetchpriority="high" />
      </picture>

      <div className="inside-banner__overlay" aria-hidden="true"></div>
      <div className="inside-banner__content"></div>
    </section>
  );
}
