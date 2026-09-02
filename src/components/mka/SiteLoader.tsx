import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import loaderLogo from "@/assets/logo-loader-optimized.svg";
import PatternBG from "@/assets/pattern-bg.png";

interface SiteLoaderProps {
  onReady?: () => void;
  onComplete?: () => void;
}

export function SiteLoader({ onReady, onComplete }: SiteLoaderProps = {}) {
  const loader = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const percentage = useRef<HTMLDivElement>(null);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const loaderElement = loader.current;
    const logoElement = logo.current;
    const percentageElement = percentage.current;

    if (
      !loaderElement ||
      !logoElement ||
      !percentageElement
    ) {
      return;
    }

    /*
     * ======================================================
     * LOCK PAGE SCROLL
     * ======================================================
     *
     * Lock both html and body while the loader is visible.
     * This also prevents ScrollSmoother from allowing the
     * page underneath to move.
     */

    document.documentElement.classList.add("loader-active");
    document.body.classList.add("loader-active");

    const counter = { value: 0 };

    /*
     * ======================================================
     * MAIN LOADER TIMELINE
     * ======================================================
     */

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        onReady?.();

        /*
         * ==================================================
         * EXIT ANIMATION
         * ==================================================
         */

        const exitTimeline = gsap.timeline({
          onComplete: () => {
            /*
             * Unlock scrolling ONLY after the loader has
             * completely finished disappearing.
             */

            document.documentElement.classList.remove(
              "loader-active",
            );

            document.body.classList.remove(
              "loader-active",
            );

            loaderElement.style.display = "none";
            onComplete?.();
          },
        });

        exitTimeline.to(
          loaderElement,
          {
            duration: 0.8,
            filter: "blur(18px)",
            opacity: 0,
            scale: 1.015,
            ease: "power3.inOut",
          },
          0,
        );
      },
    });

    /*
     * ======================================================
     * COUNTER — 0 → 100%
     * ======================================================
     */

    timeline.to(
      counter,
      {
        value: 100,
        duration: 1.9,
        ease: "power2.inOut",

        onUpdate: () => {
          percentageElement.textContent = `${Math.round(
            counter.value,
          )}%`;
        },
      },
      0,
    );

    /*
     * ======================================================
     * SMALL PAUSE AT 100%
     * ======================================================
     */

    timeline.to({}, { duration: 0.15 });

    /*
     * ======================================================
     * CLEANUP
     * ======================================================
     */

    return () => {
      timeline.kill();

      document.documentElement.classList.remove(
        "loader-active",
      );

      document.body.classList.remove(
        "loader-active",
      );
    };
  }, []);

  return (
    <div
      ref={loader}
      className="
        fixed
        inset-0
        z-[99999]
        flex
        h-screen
        w-screen
        items-center
        overflow-hidden
        bg-[#020229]
      "
      aria-hidden={isComplete}
    >

      {/* ====================================================
          BACKGROUND
          ==================================================== */}

      <div className="absolute inset-0">
        <img
          src={PatternBG}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>


      {/* ====================================================
          SUBTLE MK PATTERN
          ==================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `url(${loaderLogo})`,
          backgroundRepeat: "repeat",
          backgroundSize: "110px auto",
        }}
      />


      {/* ====================================================
          MAIN CONTENT
          ==================================================== */}

      <div className="relative flex h-full w-full items-center justify-center">

        <div className="flex flex-col items-center">

          {/* ==================================================
              LOGO
              ================================================== */}

          <div className="flex items-center justify-center">

            <img
              ref={logo}
              src={loaderLogo}
              alt="Mahy Khoory Automotive"
              className="
                h-auto
                w-[110px]
                sm:w-[125px]
                lg:w-[140px]
              "
            />

          </div>


          {/* ==================================================
              PERCENTAGE
              ================================================== */}

          <div
            ref={percentage}
            className="
              mt-7
              font-display
              text-[clamp(3.5rem,7vw,6rem)]
              font-normal
              leading-none
              tracking-[-0.04em]
              text-off-white
            "
          >
            0%
          </div>

        </div>

      </div>

    </div>
  );
}