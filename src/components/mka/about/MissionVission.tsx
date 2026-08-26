import { motion, type Variants } from "motion/react";
import missionImg from "@/assets/about-mission.jpg";
import fav from "@/assets/logo.svg";

const easeOut = [0.22, 1, 0.36, 1] as const;

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const headlineLine: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

const cardContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.35 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const goldLine: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: easeOut } },
};

const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 1.2, ease: easeOut },
  },
};

const badgePop: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: easeOut, delay: 0.7 } },
};

export function MissionVision() {
  return (
    <section aria-labelledby="mission-title" className="section-y bg-off-white text-ink">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Content */}
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={headlineContainer}
        >
          <header className="relative">
            <motion.span
              className="absolute -left-6 top-0 hidden h-full w-1 bg-gold lg:block"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
            />
            
            <h2
              id="mission-title"
              className="mt-5 h2-display max-w-[18ch] uppercase text-navy-900"
            >
              <motion.span className="block" variants={headlineLine}>
                Why the group exists,
              </motion.span>
              <motion.span className="block" variants={headlineLine}>
                and where it is going.
              </motion.span>
            </h2>
          </header>

          <motion.div
            className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-14"
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {/* Mission */}
            <motion.div className="group space-y-5" variants={cardItem}>
              <div className="flex items-center gap-3">
                <motion.div
                  className="h-px w-10 bg-gold"
                  variants={goldLine}
                />
                <span className="eyebrow text-gold">Mission</span>
              </div>
              <p className="max-w-[40ch] text-[17px] leading-[1.7] text-ink/75">
                We distribute and support automotive brands across the United Arab Emirates. Our work covers
                sales, aftersales service and genuine parts, delivered through facilities we own and teams we
                train. We hold the same standard in every emirate we operate in, so ownership feels consistent
                wherever a customer buys.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div className="group space-y-5" variants={cardItem}>
              <div className="flex items-center gap-3">
                <motion.div
                  className="h-px w-10 bg-gold"
                  variants={goldLine}
                />
                <span className="eyebrow text-gold">Vision</span>
              </div>
              <p className="max-w-[40ch] text-[17px] leading-[1.7] text-ink/75">
                We want to be the group UAE customers choose for the full life of a vehicle, not only the first
                purchase. That means more service capacity, faster parts availability and a network that keeps
                pace with new mobility technology. We build for the next decade of the market, not the next
                quarter.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <div className="lg:col-span-5">
          <motion.div
            className="relative flex items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative w-full aspect-[4/5]">
              {/* Decorative offset frame */}
              <motion.div
                className="absolute -bottom-5 -right-5 z-0 h-full w-full border border-gold/30"
                initial={{ opacity: 0, x: -20, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
              />

              {/* Image container */}
              <motion.div
                className="relative z-10 h-full w-full overflow-hidden bg-white shadow-2xl"
                variants={imageReveal}
              >
                <img
                  src={missionImg}
                  alt="MKA showroom floor in the United Arab Emirates"
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-900/20 via-transparent to-transparent" />
              </motion.div>

              {/* Floating brand badge */}
              <motion.div
                className="absolute -left-4 -top-4 z-20 bg-navy-900 p-5 shadow-xl"
                variants={badgePop}
              >
                <div className="flex flex-col items-start gap-2">
                  <img src={fav} alt="Logo" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
