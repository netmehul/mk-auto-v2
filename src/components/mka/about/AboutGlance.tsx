import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RevealGroup, RevealItem } from "../Reveal";
import { prefersReducedMotion } from "@/lib/motion-prefs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { value: 6, suffix: "+", label: "Showrooms across the UAE" },
  { value: 200, suffix: "+", label: "People in our Automotive team" },
  { value: 10, suffix: "+", label: "Nationalities" },
  { value: 96, suffix: "+", label: "Years of family legacy" },
];

export function AboutGlance() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      gsap.utils.toArray<HTMLElement>(".about-stat").forEach((el, i) => {
        const target = Number(el.dataset["value"] ?? 0);
        if (reduced) {
          el.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about-glance" aria-labelledby="glance-heading" className="section-y bg-navy-900">
      <div className="shell">
        <RevealGroup className="flex">
          <div>
            <RevealItem>
              <h2 id="glance-heading" className="h2-display mt-7 uppercase max-w-[30ch] text-off-white">
                Our Scale, Our People, Our Legacy.
              </h2>
            </RevealItem>
          </div>
        </RevealGroup>

        <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="border-t border-off-white/12 pt-6">
                <p className="font-display text-5xl text-off-white lg:text-6xl">
                  <span className="about-stat" data-value={stat.value}>
                    0
                  </span>
                  <span className="text-gold">{stat.suffix}</span>
                </p>
                <p className="mt-4 text-sm text-off-white/60">{stat.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* <RevealGroup className="mt-20 border-t border-off-white/12 pt-10">
          <RevealItem>
            <h3 className="font-display text-2xl uppercase text-off-white lg:text-3xl">Our presence in the UAE</h3>
          </RevealItem>
          <RevealItem as="p" className="mt-4 w-full text-[17px] leading-[1.7] text-off-white/65">
            Every location below carries sales, service or parts capability, and in most cases all three.
          </RevealItem>
        </RevealGroup> */}
      </div>
    </section>
  );
}
