import React from "react";
import { Link } from "gatsby";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <a
            className="site-footer__logo"
            href="https://www.wockhardt.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Wockhardt website"
          >
            <img src="/assets/img/wockhardt-logo-new.svg" alt="Wockhardt" />
          </a>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <Link to="/sitemap/">Sitemap</Link>
            <a href="/assets/pdfs/Zaynich_Final%20PI_C2C_PDF.pdf" target="_blank" rel="noopener noreferrer">
              Prescribing Information
            </a>
          </nav>
        </div>

        <div className="site-footer__legal">
          <p>ZAYNICH<sup>TM</sup> is a trademark of Wockhardt Bio AG © 2026 Wockhardt Bio AG. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
