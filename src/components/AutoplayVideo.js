import React, { useEffect, useRef, useState } from "react";

/**
 * Tries to autoplay a video WITH sound while it's in view, and only falls
 * back to muted autoplay + a click-to-enable-sound button if the browser
 * actually blocks unmuted autoplay (Chrome/Safari/Firefox all refuse
 * unmuted autoplay until the visitor has interacted with the page — that's
 * a browser policy, not something any code can force past). Shared logic
 * behind JourneyVideo; reusable anywhere a video should try to play itself.
 */
export default function AutoplayVideo({ src, id, className, wrapperClassName, ariaLabel }) {
  const videoRef = useRef(null);
  const [soundPromptVisible, setSoundPromptVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    function attemptPlay() {
      // Try with sound first.
      video.muted = false;
      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Browser blocked unmuted autoplay — fall back to muted autoplay
          // and let the visitor turn sound on with one click.
          video.muted = true;
          setSoundPromptVisible(true);
          video.play().catch(() => {});
        });
      }
    }

    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    videoObserver.observe(video);

    function handleCanPlay() {
      const videoPosition = video.getBoundingClientRect();
      if (videoPosition.top < window.innerHeight && videoPosition.bottom > 0) {
        attemptPlay();
      }
    }

    video.addEventListener("canplay", handleCanPlay, { once: true });

    return () => {
      videoObserver.disconnect();
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  function handlePlayButtonClick() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});
    setSoundPromptVisible(false);
  }

  return (
    <div className={`autoplay-video${wrapperClassName ? ` ${wrapperClassName}` : ""}`} aria-label={ariaLabel}>
      <video
        className={`autoplay-video__player${className ? ` ${className}` : ""}`}
        id={id}
        ref={videoRef}
        controls
        autoPlay
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video element.
      </video>

      <button
        className="autoplay-video__play-button"
        type="button"
        hidden={!soundPromptVisible}
        onClick={handlePlayButtonClick}
      >
        <span aria-hidden="true">🔊</span>
        Click to enable sound
      </button>
    </div>
  );
}
