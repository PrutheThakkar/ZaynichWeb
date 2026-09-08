import { useEffect, useRef, useState } from "react";

/** One viewport-triggered clock keeps the number and its ring in sync. */
export default function useAnimatedProgress({ duration = 1800, delay = 0 } = {}) {
  const ref = useRef(null);
  // Keep final values readable in server-rendered HTML and without JavaScript.
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame;
    let timer;
    let observer;
    let started = false;
    let disposed = false;

    function finish() {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      observer?.disconnect();
      setProgress(1);
    }
    function begin() {
      if (started || disposed) return;
      started = true;
      observer?.disconnect();
      timer = window.setTimeout(() => {
        if (disposed) return;
        const startTime = performance.now();
        function tick(time) {
          if (disposed) return;
          const elapsed = Math.min((time - startTime) / duration, 1);
          setProgress(1 - Math.pow(1 - elapsed, 3));
          if (elapsed < 1) frame = window.requestAnimationFrame(tick);
        }
        frame = window.requestAnimationFrame(tick);
      }, delay);
    }
    function onMotionChange() {
      if (motion.matches) finish();
    }

    if (motion.matches || duration <= 0 || !("IntersectionObserver" in window)) {
      setProgress(1);
      return undefined;
    }
    setProgress(0);
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) begin();
    }, { threshold: 0.3, rootMargin: "0px 0px -5% 0px" });
    observer.observe(element);
    motion.addEventListener("change", onMotionChange);
    return () => {
      disposed = true;
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [duration, delay]);

  return { ref, progress };
}
