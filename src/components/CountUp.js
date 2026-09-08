import React from "react";
import useAnimatedProgress from "../hooks/useAnimatedProgress";

/**
 * Reusable count-up number, ported from js/amr-counter.js. Animates from
 * `start` to `count` once the element scrolls into view.
 */
export default function CountUp({
  count,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = false,
  duration = 1800,
  start = 0,
  className,
  as: Tag = "p",
}) {
  const { ref: elementRef, progress } = useAnimatedProgress({ duration });

  function formatCount(value) {
    let formattedValue;
    if (separator) {
      formattedValue = value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } else {
      formattedValue = value.toFixed(decimals);
    }
    return prefix + formattedValue + suffix;
  }

  return (
    <Tag className={className} ref={elementRef} aria-label={formatCount(count)}>
      <span aria-hidden="true">{formatCount(start + (count - start) * progress)}</span>
    </Tag>
  );
}
