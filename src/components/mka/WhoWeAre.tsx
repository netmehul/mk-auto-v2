import { motion } from "motion/react";
import { RevealGroup, RevealItem } from "./Reveal";
import MkAnimationF from "@/assets/mk-line-animation-navy.svg";
import LineDecoration from "@/assets/line-decoration-navy.svg";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-title"
      className="section-y relative overflow-hidden bg-off-white text-ink"
    >
      <div className="hidden sm:relative sm:block pointer-events-none select-none">
        <img src={LineDecoration} alt="" loading="lazy" className="absolute right-0" />
        <img src={LineDecoration} alt="" loading="lazy" className="absolute inset-y-0 right-125 rotate-225 mt-[-350px]" />
        <img src={LineDecoration} alt="" loading="lazy" className="absolute left-0 -scale-x-100" />
      </div>

      <div className="shell relative grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <RevealGroup className="lg:col-span-6">
          <RevealItem>
            <h2 id="who-we-are-title" className="h2-display mt-7 uppercase max-w-[18ch] text-navy-900">
              A UAE automotive group built on legacy and scale.
            </h2>
          </RevealItem>
          <RevealItem as="p" className="mt-7 max-w-[62ch] text-[17px] leading-[1.7] text-ink/65">
            Part of the Mahy Khoory family of businesses, MKA represents world-class automotive brands across
            the Emirates. Our operation spans distribution, retail, aftersales and genuine parts - supported by
            a network engineered for consistency in every showroom we open.
          </RevealItem>
          <RevealItem as="p" className="mt-4 max-w-[62ch] text-[17px] leading-[1.7] text-ink/65">
            We measure ourselves on long-term ownership experience, not single transactions. That principle
            shapes how we invest in facilities, technicians and the customers who trust us.
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
