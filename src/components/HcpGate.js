import React, { useEffect, useRef, useState } from "react";
import "../styles/hcp-gate.scss";

const STORAGE_KEY = "zaynich_hcp_confirmed";

/**
 * Full-screen "Are you a Healthcare Professional?" gate shown once per
 * browser session. Mounted via wrapRootElement (gatsby-browser/gatsby-ssr)
 * so it persists across client-side page navigation instead of re-appearing
 * on every Link click.
 */
export default function HcpGate({ children }) {
  const [confirmed, setConfirmed] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    let stored = null;
    try {
      stored = window.sessionStorage.getItem(STORAGE_KEY);
    } catch (error) {
      stored = null;
    }
    if (stored === "true") setConfirmed(true);
  }, []);

  useEffect(() => {
    if (!confirmed && boxRef.current) boxRef.current.focus();
  }, [confirmed]);

  function handleYes() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    } catch (error) {
      // sessionStorage unavailable (private mode, etc.) — still let them in for this page view.
    }
    setConfirmed(true);
  }

  function handleNo() {
    window.location.href = "https://www.google.com";
  }

  return (
    <>
      {children}
      {!confirmed && (
        <div className="hcp-gate">
          <div
            className="hcp-gate__box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hcpGateTitle"
            tabIndex={-1}
            ref={boxRef}
          >
            <h2 id="hcpGateTitle">You are about to go to a site intended for US healthcare professionals.</h2>
            <p>Are you a US healthcare professional?</p>
            <div className="hcp-gate__actions">
              <button type="button" className="hcp-gate__btn hcp-gate__btn--yes" onClick={handleYes}>
                Yes, I am a US healthcare professional
              </button>
              <button type="button" className="hcp-gate__btn hcp-gate__btn--no" onClick={handleNo}>
                No, I am not a US healthcare professional
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
