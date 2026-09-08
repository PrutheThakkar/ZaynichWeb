import React, { useEffect, useRef } from "react";
import Swiper from "swiper/bundle";

const MOBILE_BREAKPOINT = 768;

/**
 * Home page "key information" cards. On mobile these become a swipeable
 * carousel; on desktop they lay out as a static grid via CSS. Ported from
 * js/home.js's createBenefitsSwiper.
 */
export default function BenefitsSwiper({ cards = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const swiperElement = container.querySelector(".benefits-swiper");
    if (!swiperElement) return undefined;

    let benefitsSwiper = null;

    function createBenefitsSwiper() {
      if (window.innerWidth <= MOBILE_BREAKPOINT && !benefitsSwiper) {
        benefitsSwiper = new Swiper(swiperElement, {
          slidesPerView: 1.2,
          spaceBetween: 16,
          speed: 650,
          autoHeight: false,
          autoplay: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: false },
          pagination: { el: container.querySelector(".benefits-pagination"), clickable: true },
          keyboard: { enabled: true, onlyInViewport: true },
          a11y: {
            enabled: true,
            prevSlideMessage: "Previous information card",
            nextSlideMessage: "Next information card",
            paginationBulletMessage: "Go to information card {{index}}",
          },
        });
      }

      if (window.innerWidth > MOBILE_BREAKPOINT && benefitsSwiper) {
        benefitsSwiper.destroy(true, true);
        benefitsSwiper = null;
      }
    }

    createBenefitsSwiper();

    let resizeTimer;
    function handleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(createBenefitsSwiper, 150);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (benefitsSwiper) benefitsSwiper.destroy(true, true);
    };
  }, []);

  return (
    <section className="zaynich-benefits" aria-labelledby="zaynichBenefitsTitle" ref={containerRef}>
      <div className="benefits-container">
        <h2 className="visually-hidden" id="zaynichBenefitsTitle">
          Zaynich key information
        </h2>

        <div className="swiper benefits-swiper">
          <div className="swiper-wrapper benefits-list">
            {cards.map((card, index) => (
              <article className="swiper-slide benefit-card" key={card.iconTitle || index}>
                <div className="benefit-icon">
                  <img src={card.icon?.node?.sourceUrl} alt={card.icon?.node?.altText || ""} aria-hidden="true" />
                </div>
                <div className="benefit-content">
                  <h3>{card.iconTitle}</h3>
                  <p dangerouslySetInnerHTML={{ __html: card.paragraph }} />
                </div>
              </article>
            ))}
          </div>
          <div className="swiper-pagination benefits-pagination" aria-label="Information slider pagination"></div>
        </div>
      </div>
    </section>
  );
}
