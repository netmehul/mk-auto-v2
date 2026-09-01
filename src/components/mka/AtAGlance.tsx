import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import glanceBg from "@/assets/glance-bg.jpg";
import { RevealGroup, RevealItem } from "./Reveal";
import { prefersReducedMotion, isMobileViewport } from "@/lib/motion-prefs";
import atAGlanceImage from "@/assets/at_glance_support.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { value: 6, suffix: "+", label: "Showrooms across the UAE" },
  { value: 200, suffix: "+", label: "People in our Automotive team" },
  { value: 10, suffix: "+", label: "Nationalities" },
  { value: 96, suffix: "+", label: "Years of family legacy" },
];

export function AtAGlance() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = Number(el.dataset["value"] ?? 0);
        if (reduced) {
          el.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      if (reduced || isMobileViewport()) return;
      gsap.fromTo(
        ".glance-bg",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="at-a-glance"
      aria-labelledby="glance-title"
      className="relative overflow-hidden bg-off-white section-y"
    >
      <img
        src={glanceBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1920}
        height={1080}
        className="glance-bg absolute inset-0 h-[120%] w-full object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-off-white/90" />

      <div className="shell relative">
        <RevealGroup className="max-w-3xl">
          <RevealItem>
            <h2 id="glance-title" className="h2-display uppercase mt-7 text-navy-900">
              OUR REACH ACROSS THE UAE
            </h2>
          </RevealItem>
          {/* <RevealItem as="p" className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-navy-900/70">
            From Dubai to the Northern Emirates, our footprint is built to keep customers close to sales,
            service and genuine parts.
          </RevealItem> */}
        </RevealGroup>

        <RevealGroup className="mt-16 grid gap-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="border-t border-navy-900/15 pt-6">
                <p className="font-display text-5xl text-navy-900 lg:text-6xl">
                  <span className="stat-number" data-value={stat.value}>
                    0
                  </span>
                  <span className="text-gold">{stat.suffix}</span>
                </p>
                <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-navy-900/60">{stat.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <RevealGroup className="mt-16">
          <RevealItem>
            <img src={atAGlanceImage} alt="At a Glance Support" className="w-full h-120 object-cover" />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
