import React, { useEffect, useRef } from "react";
import Swiper from "swiper/bundle";

const SLIDES = [
  {
    desktop: "/assets/img/Zaynivch What-is-amr.jpg",
    mobile: "/assets/img/Zaynivch-Banners-16.jpg",
    alt: "Zaynich banner slide two",
    lazy: true,
  },
  {
    desktop: "/assets/img/Zaynivch W Banners-13.jpg",
    mobile: "/assets/img/Zaynivch-M-Banners-19.jpg",
    alt: "Zaynich antimicrobial resistance page banner",
    eager: true,
  },
];

/**
 * The two-slide banner used only on "The Zaynich Journey" page. Ported from
 * js/hero.js's initInsideBannerSwiper.
 */
export default function JourneyBannerSwiper() {
  const bannerRef = useRef(null);

  useEffect(() => {
    const insideBanner = bannerRef.current;
    if (!insideBanner) return undefined;

    const slides = insideBanner.querySelectorAll(".swiper-wrapper > .swiper-slide");
    const slideCount = slides.length;
    if (!slideCount) return undefined;

    const paginationElement = insideBanner.querySelector(".inside-banner__pagination");

    const swiper = new Swiper(insideBanner, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: slideCount > 1,
      effect: "fade",
      fadeEffect: { crossFade: true },
      speed: 900,
      autoplay: slideCount > 1 ? { delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true } : false,
      pagination: slideCount > 1 && paginationElement ? { el: paginationElement, clickable: true } : false,
      keyboard: { enabled: true, onlyInViewport: true },
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      a11y: {
        enabled: true,
        prevSlideMessage: "Previous banner",
        nextSlideMessage: "Next banner",
        paginationBulletMessage: "Go to banner slide {{index}}",
      },
    });

    return () => {
      if (swiper && !swiper.destroyed) swiper.destroy(true, true);
    };
  }, []);

  return (
    <section className="inside-banner swiper" id="insideBanner" aria-label="Zaynich page banners" ref={bannerRef}>
      <div className="swiper-wrapper">
        {SLIDES.map((slide) => (
          <div className="inside-banner__slide swiper-slide" key={slide.desktop}>
            <picture className="inside-banner__media">
              <source media="(max-width: 768px)" srcSet={slide.mobile} />
              <img
                className="inside-banner__image"
                src={slide.desktop}
                alt={slide.alt}
                loading={slide.lazy ? "lazy" : undefined}
                fetchpriority={slide.eager ? "high" : undefined}
              />
            </picture>
            <div className="inside-banner__overlay" aria-hidden="true"></div>
            <div className="inside-banner__content"></div>
          </div>
        ))}
      </div>
      <div className="inside-banner__pagination swiper-pagination"></div>
    </section>
  );
}
