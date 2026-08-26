import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import heroVideo from "@/assets/mk-corpo-video.webm";
import { PrimaryButton } from "./Buttons";
import { prefersReducedMotion, isMobileViewport } from "@/lib/motion-prefs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const easeOut = [0.22, 1, 0.36, 1] as const;
const LINES = ["A legacy that inspires.", "A vision that moves forward."];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion() || isMobileViewport()) return;
      gsap.to(".hero-media", {
        yPercent: 12,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-scrim", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-content", {
        y: -60,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  const handleVideoPlay = () => {
    setVideoStarted(true);
    setContentVisible(false);
  };

  const handleInteraction = () => {
    if (videoStarted && !isVideoOpen) {
      setContentVisible(true);
    }
  };

  const openVideo = () => {
    setIsVideoOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVideoOpen) {
        closeVideo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isVideoOpen]);

  return (
    <>
      <section
        ref={root}
        id="top"
        aria-label="Introduction"
        onMouseMove={handleInteraction}
        onWheel={handleInteraction}
        onTouchStart={handleInteraction}
        className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy-900"
      >
        <div className="mt-18 md:mt-0 hero-media absolute inset-0 will-change-transform">
          <video
            src={heroVideo}
            width={1920}
            height={1080}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            onPlay={handleVideoPlay}
            onClick={openVideo}
            className="h-full w-full cursor-pointer object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/35 to-navy-900/90" />
        <div className="hero-scrim absolute inset-0 bg-navy-900 opacity-0" />
        <div
          className={`hero-content shell relative z-10 w-full pb-14 pt-40 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:pb-16 ${
            videoStarted && !contentVisible ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            <div className="mt-6 w-full">
              <h1
                className="uppercase text-off-white md:text-4xl"
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
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.9,
                            ease: easeOut,
                          },
                        },
                      }}
                    >
                      <span className={i === 1 ? "text-off-white/70" : undefined}>{line}</span>
                    </motion.span>
                  </span>
                ))}
              </h1>
              <div className="mt-7">
                <PrimaryButton
                  type="button"
                  onClick={openVideo}
                  className="border border-off-white/40 px-5 py-2.5 font-display text-[12px] uppercase tracking-[0.16em] text-off-white transition-colors hover:border-gold hover:text-gold-soft"
                >
                  Watch Video
                </PrimaryButton>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="pointer-events-none absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 lg:flex">
          <span className="eyebrow text-off-white/50">Scroll</span>
          <span className="relative block h-14 w-px overflow-hidden bg-off-white/20">
            <motion.span
              className="absolute inset-x-0 top-0 block h-5 bg-gold"
              animate={{ y: [-20, 56] }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </div>
      </section>
      {/* ======================================================
          FULLSCREEN VIDEO
      ====================================================== */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <video
            src={heroVideo}
            autoPlay
            controls
            playsInline
            className="h-full w-full object-contain"
          />
          <button
            type="button"
            onClick={closeVideo}
            aria-label="Close video"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-white/30 bg-black/40 text-2xl text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-navy-900"
          >
            ×
          </button>
        </motion.div>
      )}
    </>
  );
}