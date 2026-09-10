import React, { useEffect, useRef, useState } from "react";

/**
 * The R&D journey video: tries to autoplay WITH sound while in view, and
 * only falls back to muted autoplay + a click-to-enable-sound button if the
 * browser actually blocks unmuted autoplay (Chrome/Safari/Firefox all
 * refuse unmuted autoplay until the visitor has interacted with the page —
 * that's a browser policy, not something any code can force past).
 */
export default function JourneyVideo({ src, title }) {
  const videoRef = useRef(null);
  const [soundPromptVisible, setSoundPromptVisible] = useState(false);

  useEffect(() => {
    const journeyVideo = videoRef.current;
    if (!journeyVideo) return undefined;

    function attemptPlay() {
      // Try with sound first.
      journeyVideo.muted = false;
      const playPromise = journeyVideo.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Browser blocked unmuted autoplay — fall back to muted autoplay
          // and let the visitor turn sound on with one click.
          journeyVideo.muted = true;
          setSoundPromptVisible(true);
          journeyVideo.play().catch(() => {});
        });
      }
    }

    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          journeyVideo.pause();
        }
      },
      { threshold: 0.2 }
    );

    videoObserver.observe(journeyVideo);

    function handleCanPlay() {
      const videoPosition = journeyVideo.getBoundingClientRect();
      if (videoPosition.top < window.innerHeight && videoPosition.bottom > 0) {
        attemptPlay();
      }
    }

    journeyVideo.addEventListener("canplay", handleCanPlay, { once: true });

    return () => {
      videoObserver.disconnect();
      journeyVideo.removeEventListener("canplay", handleCanPlay);
    };
  }, [src]);

  function handlePlayButtonClick() {
    const journeyVideo = videoRef.current;
    if (!journeyVideo) return;
    journeyVideo.muted = false;
    journeyVideo.play().catch(() => {});
    setSoundPromptVisible(false);
  }

  return (
    <section className="journey-video" aria-label={title || "The Zaynich journey video"}>
      <video
        className="journey-video__player"
        id="journeyVideo"
        ref={videoRef}
        controls
        autoPlay
        playsInline
        preload="auto"
        src={src}
        aria-label={title || undefined}
      >
        Your browser does not support the video element.
      </video>

      <button
        className="journey-video__play-button"
        id="journeyVideoPlay"
        type="button"
        hidden={!soundPromptVisible}
        onClick={handlePlayButtonClick}
      >
        <span aria-hidden="true">🔊</span>
        Click to enable sound
      </button>
    </section>
  );
}
