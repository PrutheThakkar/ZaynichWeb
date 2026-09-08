import React from "react";
import useAnimatedProgress from "../hooks/useAnimatedProgress";

/**
 * Circular progress ring used in the "AMR Risk and Hospitalization" section.
 * Ported from js/amr-risk.js.
 */
export default function AmrRiskMetric({ progress, value, text, delay = 0 }) {
  const { ref: metricRef, progress: animation } = useAnimatedProgress({ delay });
  const circumference = 2 * Math.PI * 56;
  const percentage = Math.max(0, Math.min(progress, 100));
  const animatedLabel = String(value).replace(/\d+(?:\.\d+)?/, (number) => {
    const decimals = (number.split(".")[1] || "").length;
    return (Number(number) * animation).toFixed(decimals);
  });

  return (
    <article className="amr-risk-metric" data-progress={progress} ref={metricRef}>
      <div className="amr-risk-metric__circle">
        <svg className="amr-risk-metric__svg" viewBox="0 0 140 140" aria-hidden="true">
          <circle className="amr-risk-metric__track" cx="70" cy="70" r="56"></circle>
          <circle className="amr-risk-metric__progress" cx="70" cy="70" r="56" style={{ strokeDasharray: circumference, strokeDashoffset: circumference * (1 - percentage * animation / 100), transition: "none", opacity: animation === 0 ? 0 : 1 }}></circle>
        </svg>
        <h3 className="amr-risk-metric__value" aria-label={String(value)}><span aria-hidden="true">{animatedLabel}</span></h3>
      </div>
      <p className="amr-risk-metric__text">{text}</p>
    </article>
  );
}
