import { useRef } from "react";
import { RevealGroup, RevealItem } from "../Reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  prefersReducedMotion,
  isMobileViewport,
} from "@/lib/motion-prefs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Tile = {
  number: string;
  title: string;
  copy: string;
  path: string;
};

const TILES: Tile[] = [
  {
    number: "01",
    title: "Sales Excellence",
    copy:
      "Showroom teams trained on each marque, with a single handover standard across the network.",
    path: "M3 17l4-8 5 3 4-6 5 5M3 21h18",
  },
  {
    number: "02",
    title: "After Sales & Service",
    copy:
      "Workshops staffed by certified technicians, with capacity planned around real service demand.",
    path:
      "M14.5 5.5a4 4 0 01-5.3 5.3L4 16v4h4l5.2-5.2a4 4 0 015.3-5.3l-2.8 2.8-2.4-2.4 2.8-2.8z",
  },
  {
    number: "03",
    title: "Genuine Parts",
    copy:
      "Central parts holding in Dubai, distributed daily to every workshop we operate.",
    path:
      "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v18M4 7.5l8 4.5 8-4.5",
  },
  {
    number: "04",
    title: "Customer Experience",
    copy:
      "One record of ownership per customer, from first enquiry through warranty and resale.",
    path:
      "M12 20s-7-4.3-7-9a4 4 0 017-2.6A4 4 0 0119 11c0 4.7-7 9-7 9z",
  },
];

export function Excellence() {
  const root = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        prefersReducedMotion() ||
        isMobileViewport() ||
        !stack.current
      ) {
        return;
      }
  
      const cards = gsap.utils.toArray<HTMLElement>(
        ".excellence-card",
      );
  
      if (cards.length !== TILES.length) return;
  
      const START_GAP = 350;
      const STACK_GAP = 18;
  
      /*
       * Initial positions
       */
  
      cards.forEach((card, index) => {
        gsap.set(card, {
          y: index * START_GAP,
          scale: 1,
          opacity: 1,
        });
      });
  
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stack.current,
          start: "top 15%",
          end: "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
  
      /*
       * ----------------------------------------------------------
       * Helper
       * ----------------------------------------------------------
       *
       * Moves the active card AND every card beneath it by the
       * exact same amount.
       *
       * Cards above the active card remain untouched.
       */
  
      const moveGroup = (
        activeIndex: number,
        targetY: number,
      ) => {
        const currentY =
          activeIndex * START_GAP -
          Math.max(0, activeIndex - 1) *
            (START_GAP - STACK_GAP);
  
        const delta = targetY - currentY;
  
        const movingCards = cards.slice(activeIndex);
  
        movingCards.forEach((card, relativeIndex) => {
          const actualIndex = activeIndex + relativeIndex;
  
          const currentPosition =
            actualIndex * START_GAP -
            Math.max(0, activeIndex - 1) *
              (START_GAP - STACK_GAP);
  
          tl.to(
            card,
            {
              y: currentPosition + delta,
              duration: 1,
              ease: "power2.inOut",
            },
            "<",
          );
        });
      };
  
      /*
       * ----------------------------------------------------------
       * STEP 1
       *
       * 02 + 03 + 04 move together.
       * 01 stays still.
       * ----------------------------------------------------------
       */
  
      moveGroup(1, STACK_GAP);
  
      tl.to({}, { duration: 0.2 });
  
  
      /*
       * ----------------------------------------------------------
       * STEP 2
       *
       * 03 + 04 move together.
       * 01 + 02 stay still.
       * ----------------------------------------------------------
       */
  
      moveGroup(2, STACK_GAP * 2);
  
      tl.to({}, { duration: 0.2 });
  
  
      /*
       * ----------------------------------------------------------
       * STEP 3
       *
       * Only 04 moves.
       * ----------------------------------------------------------
       */
  
      const lastCard = cards[3];
      if (lastCard) {
        tl.to(
          lastCard,
          {
            y: STACK_GAP * 3,
            duration: 1,
            ease: "power2.inOut",
          },
        );
      }
  
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    {
      scope: root,
    },
  );

  return (
    <section
      ref={root}
      aria-labelledby="excel-title"
      className="section-y bg-off-white text-ink"
    >
      <div className="shell">

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">

          {/* ======================================================
              LEFT CONTENT
              ====================================================== */}

          <div className="lg:col-span-5">

            <div className="lg:sticky lg:top-28 py-4">

              <RevealGroup>

                {/* Heading */}

                <RevealItem>
                  <h2
                    id="excel-title"
                    className="
                      h2-display
                      mt-7
                      max-w-[14ch]
                      uppercase
                      text-navy-900
                    "
                  >
                    Four disciplines the group is built around.
                  </h2>
                </RevealItem>


                {/* Description */}

                <RevealItem
                  as="p"
                  className="
                    mt-6
                    max-w-[46ch]
                    text-[16px]
                    leading-[1.75]
                    text-ink/65
                    sm:text-[17px]
                  "
                >
                  Each one is run in house, so accountability sits
                  with MKA rather than a third party.
                </RevealItem>

              </RevealGroup>

            </div>

          </div>


          {/* ======================================================
              RIGHT SIDE
              ====================================================== */}

          <div className="lg:col-span-7">


            {/* ====================================================
                DESKTOP STACK
                ==================================================== */}

            <div
              ref={stack}
              className="
                relative
                hidden
                h-[450px]
                w-full
                lg:block
              "
            >

              {TILES.map((tile, index) => (

                <article
                  key={tile.title}
                  className="
                    excellence-card
                    absolute
                    left-0
                    top-0
                    h-[300px]
                    w-full
                    overflow-hidden
                    border
                    border-grey-200
                    bg-white
                    p-8
                    shadow-[0_20px_55px_rgba(5,15,55,0.07)]
                    will-change-transform
                  "
                  style={{
                    zIndex: index + 1,
                  }}
                >

                  {/* ============================================
                      CARD HEADER
                      ============================================ */}

                  <div className="flex items-start justify-between">

                    <span
                      className="
                        font-display
                        text-xs
                        tracking-[0.16em]
                        text-gold
                      "
                    >
                      {tile.number}
                    </span>


                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-navy-900"
                    >
                      <path d={tile.path} />
                    </svg>

                  </div>


                  {/* ============================================
                      CARD CONTENT
                      ============================================ */}

                  <div
                    className="
                      absolute
                      bottom-10
                      left-10
                      right-10
                      max-w-[40ch]
                    "
                  >

                    <h3
                      className="
                        font-display
                        text-[28px]
                        leading-[1.15]
                        text-navy-900
                        lg:text-[32px]
                      "
                    >
                      {tile.title}
                    </h3>


                    <p
                      className="
                        mt-5
                        text-[15px]
                        leading-[1.8]
                        text-ink/60
                        lg:text-[16px]
                      "
                    >
                      {tile.copy}
                    </p>

                  </div>


                  {/* ============================================
                      GOLD BOTTOM LINE
                      ============================================ */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[3px]
                      w-full
                      bg-gold
                    "
                  />

                </article>

              ))}

            </div>


            {/* ====================================================
                TABLET / MOBILE
                ==================================================== */}

            <div className="space-y-5 lg:hidden">

              {TILES.map((tile) => (

                <RevealItem key={tile.title}>

                  <article
                    className="
                      relative
                      min-h-[280px]
                      overflow-hidden
                      border
                      border-grey-200
                      bg-white
                      p-7
                      shadow-[0_12px_35px_rgba(5,15,55,0.05)]
                      sm:min-h-[320px]
                      sm:p-9
                    "
                  >

                    {/* Card header */}

                    <div className="flex items-start justify-between">

                      <span
                        className="
                          font-display
                          text-xs
                          tracking-[0.16em]
                          text-gold
                        "
                      >
                        {tile.number}
                      </span>


                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.35"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="text-navy-900"
                      >
                        <path d={tile.path} />
                      </svg>

                    </div>


                    {/* Card content */}

                    <div
                      className="
                        absolute
                        bottom-8
                        left-7
                        right-7
                        max-w-[34ch]
                        sm:left-9
                        sm:right-9
                      "
                    >

                      <h3
                        className="
                          font-display
                          text-2xl
                          leading-tight
                          text-navy-900
                          sm:text-3xl
                        "
                      >
                        {tile.title}
                      </h3>


                      <p
                        className="
                          mt-4
                          text-[15px]
                          leading-[1.75]
                          text-ink/60
                          sm:text-[16px]
                        "
                      >
                        {tile.copy}
                      </p>

                    </div>


                    {/* Gold line */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[3px]
                        w-full
                        bg-gold
                      "
                    />

                  </article>

                </RevealItem>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}