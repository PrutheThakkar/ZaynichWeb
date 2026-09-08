import React, { useEffect } from "react";
import "swiper/css/bundle";
import "../styles/site.css";
import "../styles/common.scss";

import Seo from "./Seo";
import Header from "./Header";
import SafetyBar from "./SafetyBar";
import Footer from "./Footer";

/**
 * Smooth-scrolls to a hash target, compensating for the fixed top header —
 * ported from the scrollToSection/handlePageHash logic in header.html's
 * inline script (used by nav links such as "Risks & Hospitalisation", which
 * points at /what-is-amr/#amrRisk).
 */
function useHashScroll() {
  useEffect(() => {
    function scrollToSection(hash) {
      if (!hash) return;
      const target = document.querySelector(hash);
      if (!target) return;

      const topHeader = document.querySelector(".top-header");
      const headerOffset = topHeader ? topHeader.getBoundingClientRect().height : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }

    if (window.location.hash) {
      window.setTimeout(() => scrollToSection(window.location.hash), 150);
    }

    function handleHashChange() {
      if (window.location.hash) scrollToSection(window.location.hash);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
}

/**
 * Shared page shell. Ported from the repeated <head> boilerplate + the
 * data-include header/footer/safety-bar markup that every page in the
 * original static site pulled in via component-loader.js.
 */
export default function Layout({ title, bodyClass, children }) {
  useHashScroll();

  return (
    <div className={bodyClass}>
      <Seo title={title} />

      <Header />

      <div className="page-shell">
        <main className="main-content" id="main-content">
          <SafetyBar />
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
