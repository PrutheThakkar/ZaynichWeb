import React, { useEffect, useRef } from "react";
import { Link, navigate } from "gatsby";

/**
 * Ported from js/header.js.
 * Behavior (mobile menu, submenu open/close, escape key, outside click,
 * resize handling) is kept as close to the original vanilla implementation
 * as possible, wired up in an effect against the rendered markup below.
 */
export default function Header() {
  const verticalHeaderRef = useRef(null);

  useEffect(() => {
    const verticalHeader = verticalHeaderRef.current;
    if (!verticalHeader) return undefined;

    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileMenuClose = document.getElementById("mobileMenuClose");
    const navigationBackdrop = document.getElementById("navigationBackdrop");
    const navToggles = verticalHeader.querySelectorAll(".nav-toggle");
    const closeTimers = new Map();

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function openMobileMenu() {
      verticalHeader.classList.add("is-open");
      document.body.classList.add("menu-open");
      verticalHeader.setAttribute("aria-hidden", "false");

      if (navigationBackdrop) {
        navigationBackdrop.classList.add("is-visible");
        navigationBackdrop.setAttribute("aria-hidden", "false");
      }

      if (mobileMenuButton) {
        mobileMenuButton.setAttribute("aria-expanded", "true");
        mobileMenuButton.setAttribute("aria-label", "Close navigation menu");
      }
    }

    function closeMobileMenu() {
      verticalHeader.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      verticalHeader.setAttribute("aria-hidden", isMobile() ? "true" : "false");

      if (navigationBackdrop) {
        navigationBackdrop.classList.remove("is-visible");
        navigationBackdrop.setAttribute("aria-hidden", "true");
      }

      if (mobileMenuButton) {
        mobileMenuButton.setAttribute("aria-expanded", "false");
        mobileMenuButton.setAttribute("aria-label", "Open navigation menu");
      }
    }

    function closeSubnav(toggle) {
      const subnavId = toggle.getAttribute("aria-controls");
      const subnav = document.getElementById(subnavId);

      toggle.setAttribute("aria-expanded", "false");
      if (!subnav) return;

      subnav.classList.remove("is-open");

      const existingTimer = closeTimers.get(subnav);
      if (existingTimer) window.clearTimeout(existingTimer);

      const timer = window.setTimeout(() => {
        if (toggle.getAttribute("aria-expanded") === "false") {
          subnav.hidden = true;
        }
      }, 300);

      closeTimers.set(subnav, timer);
    }

    function openSubnav(toggle) {
      const subnavId = toggle.getAttribute("aria-controls");
      const subnav = document.getElementById(subnavId);
      if (!subnav) return;

      navToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) closeSubnav(otherToggle);
      });

      subnav.hidden = false;
      toggle.setAttribute("aria-expanded", "true");

      window.requestAnimationFrame(() => {
        subnav.classList.add("is-open");
      });
    }

    function handleToggleClick(event) {
      const toggle = event.currentTarget;
      const subnavId = toggle.getAttribute("aria-controls");
      const subnav = document.getElementById(subnavId);
      const firstLink = subnav ? subnav.querySelector("a") : null;

      openSubnav(toggle);

      if (firstLink) {
        const href = firstLink.getAttribute("href");
        if (isMobile()) closeMobileMenu();
        navigate(href);
      }
    }

    function handleMobileMenuButtonClick() {
      const isOpen = verticalHeader.classList.contains("is-open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        closeMobileMenu();
        navToggles.forEach((toggle) => closeSubnav(toggle));
      }
    }

    function handleNavLinkClick() {
      if (isMobile()) closeMobileMenu();
    }

    function handleResize() {
      if (!isMobile()) closeMobileMenu();
    }

    navToggles.forEach((toggle) => toggle.addEventListener("click", handleToggleClick));
    if (mobileMenuButton) mobileMenuButton.addEventListener("click", handleMobileMenuButtonClick);
    if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);
    if (navigationBackdrop) navigationBackdrop.addEventListener("click", closeMobileMenu);
    document.addEventListener("keydown", handleKeydown);

    const navLinks = verticalHeader.querySelectorAll("a");
    navLinks.forEach((link) => link.addEventListener("click", handleNavLinkClick));

    window.addEventListener("resize", handleResize);

    verticalHeader.setAttribute("aria-hidden", isMobile() ? "true" : "false");

    // Open and highlight whichever group contains the current page.
    const currentPath = window.location.pathname.replace(/\/?$/, "/");
    navToggles.forEach((toggle) => {
      const subnavId = toggle.getAttribute("aria-controls");
      const subnav = document.getElementById(subnavId);
      if (!subnav) return;

      const hasActiveLink = Array.from(subnav.querySelectorAll("a")).some((link) => {
        const linkPath = (link.getAttribute("href") || "/").split("#")[0].replace(/\/?$/, "/");
        return linkPath === currentPath;
      });

      toggle.classList.toggle("nav-item--active", hasActiveLink);
      if (hasActiveLink) openSubnav(toggle);
    });

    return () => {
      navToggles.forEach((toggle) => toggle.removeEventListener("click", handleToggleClick));
      if (mobileMenuButton) mobileMenuButton.removeEventListener("click", handleMobileMenuButtonClick);
      if (mobileMenuClose) mobileMenuClose.removeEventListener("click", closeMobileMenu);
      if (navigationBackdrop) navigationBackdrop.removeEventListener("click", closeMobileMenu);
      document.removeEventListener("keydown", handleKeydown);
      navLinks.forEach((link) => link.removeEventListener("click", handleNavLinkClick));
      window.removeEventListener("resize", handleResize);
      closeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <>
      <header className="top-header">
        <Link className="mobile-header-logo" to="/" aria-label="Zaynich home">
          <img src="/assets/img/Zaynich Logo_white.svg" alt="Zaynich, cefepime and zidebactam for injection" />
        </Link>

        <p className="top-header__message">This site is for Healthcare Professionals Only.</p>

        <div className="top-header__links">
          <a href="/assets/pdfs/Zaynich_Final%20PI_C2C_PDF.pdf" target="_blank" rel="noopener noreferrer">
            Prescribing Information
          </a>
        </div>

        <button
          className="mobile-menu-button"
          id="mobileMenuButton"
          type="button"
          aria-label="Open navigation menu"
          aria-controls="verticalHeader"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className="navigation-backdrop" id="navigationBackdrop" aria-hidden="true"></div>

      <aside
        className="vertical-header"
        id="verticalHeader"
        ref={verticalHeaderRef}
        aria-label="Primary navigation"
        aria-hidden="false"
      >
        <div className="vertical-header__top">
          <Link className="brand" to="/" aria-label="Zaynich home">
            <img src="/assets/img/Zaynich logo_US.png" alt="Zaynich, cefepime and zidebactam for injection" />
          </Link>
        </div>

        <nav className="vertical-nav" aria-label="Main navigation">
          <Link className="nav-item" activeClassName="nav-item--active" to="/">
            <span className="nav-icon" aria-hidden="true">
              <img src="/assets/img/home-icon.svg" alt="" />
            </span>
            <span className="nav-label">Home</span>
          </Link>

          <div className="nav-group">
            <button
              className="nav-item nav-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="amrSubnav"
            >
              <span className="nav-icon" aria-hidden="true">
                <img src="/assets/img/burden-icon.svg" alt="" />
              </span>
              <span className="nav-label">Burden of Anti-Microbial Resistance</span>
              <span className="chevron" aria-hidden="true">
                ⌄
              </span>
            </button>

            <div className="subnav" id="amrSubnav" hidden>
              <Link to="/what-is-amr/" activeClassName="nav-item--active">What is AMR?</Link>
              <Link
                to="/what-is-amr/#amrRisk"
                className="js-section-link"
                activeClassName="nav-item--active"
                data-target="#amrRisk"
              >
                Risks &amp; Hospitalisation
              </Link>
            </div>
          </div>

          <div className="nav-group">
            <Link className="nav-item" activeClassName="nav-item--active" to="/the-zaynich-journey/">
              <span className="nav-icon" aria-hidden="true">
                <img src="/assets/img/journey-icon.svg" alt="" />
              </span>
              <span className="nav-label">The Zaynich<sup>TM</sup> Journey</span>
            </Link>
          </div>

          <div className="nav-group">
            <button
              className="nav-item nav-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="worksSubnav"
            >
              <span className="nav-icon" aria-hidden="true">
                <img src="/assets/img/how.svg" alt="" />
              </span>
              <span className="nav-label">How Zaynich<sup>TM</sup> Works?</span>
              <span className="chevron" aria-hidden="true">
                ⌄
              </span>
            </button>

            <div className="subnav" id="worksSubnav" hidden>
              <Link to="/broad-spectrum/" activeClassName="nav-item--active">Broad Spectrum</Link>
              <Link to="/mechanism-of-action/" activeClassName="nav-item--active">Mechanism of action</Link>
              <Link to="/dosage/" activeClassName="nav-item--active">Dosage</Link>
            </div>
          </div>

          <div className="nav-group">
            <button
              className="nav-item nav-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="testimonialsSubnav"
            >
              <span className="nav-icon" aria-hidden="true">
                <img src="/assets/img/clinical-icon.svg" alt="" />
              </span>
              <span className="nav-label">Clinical Data</span>
              <span className="chevron" aria-hidden="true">
                ⌄
              </span>
            </button>

            <div className="subnav" id="testimonialsSubnav" hidden>
              <Link to="/efficacy/" activeClassName="nav-item--active">Clinical Efficacy</Link>
              <Link to="/safety-profile/" activeClassName="nav-item--active">Safety Profile</Link>
              {/* <Link to="/compassionate-use/">Compassionate Use</Link> */}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
