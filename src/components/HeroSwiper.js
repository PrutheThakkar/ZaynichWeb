import React, { useEffect, useRef } from "react";
import Swiper from "swiper/bundle";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

/**
 * The home-page bacteria hero rotator: a Swiper fade carousel plus a
 * "brand-logo" entrance animation on the active slide, and a light-flicker
 * transition class on slide change. Ported from the inline script in
 * index.html (the most complete of the two hero-swiper implementations in
 * the original source).
 */
export default function HeroSwiper({ slides = [] }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const customHero = heroRef.current;
    if (!customHero) return undefined;

    const swiperElement = customHero.querySelector(".bacteria-hero-swiper");
    if (!swiperElement) return undefined;

    const paginationElement = customHero.querySelector(".bacteria-hero-pagination");
    const realSlides = customHero.querySelectorAll(".swiper-wrapper > .swiper-slide");
    const slideCount = realSlides.length;

    if (!slideCount) return undefined;

    let lightTimer = null;
    let switchingTimer = null;
    let completeTimer = null;

    function clearAnimationTimers() {
      window.clearTimeout(lightTimer);
      window.clearTimeout(switchingTimer);
      window.clearTimeout(completeTimer);
      lightTimer = null;
      switchingTimer = null;
      completeTimer = null;
    }

    function resetTransitionClasses() {
      customHero.classList.remove("light-off", "switching");
    }

    function startTransitionEffect() {
      clearAnimationTimers();
      resetTransitionClasses();
      void customHero.offsetWidth;
      customHero.classList.add("light-off", "switching");

      lightTimer = window.setTimeout(() => customHero.classList.remove("switching"), 700);
      switchingTimer = window.setTimeout(() => customHero.classList.remove("light-off"), 1000);
      completeTimer = window.setTimeout(resetTransitionClasses, 1300);
    }

    function playActiveLogoAnimation(swiper) {
      const logos = customHero.querySelectorAll(".brand-logo");
      logos.forEach((logo) => logo.classList.remove("is-animating"));

      window.requestAnimationFrame(() => {
        const activeSlide = swiper.slides && swiper.slides[swiper.activeIndex];
        const activeLogo = activeSlide
          ? activeSlide.querySelector(".brand-logo")
          : customHero.querySelector(".bacteria-hero-swiper .swiper-slide-active .brand-logo");

        if (!activeLogo) return;
        void activeLogo.offsetWidth;
        activeLogo.classList.add("is-animating");
      });
    }

    function restartAutoplay(swiper) {
      if (!swiper || swiper.destroyed || !swiper.autoplay || document.hidden) return;
      swiper.update();
      if (swiper.autoplay.paused && typeof swiper.autoplay.resume === "function") {
        swiper.autoplay.resume();
      }
      if (!swiper.autoplay.running) swiper.autoplay.start();
    }

    function stopAutoplay(swiper) {
      if (!swiper || swiper.destroyed || !swiper.autoplay) return;
      if (swiper.autoplay.running) swiper.autoplay.stop();
    }

    const heroSwiper = new Swiper(swiperElement, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: slideCount > 1,
      loopAdditionalSlides: 1,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 900,
      autoplay:
        slideCount > 1
          ? { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: false, waitForTransition: true }
          : false,
      pagination: { el: paginationElement, clickable: true },
      keyboard: { enabled: true, onlyInViewport: true },
      watchOverflow: true,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      on: {
        init(swiper) {
          window.requestAnimationFrame(() => {
            playActiveLogoAnimation(swiper);
            restartAutoplay(swiper);
          });
        },
        slideChangeTransitionStart(swiper) {
          startTransitionEffect();
          playActiveLogoAnimation(swiper);
        },
        slideChangeTransitionEnd(swiper) {
          restartAutoplay(swiper);
        },
        touchEnd(swiper) {
          window.setTimeout(() => restartAutoplay(swiper), 100);
        },
        imagesReady(swiper) {
          swiper.update();
          restartAutoplay(swiper);
        },
        beforeDestroy() {
          clearAnimationTimers();
          resetTransitionClasses();
        },
      },
    });

    function handleVisibilityChange() {
      if (document.hidden) {
        stopAutoplay(heroSwiper);
      } else {
        window.setTimeout(() => restartAutoplay(heroSwiper), 120);
      }
    }

    function handleFocus() {
      window.setTimeout(() => restartAutoplay(heroSwiper), 120);
    }

    let resizeTimer;
    function handleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (heroSwiper && !heroSwiper.destroyed) {
          heroSwiper.update();
          restartAutoplay(heroSwiper);
        }
      }, 180);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("resize", handleResize);

    let recoveryTimer = window.setInterval(() => restartAutoplay(heroSwiper), 3000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("resize", handleResize);
      window.clearInterval(recoveryTimer);
      clearAnimationTimers();
      if (heroSwiper && !heroSwiper.destroyed) heroSwiper.destroy(true, true);
    };
  }, []);

  return (
    <section className="custom-red-div hero-stage bacteria-hero-rotator" aria-label="Zaynich hero banner" ref={heroRef}>
      <div className="swiper bacteria-hero-swiper">
        <div className="swiper-wrapper">
          {slides.map((slide, index) => {
            const bannerImage = slide?.bannerImage?.node?.gatsbyImage;

            return (
              <div className="swiper-slide bacteria-hero-slide" key={index}>
                {bannerImage && (
                  <GatsbyImage
                    image={bannerImage}
                    alt={slide?.bannerImage?.node?.altText || "Zaynich bacteria visual"}
                    className="bacteria-img-bg"
                    imgClassName="bacteria-img"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                )}
                <div className="brand-logo">
                  <div className="brand-logo__text">
                    <p className="brand-logo__heading">
                      <span className="brand-logo__name">ZAYNICH<sup>TM</sup></span> IS COMING
                    </p>
                    <p className="brand-logo__subtitle">cefepime and zidebactam</p>
                    <p className="brand-logo__tagline">For Injection (3g)</p>
                  </div>
                  <Link to="/mechanism-of-action/" className="hero-cta">
                    Explore the Science
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bacteria-hero-pagination"></div>

      <div className="hero-transition-overlay" aria-hidden="true"></div>
    </section>
  );
}
