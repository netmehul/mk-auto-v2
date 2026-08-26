import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RevealGroup, RevealItem } from "../Reveal";
import { prefersReducedMotion } from "@/lib/motion-prefs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const UAE_OUTLINE =
  "M58,397 L135,397 L250,359 L385,388 L519,322 L615,284 L712,227 L808,151 L904,57 L971,113 L942,227 L913,246 L865,378 L817,416 L750,675 L135,605 Z";

type Pin = { name: string; city: string; x: number; y: number };

const PINS: Pin[] = [
  { name: "MKA Dubai Flagship", city: "Sheikh Zayed Road, Dubai", x: 76.3, y: 27 },
  { name: "MKA Al Quoz Service", city: "Al Quoz, Dubai", x: 74.4, y: 30.5 },
  { name: "MKA Sharjah", city: "Industrial Area, Sharjah", x: 79, y: 23 },
  { name: "MKA Ajman", city: "Al Jurf, Ajman", x: 80.6, y: 20.3 },
  { name: "MKA Ras Al Khaimah", city: "Al Nakheel, Ras Al Khaimah", x: 88.4, y: 11.5 },
  { name: "MKA Abu Dhabi", city: "Mussafah, Abu Dhabi", x: 61.5, y: 50 },
  { name: "MKA Al Ain", city: "Sanaiya, Al Ain", x: 84, y: 54 },
];

export function BrandLocations() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const pins = gsap.utils.toArray<HTMLElement>(".map-pin");
      gsap.fromTo(
        pins,
        { y: -24, opacity: 0, scale: 0.6 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
          onComplete: () => {
            gsap.to(".map-pin-pulse", {
              scale: 2.1,
              opacity: 0,
              duration: 1.8,
              ease: "power2.out",
              repeat: -1,
              stagger: 0.25,
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
          <RevealItem as="p" className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-ink/65">
            Showroom and service locations shown below are placeholders until the final network list is
            confirmed.
          </RevealItem>
        </RevealGroup>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-8">
            <div className="relative w-full" style={{ aspectRatio: "1000 / 700" }}>
              <svg
                viewBox="0 0 1000 700"
                role="img"
                aria-label="Stylised map of the United Arab Emirates showing MKA locations"
                className="absolute inset-0 h-full w-full"
              >
                <path d={UAE_OUTLINE} fill="var(--mka-navy-900)" fillOpacity="0.06" stroke="var(--mka-navy-900)" strokeWidth="1.5" strokeOpacity="0.45" />
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
                  <span className="relative block h-3 w-3">
                    <span className="map-pin-pulse absolute inset-0 rounded-full bg-gold opacity-60" />
                    <span className="absolute inset-0 rounded-full bg-gold ring-2 ring-off-white" />
                  </span>
                  {active === pin.name && (
                    <span className="pointer-events-none absolute left-1/2 top-5 z-10 w-max max-w-[220px] -translate-x-1/2 border border-grey-200 bg-white px-3 py-2 text-left">
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

          <RevealGroup className="lg:col-span-4">
            <ul className="divide-y divide-grey-200 border-y border-grey-200">
              {PINS.map((pin) => (
                <RevealItem as="li" key={pin.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(pin.name)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(pin.name)}
                    onBlur={() => setActive(null)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-gold"
                  >
                    <span>
                      <span className="block font-display text-sm uppercase tracking-[0.1em] text-navy-900">
                        {pin.name}
                      </span>
                      <span className="mt-1 block text-sm text-ink/55">{pin.city}</span>
                    </span>
                    <span className="block h-px w-6 bg-gold" />
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
