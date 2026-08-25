import { motion } from "motion/react";
import whoImg from "@/assets/who-we-are.jpg";
import { Eyebrow, RevealGroup, RevealItem } from "./Reveal";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function WhoWeAre() {
  return (
    <section id="who-we-are" aria-labelledby="who-we-are-title" className="section-y bg-off-white">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <RevealGroup className="lg:col-span-6">
          <Eyebrow>Who We Are</Eyebrow>
          <RevealItem>
            <h2 id="who-we-are-title" className="h2-display mt-7 max-w-[18ch] text-navy-900">
              A UAE automotive group built on legacy and scale.
            </h2>
          </RevealItem>
          <RevealItem as="p" className="mt-7 max-w-[62ch] text-[17px] leading-[1.7] text-grey-500">
            Part of the Mahy Khoory family of businesses, MKA represents world-class automotive brands across
            the Emirates. Our operation spans distribution, retail, aftersales and genuine parts — supported by
            a network engineered for consistency in every showroom we open.
          </RevealItem>
          <RevealItem as="p" className="mt-4 max-w-[62ch] text-[17px] leading-[1.7] text-grey-500">
            We measure ourselves on long-term ownership experience, not single transactions. That principle
            shapes how we invest in facilities, technicians and the customers who trust us.
          </RevealItem>
          <RevealItem className="mt-9">
            <a
              href="#at-a-glance"
              className="group inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.16em] text-navy-900"
            >
              Learn more about us
              <span className="block h-px w-8 bg-gold transition-all duration-300 group-hover:w-14" />
            </a>
          </RevealItem>
        </RevealGroup>

        <div className="lg:col-span-6">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: easeOut }}
            className="relative"
          >
            <img
              src={whoImg}
              alt="MKA team members on a UAE showroom floor"
              loading="lazy"
              width={1200}
              height={1400}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-navy-900/20 mix-blend-multiply" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
