import { motion } from "motion/react";
import officeImg from "@/assets/head_office_about_us.webp";
import { RevealGroup, RevealItem } from "../Reveal";
import { PrimaryButton } from "../Buttons";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function HeadOffice() {
  return (
    <section aria-labelledby="head-office-title" className="section-y bg-off-white text-ink">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <RevealGroup className="lg:col-span-5">
          <RevealItem>
            <h2 id="head-office-title" className="h2-display mt-7 uppercase max-w-[16ch] text-navy-900">
              Group overview
            </h2>
          </RevealItem>
          <RevealItem as="p" className="mt-7 text-[17px] leading-[1.7] text-ink/70">
            For nearly a century, M.A.H.Y. Khoory Group has become one of the UAE's established diversified business groups. Built on a legacy of innovation, reliability and long-standing partnerships, the Group today operates across engineering, trading, manufacturing, recycling, logistics, hospitality, interiors and green energy.
            
          </RevealItem>
          <RevealItem as="p" className="mt-6 text-[15px] leading-[1.7] text-ink/60">
            Sunday to Thursday, 8:30 to 18:00.{" "}
            <a href="tel:+97140000000" className="text-navy-900 underline-offset-4 hover:text-gold hover:underline">
              +971 4 000 0000
            </a>
          </RevealItem>
          <RevealItem className="mt-9">
            <PrimaryButton href="https://mahykhoory.com/">
              Explore MAHY Khooray
            </PrimaryButton>
          </RevealItem>
        </RevealGroup>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="overflow-hidden"
          >
            <img
              src={officeImg}
              alt="MKA head office building in Dubai"
              loading="lazy"
              width={1600}
              height={1100}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
