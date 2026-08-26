import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow, RevealGroup, RevealItem } from "../Reveal";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { EMIRATES } from "./uae-map-data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Pin = { name: string; city: string; emirate: string; x: number; y: number };

const PINS: Pin[] = [
  { name: "MKA Dubai Flagship", city: "Sheikh Zayed Road, Dubai", emirate: "dubay", x: 73.0, y: 26.64 },
  { name: "MKA Al Quoz Service", city: "Al Quoz, Dubai", emirate: "dubay", x: 72.3, y: 28.11 },
  { name: "MKA Sharjah", city: "Industrial Area, Sharjah", emirate: "sharjah", x: 75.58, y: 23.21 },
  { name: "MKA Ajman", city: "Al Jurf, Ajman", emirate: "ajman", x: 77.18, y: 20.69 },
  { name: "MKA Ras Al Khaimah", city: "Al Nakheel, Ras Al Khaimah", emirate: "ras-al-khaymah", x: 84.98, y: 10.3 },
  { name: "MKA Abu Dhabi", city: "Mussafah, Abu Dhabi", emirate: "abu-dhabi", x: 59.28, y: 50.27 },
  { name: "MKA Al Ain", city: "Sanaiya, Al Ain", emirate: "abu-dhabi", x: 80.54, y: 54.43 },
];

const LABELS: { text: string; x: number; y: number }[] = [
  { text: "Abu Dhabi", x: 42, y: 62 },
  { text: "Dubai", x: 71.5, y: 32.5 },
  { text: "Sharjah", x: 79.5, y: 27.5 },
  { text: "Ras Al Khaimah", x: 88, y: 6 },
  { text: "Fujairah", x: 92, y: 27 },
];

export function BrandLocations() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const activePin = PINS.find((p) => p.name === active) ?? null;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        ".map-shape",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        },
      );

      gsap.fromTo(
        ".map-pin",
        { y: -18, opacity: 0, scale: 0.5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          delay: 0.35,
          stagger: 0.08,
          ease: "back.out(2)",
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
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
    { scope: root },
  );

  return (
    <section ref={root} id="locations" aria-labelledby="locations-title" className="section-y bg-off-white text-ink">
      <div className="shell">
        <RevealGroup className="w-full">
          <RevealItem>
            <h2 id="locations-title" className="h2-display mt-7 uppercase text-navy-900">
              A network across seven emirates.
            </h2>
          </RevealItem>
          <RevealItem as="p" className="mt-6 w-auto text-[17px] leading-[1.7] text-ink/65">
            Showroom and service locations shown below are placeholders until the final network list is
            confirmed.
          </RevealItem>
        </RevealGroup>

        <div className="mt-14 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-7">
            <div className="relative w-full">
              <div className="relative w-full" style={{ aspectRatio: "1000 / 700" }}>
                <svg
                  viewBox="0 0 1000 700"
                  role="img"
                  aria-label="Map of the United Arab Emirates showing MKA locations"
                  className="absolute inset-0 h-full w-full overflow-visible"
                >
                  <defs>
                    <filter id="uae-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="var(--mka-navy-900)" floodOpacity="0.14" />
                    </filter>
                  </defs>

                  <g filter="url(#uae-shadow)">
                    {EMIRATES.map((em) => {
                      const isActive = activePin?.emirate === em.id;
                      return (
                        <path
                          key={em.id}
                          className="map-shape transition-[fill,stroke] duration-500"
                          d={em.d}
                          fill="var(--mka-navy-900)"
                          fillOpacity={isActive ? 0.92 : 0.08}
                          stroke="var(--mka-navy-900)"
                          strokeOpacity={isActive ? 0.9 : 0.35}
                          strokeWidth="1.25"
                          strokeLinejoin="round"
                        />
                      );
                    })}
                  </g>

                  {LABELS.map((l) => (
                    <text
                      key={l.text}
                      x={(l.x / 100) * 1000}
                      y={(l.y / 100) * 700}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      fill="var(--mka-navy-900)"
                      fillOpacity="0.4"
                      fontSize="17"
                      letterSpacing="3"
                      style={{ fontFamily: "var(--font-display, inherit)", textTransform: "uppercase" }}
                    >
                      {l.text.toUpperCase()}
                    </text>
                  ))}
                </svg>

                {PINS.map((pin) => (
                  <button
                    key={pin.name}
                    type="button"
                    className="map-pin absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    onMouseEnter={() => setActive(pin.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(pin.name)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive((v) => (v === pin.name ? null : pin.name))}
                    aria-label={`${pin.name}, ${pin.city}`}
                  >
                    <span className="relative block h-2.5 w-2.5">
                      <span className="map-pin-pulse absolute inset-0 rounded-full bg-gold opacity-50" />
                      <span
                        className={`absolute inset-0 rounded-full ring-2 ring-white transition-transform duration-300 ${
                          active === pin.name ? "scale-150 bg-gold" : "bg-gold"
                        }`}
                      />
                    </span>
                    {active === pin.name && (
                      <span className="pointer-events-none absolute left-1/2 top-4 z-10 w-max max-w-[220px] -translate-x-1/2 border border-grey-200 bg-white px-3 py-2 text-left shadow-lg">
                        <span className="block font-display text-xs uppercase tracking-[0.12em] text-navy-900">
                          {pin.name}
                        </span>
                        <span className="mt-1 block text-xs text-grey-500">{pin.city}</span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <RevealGroup className="lg:col-span-5">
            <ul className="divide-y divide-grey-200 border-y border-grey-200">
              {PINS.map((pin) => (
                <RevealItem as="li" key={pin.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(pin.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(pin.name)}
                    onBlur={() => setActive(null)}
                    className={`flex w-full items-center justify-between gap-4 py-4 text-left transition-colors ${
                      active === pin.name ? "text-gold" : "hover:text-gold"
                    }`}
                  >
                    <span>
                      <span className="block font-display text-sm uppercase tracking-[0.1em] text-navy-900">
                        {pin.name}
                      </span>
                      <span className="mt-1 block text-sm text-ink/55">{pin.city}</span>
                    </span>
                    <span
                      className={`block h-px bg-gold transition-all duration-300 ${
                        active === pin.name ? "w-12" : "w-6"
                      }`}
                    />
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
