import React, { useEffect, useRef } from "react";

/**
 * Ported from js/safety-bar.js. Fixed indication-and-usage summary bar that
 * hides once the full "Important Safety Information" section (#zaynichSafety)
 * scrolls into view.
 */
export default function SafetyBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const safetyBar = barRef.current;
    const safetySection =
      document.getElementById("zaynichSafety") || document.querySelector(".zaynich-safety");
    const scrollButton = document.getElementById("safetyScrollButton");
    const toggleButton = document.getElementById("safetyPreviewToggle");
    const preview = document.getElementById("safetyPreview");

    if (!safetyBar || !safetySection || !scrollButton || !toggleButton || !preview) {
      return undefined;
    }

    function openPreview() {
      preview.hidden = false;
      safetyBar.classList.add("is-expanded");
      toggleButton.setAttribute("aria-expanded", "true");
      toggleButton.setAttribute("aria-label", "Hide indication and usage summary");
    }

    function closePreview() {
      preview.hidden = true;
      safetyBar.classList.remove("is-expanded");
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.setAttribute("aria-label", "Show indication and usage summary");
    }

    function handleToggleClick(event) {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = toggleButton.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closePreview();
      } else {
        openPreview();
      }
    }

    function handleScrollButtonClick() {
      closePreview();
      safetySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function updateBarVisibility() {
      const safetyPosition = safetySection.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const safetySectionReached = safetyPosition.top <= viewportHeight * 0.9;

      if (safetySectionReached) {
        safetyBar.classList.add("is-hidden");
        closePreview();
      } else {
        safetyBar.classList.remove("is-hidden");
      }
    }

    let ticking = false;
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateBarVisibility();
        ticking = false;
      });
    }

    toggleButton.addEventListener("click", handleToggleClick);
    scrollButton.addEventListener("click", handleScrollButtonClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateBarVisibility);

    openPreview();
    updateBarVisibility();

    return () => {
      toggleButton.removeEventListener("click", handleToggleClick);
      scrollButton.removeEventListener("click", handleScrollButtonClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBarVisibility);
    };
  }, []);

  return (
    <aside className="safety-jump-bar" id="safetyJumpBar" ref={barRef} aria-label="Approved use and safety information">
      <div className="safety-jump-bar__preview" id="safetyPreview" hidden>
        <div className="safety-jump-bar__preview-content">
          <h2>ZAYNICH™ (cefepime and zidebactam) for Injection</h2>
          <h3>Indication and Usage</h3>
          <h4>Complicated Urinary Tract Infections, Including Pyelonephritis</h4>
          <ul>
            <li>
              ZAYNICH™ is indicated for the treatment of adult patients with complicated urinary tract
              infections (cUTI), including pyelonephritis caused by the following susceptible microorganisms:{" "}
              <em>Escherichia coli</em>, <em>Klebsiella pneumoniae</em>, <em>Proteus mirabilis</em>,{" "}
              <em>Enterobacter cloacae</em> complex, and <em>Pseudomonas aeruginosa</em>.
            </li>
          </ul>
        </div>
      </div>

      <div className="safety-jump-bar__main">
        <button className="safety-jump-bar__link" id="safetyScrollButton" type="button">
          Click or scroll to see ZAYNICH™ (cefepime and zidebactam) for Injection, INCLUDING BOXED WARNING, AND
          APPROVED USE
        </button>

        <button
          className="safety-jump-bar__toggle"
          id="safetyPreviewToggle"
          type="button"
          aria-expanded="false"
          aria-controls="safetyPreview"
          aria-label="Show indication and usage summary"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </aside>
  );
}
