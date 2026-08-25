import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import heroImg from "@/assets/hero.jpg";
import { PrimaryButton } from "./Buttons";
import { prefersReducedMotion, isMobileViewport } from "@/lib/motion-prefs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const easeOut = [0.22, 1, 0.36, 1] as const;
const LINES = ["A legacy that inspires.", "A vision that moves forward."];
const MARQUE_STRIP = ["Dongfeng", "Omoda", "Jaecoo"];


export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || isMobileViewport()) return;
      gsap.to(".hero-media", {
        yPercent: 12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-scrim", {
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        y: -60,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy-900"
    >
      <div className="hero-media absolute inset-0 will-change-transform">
        <img
          src={heroImg}
          alt="MKA showroom in the UAE at dusk"
          width={1920}
          height={1088}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/35 to-navy-900/90" />
      <div className="hero-scrim absolute inset-0 bg-navy-900 opacity-0" />

      <div className="hero-content shell relative z-10 w-full pb-14 pt-40 lg:pb-16">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}
            className="flex items-center gap-3"
          >
            <span className="block h-px w-10 bg-gold" />
            <span className="eyebrow text-gold">Welcome to MKA</span>
          </motion.div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1
              className="max-w-2xl text-off-white lg:col-span-7"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 2.4vw + 0.9rem, 3rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
              }}
            >
              {LINES.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { opacity: 0, y: "100%" },
                      show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
                    }}
                  >
                    <span className={i === 1 ? "text-off-white/70" : undefined}>{line}</span>
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
              className="lg:col-span-5"
            >
              <p className="max-w-[46ch] text-sm leading-relaxed text-off-white/70 lg:text-base">
                Mahy Khoory Automotive is the official UAE distributor for Dongfeng, Omoda and Jaecoo — building
                a nationwide network of showrooms, service centres and parts operations.
              </p>
              <div className="mt-7">
                <PrimaryButton href="#who-we-are" className="bg-off-white text-navy-900 hover:bg-off-white">
                  Discover MKA
                </PrimaryButton>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-off-white/15 pt-6"
          >
            <span className="eyebrow text-off-white/45">Official UAE distributor</span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {MARQUE_STRIP.map((m) => (
                <span key={m} className="eyebrow text-off-white/80">
                  {m}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 lg:flex">
        <span className="eyebrow text-off-white/50">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-off-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-5 bg-gold"
            animate={{ y: [-20, 56] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>

        </span>
      </div>
    </section>
  );
}
