import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ogAsset from "@/assets/opengraph-image.png.asset.json";
import { RevealGroup, RevealItem } from "../Reveal";
import { prefersReducedMotion, isMobileViewport } from "@/lib/motion-prefs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ContactUsHeaderBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || isMobileViewport()) return;
      gsap.fromTo(
        ".about-watermark",
        { yPercent: -6 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="about-title"
      className="relative flex min-h-[46vh] items-end overflow-hidden bg-navy-900 pb-16 pt-36 lg:min-h-[50vh] lg:pb-24 lg:pt-44"
    >
      <img
        src={ogAsset.url}
        alt=""
        aria-hidden="true"
        className="about-watermark pointer-events-none absolute inset-0 h-[120%] w-full object-cover opacity-[0.12]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/85 to-navy-900" />

      <div className="shell relative">
        <RevealGroup className="w-full">
          <RevealItem>
            <h1 id="about-title" className="h1-display uppercase mt-8 text-off-white md:text-7xl">
             Your Journey <br /> Starts With a Conversation
            </h1>
          </RevealItem>
          <RevealItem as="p" className="mt-7 max-w-[58ch] text-[17px] leading-[1.7] text-off-white/70">
            A UAE automotive group built on legacy, scale, and a clear view of the road ahead.
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
