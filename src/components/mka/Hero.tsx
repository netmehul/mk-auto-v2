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
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/45 to-navy-900/95" />
      <div className="hero-scrim absolute inset-0 bg-navy-900 opacity-0" />

      <div className="hero-content shell relative z-10 pb-24 pt-40 lg:pb-32">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }}
            className="flex items-center gap-3"
          >
            <span className="block h-px w-10 bg-gold" />
            <span className="eyebrow text-gold">Welcome to MKA</span>
          </motion.div>

          <h1 className="h1-display mt-8 max-w-5xl text-off-white">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: "100%" },
                    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
                  }}
                >
                  <span className={i === 2 ? "text-off-white/70" : undefined}>{line}</span>
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
            className="mt-8 max-w-[58ch] text-base leading-relaxed text-off-white/75 lg:text-lg"
          >
            Mahy Khoory Automotive is the official UAE distributor for Dongfeng, Omoda and Jaecoo — building
            a nationwide network of showrooms, service centres and parts operations.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } }}
            className="mt-10"
          >
            <PrimaryButton href="#who-we-are" className="bg-off-white text-navy-900 hover:bg-off-white">
              Discover MKA
            </PrimaryButton>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="eyebrow text-off-white/50">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-off-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-5 bg-gold"
            animate={{ y: [-20, 56] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
