import { motion } from "motion/react";
import { RevealGroup, RevealItem } from "./Reveal";
import MkAnimationF from "@/assets/mk-line-animation-navy.svg";
// import LineDecoration from "@/assets/line-decoration-navy.svg";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-title"
      className="section-y relative overflow-hidden bg-off-white text-ink"
    >
      {/* <div className="hidden sm:relative sm:block pointer-events-none select-none">
        <img src={LineDecoration} alt="" loading="lazy" className="absolute right-0" />
        <img src={LineDecoration} alt="" loading="lazy" className="absolute inset-y-0 right-125 rotate-225 mt-[-350px]" />
        <img src={LineDecoration} alt="" loading="lazy" className="absolute left-0 -scale-x-100" />
      </div> */}

      <div className="shell relative grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <RevealGroup className="lg:col-span-6">
          <RevealItem>
            <h2 id="who-we-are-title" className="h2-display mt-7 uppercase max-w-[18ch] text-navy-900">
            A Legacy of Trust, Driving What’s Next
            </h2>
          </RevealItem>
          <RevealItem as="p" className="mt-7 max-w-[62ch] text-[17px] leading-[1.7] text-ink/65">
            MAHY Khoory Automotive is part of the M.A.H.Y Khoory Group, with nearly a century of heritage built on trust, 
            innovation and excellence. Bringing this legacy into automotive, we combine global brands with strong regional expertise to deliver innovative vehicles, personalised customer service and dependable aftersales support. 
          </RevealItem>
          <RevealItem as="p" className="mt-4 max-w-[62ch] text-[17px] leading-[1.7] text-ink/65">
          Our portfolio includes Dongfeng across the UAE, and OMODA & JAECOO in Abu Dhabi. We go beyond the drive, making every journey and every ownership experience better.
          </RevealItem>
          <RevealItem className="mt-9">
            <a
              href="/about"
              className="group inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.16em] text-navy-900"
            >
              Learn more about us
              <span className="block h-px w-8 bg-gold transition-all duration-300 group-hover:w-14" />
            </a>
          </RevealItem>
        </RevealGroup>

        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: easeOut }}
            className="relative flex items-center justify-center py-6"
          >

            <img
              src={MkAnimationF}
              alt="Animated MK monogram outline"
              loading="lazy"
              width={419}
              height={390}
              className="h-auto w-full max-w-[380px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
