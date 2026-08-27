import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { RevealGroup, RevealItem } from "./Reveal";
import {
  prefersReducedMotion,
  isMobileViewport,
} from "@/lib/motion-prefs";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const BRANDS = [
  {
    name: "Dongfeng",
    note: "Passenger & commercial vehicles",
    image: "/brands/dongfeng-lineup.webp",
    logo: "/brands/dongfeng-logo.svg",
  },
  {
    name: "Omoda | Jaecoo",
    note: "Design-led & off-road premium SUVs",
    image: "/brands/oj-lineup.webp",
    logo: "/brands/omoda-jaecoo.svg",
  },
  {
    name: "Pre-Owned",
    note: "Quality vehicles, ready for their next journey",
    image: "/brands/preowned-lineup.webp",
    logo: "/brands/certified-pre-owned.svg",
  },
];

export function Brands() {
  const root = useRef<HTMLElement>(null);
  const [activeBrand, setActiveBrand] = useState(0);

  // ============================================================
  // BRAND CARD PARALLAX
  // ============================================================

  useGSAP(
    () => {
      if (prefersReducedMotion() || isMobileViewport()) return;

      gsap.utils
        .toArray<HTMLElement>(".brand-tile")
        .forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              y: 40 * (i + 1) * 0.6,
            },
            {
              y: -30 * (i + 1) * 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
    },
    {
      scope: root,
    },
  );

  // ============================================================
  // AUTOMATIC SLIDER
  // ============================================================

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveBrand((current) => {
        return (current + 1) % BRANDS.length;
      });
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // ============================================================
  // SELECT BRAND
  // ============================================================

  const handleBrandSelect = (index: number) => {
    setActiveBrand(index);
  };

  return (
    <section
      ref={root}
      id="our-brands"
      aria-labelledby="brands-title"
      className="
        relative
        overflow-hidden
        bg-navy-900
        section-y
      "
    >
      <div className="shell relative">

        {/* ======================================================
            INTRO
            ====================================================== */}

        <RevealGroup className="max-w-4xl">

          <RevealItem>
            <h2
              id="brands-title"
              className="h2-display mt-7 uppercase text-off-white"
            >
              Official UAE distributor for three global marques.
            </h2>
          </RevealItem>

          <RevealItem
            as="p"
            className="
              mt-6
              max-w-[60ch]
              text-[17px]
              leading-[1.7]
              text-off-white/70
            "
          >
            Each brand is supported end-to-end by MKA sales,
            aftersales, genuine parts and warranty under one
            accountable group.
          </RevealItem>
        </RevealGroup>


        {/* ======================================================
            IMAGE SLIDER
            ====================================================== */}

        <RevealGroup className="mt-14">
          <RevealItem>
            <div
              className="
                relative
                aspect-[8/3]
                w-full
                overflow-hidden
                border
                border-off-white/12
                bg-black
              "
            >

              {/* ==================================================
                  SLIDES
                  ================================================== */}

              {BRANDS.map((brand, index) => (
                <div
                  key={brand.name}
                  className={`
                    absolute
                    inset-0
                    transition-opacity
                    duration-700
                    ease-in-out

                    ${
                      index === activeBrand
                        ? "z-10 opacity-100"
                        : "z-0 opacity-0"
                    }
                  `}
                >
                  <img
                    src={brand.image}
                    alt={`${brand.name} lineup`}
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                    "
                    draggable={false}
                  />
                </div>
              ))}

              {/* ==================================================
                  IMAGE GRADIENT
                  ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  z-20
                  h-1/3
                  bg-gradient-to-t
                  from-black/50
                  to-transparent
                "
              />

              {/* ==================================================
                  ACTIVE BRAND NAME
                  ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-5
                  left-5
                  z-30
                  max-w-[70%]
                "
              >
                <span
                  className="
                    text-xs
                    uppercase
                    tracking-[0.16em]
                    text-white/80
                  "
                >
                  {BRANDS[activeBrand].name}
                </span>
              </div>

              {/* ==================================================
                  SLIDER INDICATORS
                  ================================================== */}

              <div
                className="
                  absolute
                  bottom-5
                  right-5
                  z-30
                  flex
                  items-center
                  gap-2
                "
              >
                {BRANDS.map((brand, index) => (
                  <button
                    key={brand.name}
                    type="button"
                    aria-label={`Show ${brand.name}`}
                    aria-current={
                      index === activeBrand
                        ? "true"
                        : undefined
                    }
                    onClick={() => handleBrandSelect(index)}
                    className="
                      group
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className={`
                        block
                        h-px
                        transition-all
                        duration-300

                        ${
                          index === activeBrand
                            ? "w-8 bg-white"
                            : "w-4 bg-white/40 group-hover:w-6 group-hover:bg-white"
                        }
                      `}
                    />
                  </button>
                ))}
              </div>

            </div>
          </RevealItem>
        </RevealGroup>


        {/* ======================================================
            BRAND CARDS
            ====================================================== */}

        <RevealGroup
          className="
            mt-8
            grid
            gap-px
            border
            border-off-white/12
            bg-off-white/12

            md:grid-cols-3
          "
        >
          {BRANDS.map((brand, index) => {
            const isActive = index === activeBrand;

            return (
              <RevealItem
                key={brand.name}
                className="brand-tile"
              >
                <button
                  type="button"
                  onClick={() => handleBrandSelect(index)}
                  aria-pressed={isActive}
                  className={`
                    group
                    flex
                    h-full
                    min-h-[80px]
                    w-full
                    flex-col
                    p-2
                    transition-colors
                    duration-500
                    ${
                      isActive
                        ? "bg-navy-800"
                        : "bg-navy-900 hover:bg-navy-800"
                    }
                  `}
                >

                  {/* ==================================================
                      LOGO
                      ================================================== */}

                  <div
                    className="
                      flex
                      min-h-[70px]
                      items-center
                      justify-center
                    "
                  >
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="
                        block
                        max-h-[68px]
                        w-auto
                        opacity-90
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                      draggable={false}
                    />
                  </div>

                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>

      </div>
    </section>
  );
}