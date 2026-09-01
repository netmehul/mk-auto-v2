import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RevealGroup, RevealItem } from "../Reveal";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { EMIRATES } from "./uae-map-data";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Pin = {
  name: string;
  city: string;
  emirate: string;
  lat: number;
  lng: number;
  loc: string;
};

/* ============================================================
   MKA LOCATIONS
   ============================================================ */

   const PINS: Pin[] = [
    {
      name: "Dongfeng Oasis Mall",
      city: "Sheikh Zayed Road - Dubai",
      emirate: "dubay",
      lat: 25.169749559580467,
      lng: 55.24067933459319,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  
    {
      name: "Dongfeng Deira",
      city: "Al Ittihad Road - Dubai",
      emirate: "dubay",
      lat: 25.27425701772772,
      lng: 55.34734670979811,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  
    {
      name: "Dongfeng Abu Dhabi",
      city: "Airport Road - Abu Dhabi",
      emirate: "abu-dhabi",
      lat: 24.487590085434004,
      lng: 54.354002428834875,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  
    {
      name: "Dongfeng Mussafah",
      city: "Al Kawakib Street, Mussafah - Abu Dhabi",
      emirate: "abu-dhabi",
      lat: 24.359651814461323,
      lng: 54.521003172966616,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  
    {
      name: "Omoda Jaecoo Abu Dhabi",
      city: "Airport Road - Abu Dhabi",
      emirate: "abu-dhabi",
      lat: 24.48478311581781,
      lng: 54.36026481949599,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  
    {
      name: "Omoda Jaecoo Mussafah",
      city: "Al Kawakib Street, Mussafah - Abu Dhabi",
      emirate: "abu-dhabi",
      lat: 24.485782862352053,
      lng: 54.362546920265984,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  
    {
      name: "Dongfeng Service Centre Al Quoz",
      city: "Al Quoz Third, Al Quoz - Dubai",
      emirate: "dubay",
      lat: 25.219987965545624,
      lng: 55.23515534956214,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  
    {
      name: "Dongfeng Service Centre Abu Dhabi",
      city: "Al Kawakib Street, Mussafah - Abu Dhabi",
      emirate: "abu-dhabi",
      lat: 24.359283982690457,
      lng: 54.49389557116512,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  
    {
      name: "Omoda Jaecoo Service Centre Abu Dhabi",
      city: "Al Kawakib Street, Mussafah - Abu Dhabi",
      emirate: "abu-dhabi",
      lat: 24.41405261941151,
      lng: 54.51829541827092,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  
    {
      name: "Omoda Jaecoo Service Centre Dubai",
      city: "Al Quoz Third, Al Quoz - Dubai",
      emirate: "dubay",
      lat: 25.21731549511586,
      lng: 55.236204137079554,
      loc: "https://maps.app.goo.gl/Hr5gCEHK5B25s2Au6"
    },
  ];

  const UAE_BOUNDS = {
    minLng: 51.5,
    maxLng: 56.4,
    minLat: 22.6,
    maxLat: 26.3,
  };
  
  function geoToSvg(lat: number, lng: number) {
    const x =
      ((lng - UAE_BOUNDS.minLng) /
        (UAE_BOUNDS.maxLng - UAE_BOUNDS.minLng)) *
      100;
  
    const y =
      ((UAE_BOUNDS.maxLat - lat) /
        (UAE_BOUNDS.maxLat - UAE_BOUNDS.minLat)) *
      100;
  
    return {
      x,
      y,
    };
  }


/* ============================================================
   MAP LABELS
   ============================================================ */

const LABELS: { text: string; x: number; y: number }[] = [
  {
    text: "Abu Dhabi",
    x: 42,
    y: 62,
  },
  {
    text: "Dubai",
    x: 71.5,
    y: 32.5,
  },
  {
    text: "Sharjah",
    x: 79.5,
    y: 27.5,
  },
  {
    text: "Ras Al Khaimah",
    x: 88,
    y: 6,
  },
  {
    text: "Fujairah",
    x: 92,
    y: 27,
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */

export function BrandLocations() {
  const root = useRef<HTMLElement>(null);

  const [active, setActive] = useState<string | null>(null);

  const activePin =
    PINS.find((pin) => pin.name === active) ?? null;

  /* ==========================================================
     GSAP ANIMATIONS
     ========================================================== */

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      /* --------------------------------------------------------
         UAE MAP REVEAL
         -------------------------------------------------------- */

      gsap.fromTo(
        ".map-shape",
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            once: true,
          },
        },
      );

      /* --------------------------------------------------------
         LOCATION PIN REVEAL
         -------------------------------------------------------- */

      gsap.fromTo(
        ".map-pin",
        {
          y: -18,
          opacity: 0,
          scale: 0.5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          delay: 0.35,
          stagger: 0.08,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            once: true,
          },

          onComplete: () => {
            gsap.to(".map-pin-pulse", {
              scale: 2.6,
              opacity: 0,
              duration: 2,
              ease: "power2.out",
              repeat: -1,
              stagger: 0.28,
            });
          },
        },
      );
    },
    {
      scope: root,
    },
  );

  return (
    <section
      ref={root}
      id="locations"
      aria-labelledby="locations-title"
      className="section-y bg-off-white text-ink"
    >
      <div className="shell">

        {/* ====================================================
            SECTION HEADER
            ==================================================== */}

        <RevealGroup className="w-full">
          <RevealItem>
            <h2
              id="locations-title"
              className="h2-display mt-7 uppercase text-navy-900"
            >
              Connecting you across the UAE
            </h2>
          </RevealItem>

          <RevealItem
            as="p"
            className="mt-6 w-auto text-[17px] leading-[1.7] text-ink/65"
          >
            Showrooms and service centres are shown below.
          </RevealItem>
        </RevealGroup>

        {/* ====================================================
            MAP + LOCATIONS
            ==================================================== */}

        <div className="mt-14 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">

          {/* ==================================================
              UAE MAP
              ================================================== */}

          <div className="relative lg:col-span-7">

            <div className="relative w-full">

              <div
                className="relative w-full"
                style={{
                  aspectRatio: "1000 / 700",
                }}
              >

                <svg
                  viewBox="0 0 1000 700"
                  role="img"
                  aria-label="Map of the United Arab Emirates showing MKA locations"
                  className="absolute inset-0 h-full w-full overflow-visible"
                >

                  {/* ==========================================
                      MAP SHADOW
                      ========================================== */}

                  <defs>
                    <filter
                      id="uae-shadow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="10"
                        stdDeviation="14"
                        floodColor="var(--mka-navy-900)"
                        floodOpacity="0.14"
                      />
                    </filter>
                  </defs>

                  {/* ==========================================
                      EMIRATES
                      ========================================== */}

                  <g filter="url(#uae-shadow)">
                    {EMIRATES.map((em) => {
                      const isActive =
                        activePin?.emirate === em.id;

                      return (
                        <path
                          key={em.id}
                          className="map-shape transition-[fill,stroke] duration-500"
                          d={em.d}
                          fill="var(--mka-navy-900)"
                          fillOpacity={
                            isActive ? 0.92 : 0.08
                          }
                          stroke="var(--mka-navy-900)"
                          strokeOpacity={
                            isActive ? 0.9 : 0.35
                          }
                          strokeWidth="1.25"
                          strokeLinejoin="round"
                        />
                      );
                    })}
                  </g>

                  {/* ==========================================
                      EMIRATE LABELS
                      ========================================== */}

                  {LABELS.map((label) => (
                    <text
                      key={label.text}
                      x={(label.x / 100) * 1000}
                      y={(label.y / 100) * 700}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      fill="var(--mka-navy-900)"
                      fillOpacity="0.4"
                      fontSize="17"
                      letterSpacing="3"
                      style={{
                        fontFamily:
                          "var(--font-display, inherit)",
                        textTransform: "uppercase",
                      }}
                    >
                      {label.text.toUpperCase()}
                    </text>
                  ))}
                </svg>

                {/* =================================================
                    LOCATION PINS
                    ================================================= */}

{PINS.map((pin) => {
  const position = geoToSvg(pin.lat, pin.lng);

  return (
    <button
      key={pin.name}
      type="button"
      className="map-pin absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      onMouseEnter={() => setActive(pin.name)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(pin.name)}
      onBlur={() => setActive(null)}
      onClick={() =>
        setActive((value) =>
          value === pin.name ? null : pin.name,
        )
      }
      aria-label={`${pin.name}, ${pin.city}`}
    >
      <span className="relative block h-2.5 w-2.5">
        <span className="map-pin-pulse absolute inset-0 rounded-full bg-gold opacity-50" />

        <span
          className={`absolute inset-0 rounded-full ring-2 ring-white transition-transform duration-300 ${
            active === pin.name
              ? "scale-150 bg-gold"
              : "bg-gold"
          }`}
        />
      </span>

      {active === pin.name && (
        <span className="pointer-events-none absolute left-1/2 top-4 z-10 w-max max-w-[220px] -translate-x-1/2 border border-grey-200 bg-white px-3 py-2 text-left shadow-lg">
          <span className="block font-display text-xs uppercase tracking-[0.12em] text-navy-900">
            {pin.name}
          </span>

          <span className="mt-1 block text-xs text-grey-500">
            {pin.city}
          </span>
        </span>
      )}
    </button>
  );
})}

              </div>
            </div>
          </div>

          {/* ==================================================
              LOCATION LIST
              ================================================== */}

          <RevealGroup className="lg:col-span-5">

            <ul
              className="
                divide-y
                divide-grey-200
                border-y
                border-grey-200
              "
            >

              {PINS.map((pin) => (
                <RevealItem
                  as="li"
                  key={pin.name}
                >

                  <button
                    type="button"
                    onMouseEnter={() =>
                      setActive(pin.name)
                    }
                    onMouseLeave={() =>
                      setActive(null)
                    }
                    onFocus={() =>
                      setActive(pin.name)
                    }
                    onBlur={() =>
                      setActive(null)
                    }
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-4
                      py-4
                      text-left
                      transition-colors
                      ${
                        active === pin.name
                          ? "text-gold"
                          : "hover:text-gold"
                      }
                    `}
                  >

                    {/* =======================================
                        LOCATION DETAILS
                        ======================================= */}

                    <span>

                      <span
                        className="
                          block
                          font-display
                          text-sm
                          uppercase
                          tracking-[0.1em]
                          text-navy-900
                        "
                      >
                        {pin.name}
                      </span>

                      <span
                        className="
                          mt-1
                          block
                          text-sm
                          text-ink/55
                        "
                      >
                        {pin.city}
                      </span>

                    </span>

                    {/* =======================================
                        GOLD INDICATOR
                        ======================================= */}
                    <a
                      href={pin.loc}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowRight strokeWidth={1} />
                    </a>

                  </button>

                </RevealItem>
              ))}

            </ul>

          </RevealGroup>

        </div>
      </div>
    </section>
  );
}