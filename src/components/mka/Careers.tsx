import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow, RevealGroup, RevealItem } from "./Reveal";
import { MagneticButton } from "./Buttons";
import { prefersReducedMotion, isMobileViewport } from "@/lib/motion-prefs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Careers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || isMobileViewport()) return;
      gsap.fromTo(
        ".careers-line",
        { clipPath: "inset(0 100% 0 0)", opacity: 0.2 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          stagger: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="careers" aria-labelledby="careers-title" className="relative overflow-hidden bg-navy-800 section-y">
      <div className="monogram-texture pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative">
        <RevealGroup>
          <Eyebrow tone="light">Careers</Eyebrow>
        </RevealGroup>
        <h2 id="careers-title" className="h2-display mt-8 max-w-[20ch] text-off-white">
          <span className="careers-line block">Be part of something bigger.</span>
          <span className="careers-line block text-off-white/70">Build the future with us.</span>
        </h2>
        <RevealGroup className="mt-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <RevealItem as="p" className="max-w-[52ch] text-[17px] leading-[1.7] text-off-white/70">
            Want to join our team? We're hiring across retail, aftersales, parts and corporate functions as the
            group grows.
          </RevealItem>
          <RevealItem>
            <MagneticButton href="#news">Explore Careers</MagneticButton>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
