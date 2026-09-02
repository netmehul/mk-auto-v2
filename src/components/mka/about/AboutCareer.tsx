import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RevealGroup, RevealItem } from "../Reveal";
import { MagneticButton } from "../Buttons";
import { prefersReducedMotion, isMobileViewport } from "@/lib/motion-prefs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutCareersSection() {
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
    <section ref={root} id="careers" aria-labelledby="careers-title" className="relative overflow-hidden bg-gray-200 section-y">
      
      <div className="shell relative">
        <h2 id="careers-title" className="h2-display uppercase mt-8 max-w-[400ch] text-navy-900">
          <span className="careers-line block">Be part of something bigger.</span>
          <span className="careers-line block text-navy-900/70">Build the future with us.</span>
        </h2>
        <RevealGroup className="mt-10 flex flex-col items-start gap-8 lg:flex-col lg:gap-4">
          <RevealItem as="p" className="max-w-[52ch] text-[17px] leading-[1.7] text-ink/75">
            Want to join our team?
          </RevealItem>
          <RevealItem>
            <MagneticButton href="/careers">Explore Careers</MagneticButton>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
