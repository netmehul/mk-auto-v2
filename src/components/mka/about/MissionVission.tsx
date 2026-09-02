import { motion, type Variants } from "motion/react";
import missionImg from "@/assets/about-mission.webp";

const easeOut = [0.22, 1, 0.36, 1] as const;

const headlineContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const headlineLine: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easeOut,
    },
  },
};

const imageReveal: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
  },
  show: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: easeOut,
    },
  },
};

const contentContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const contentItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

export function MissionVision() {
  return (
    <section
      aria-labelledby="mission-title"
      className="section-y bg-off-white text-ink"
    >
      <div className="shell">

        {/* <motion.header
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          variants={headlineContainer}
        >
          <motion.h2
            id="mission-title"
            className="h2-display uppercase text-navy-900"
            variants={headlineLine}
          >
            Why the group exists,
            <br />
            and where it is going.
          </motion.h2>
        </motion.header> */}

              {/* <img
                src={missionImg}
                alt="Mahy Khoory Automotive showroom floor in the United Arab Emirates"
                className=" mt-8 h-full w-full object-cover object-center"
                width={1920}
                height={680}
              /> */}


        {/* ======================================================
            MISSION + VISION
            ====================================================== */}

        <motion.div
          className="
            mt-12
            grid
            gap-10
            sm:mt-14
            lg:mt-16
            lg:grid-cols-2
            lg:gap-0
          "
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={contentContainer}
        >

          {/* ====================================================
              MISSION
              ==================================================== */}

          <motion.article
            className="
              lg:border-r
              lg:border-grey-300
              lg:pr-14
            "
            variants={contentItem}
          >

            <div className="flex items-center gap-4">

              <span className="h-px w-8 bg-gold" />

              <h3
                className="
                  font-display
                  text-base
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-navy-900
                  sm:text-lg
                "
              >
                Mission
              </h3>

            </div>

            <p
              className="
                mt-6
                max-w-[58ch]
                text-[16px]
                leading-[1.4]
                text-ink
                md:text-[24px]
              "
            >
              Our mission is to bring leading global automotive brands to our customers, 
              with local expertise, quality service and reliable aftersales care.

            </p>

          </motion.article>


          {/* ====================================================
              VISION
              ==================================================== */}

          <motion.article
            className="
              lg:pl-14
            "
            variants={contentItem}
          >

            <div className="flex items-center gap-4">

              <span className="h-px w-8 bg-gold" />

              <h3
                className="
                  font-display
                  text-base
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-navy-900
                  sm:text-lg
                "
              >
                Vision
              </h3>

            </div>

            <p
              className="
                mt-6
                max-w-[58ch]
                text-[16px]
                leading-[1.4]
                text-ink
                md:text-[24px]
              "
            >
              Our vision is to be a trusted automotive company in the UAE, bringing people closer to 
              innovative vehicles and creating better ownership experiences.

            </p>

          </motion.article>

        </motion.div>

      </div>
    </section>
  );
}