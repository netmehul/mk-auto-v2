import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow, RevealGroup, RevealItem } from "./Reveal";
import { prefersReducedMotion, isMobileViewport } from "@/lib/motion-prefs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BRANDS = [
  { name: "Dongfeng", note: "Passenger & commercial vehicles" },
  { name: "Omoda", note: "Design-led urban SUVs" },
  { name: "Jaecoo", note: "Off-road capable premium SUVs" },
];

export function Brands() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || isMobileViewport()) return;
      gsap.utils.toArray<HTMLElement>(".brand-tile").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40 * (i + 1) * 0.6 },
          {
            y: -30 * (i + 1) * 0.5,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="our-brands" aria-labelledby="brands-title" className="relative overflow-hidden bg-navy-900 section-y">
      
      <div className="shell relative">
        <RevealGroup className="max-w-3xl">
          <Eyebrow tone="light">Trusted Dealer to Our Brands</Eyebrow>
          <RevealItem>
            <h2 id="brands-title" className="h2-display mt-7 text-off-white">
              Official UAE distributor for three global marques.
            </h2>
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[60ch] text-[17px] leading-[1.7] text-off-white/70">
            Each brand is supported end-to-end by MKA — sales, aftersales, genuine parts and warranty — under
            one accountable group.
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-16 grid gap-px border border-off-white/12 bg-off-white/12 md:grid-cols-3">
          {BRANDS.map((brand) => (
            <RevealItem key={brand.name} className="brand-tile">
              <a
                href="#news"
                className="group flex h-full min-h-[220px] flex-col justify-between bg-navy-900 p-8 transition-colors duration-300 hover:bg-navy-800 lg:min-h-[260px] lg:p-10"
              >
                <span className="font-display text-3xl uppercase tracking-[0.06em] text-off-white lg:text-4xl">
                  {brand.name}
                </span>
                <span className="mt-10 flex items-center justify-between gap-4">
                  <span className="text-sm text-off-white/55">{brand.note}</span>
                  <span className="block h-px w-8 bg-gold transition-all duration-300 group-hover:w-14" />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
