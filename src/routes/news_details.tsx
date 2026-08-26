import { createFileRoute } from '@tanstack/react-router'
import { SiteFooter } from "@/components/mka/SiteFooter";
import { SiteHeader } from "@/components/mka/SiteHeader";
import { RevealGroup, RevealItem } from "@/components/mka/Reveal";
import news1 from "@/assets/news-1.jpg";
import { NewsHeaderBand } from '@/components/mka/news/NewsHeaderBand';

const title =
  "Dongfeng introduces a new generation of intelligent mobility";

const description =
  "Advanced technology, refined design and connected features arrive across the latest Dongfeng range in the UAE.";

const TABLE_OF_CONTENTS = [
  {
    id: "intelligent-mobility",
    label: "A new era of intelligent mobility",
  },
  {
    id: "technology",
    label: "Technology designed around you",
  },
  {
    id: "driving-experience",
    label: "A refined driving experience",
  },
  {
    id: "available-in-uae",
    label: "Available across the UAE",
  },
];


export const Route = createFileRoute('/news_details')({
  component: NewsDetails,
})

function NewsDetails() {
  return <div>
    <SiteHeader />
    <NewsHeaderBand />

<main className="bg-off-white">

  {/* ======================================================
      ARTICLE HEADER
      ====================================================== */}

  <section className="section-y pb-0">
    <div className="shell">

      <RevealGroup className="mx-auto max-w-5xl">

        {/* Breadcrumb */}

        <RevealItem>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-grey-500"
          >
            <a
              href="/"
              className="transition-colors duration-300 hover:text-navy-900"
            >
              Home
            </a>

            <span aria-hidden="true">/</span>

            <a
              href="/news"
              className="transition-colors duration-300 hover:text-navy-900"
            >
              News & Insights
            </a>

            <span aria-hidden="true">/</span>

            <span className="text-grey-400">
              Article
            </span>
          </nav>
        </RevealItem>


        {/* Category + Date */}

        <RevealItem>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="eyebrow text-gold">
              Brand
            </span>

            <span className="h-px w-6 bg-grey-200" />

            <span className="text-xs text-grey-500">
              22 May 2026
            </span>
          </div>
        </RevealItem>


        {/* Heading */}

        <RevealItem>
          <h1
            className="
              mt-6
              max-w-5xl
              text-4xl
              leading-[1.05]
              tracking-[-0.025em]
              text-navy-900
              sm:text-5xl
              lg:text-6xl
            "
          >
            {title}
          </h1>
        </RevealItem>


        {/* Intro */}

        <RevealItem>
          <p
            className="
              mt-7
              max-w-3xl
              text-base
              leading-[1.75]
              text-grey-500
              sm:text-lg
            "
          >
            {description}
          </p>
        </RevealItem>

      </RevealGroup>


      {/* ==================================================
          FEATURE IMAGE
          ================================================== */}

      <RevealGroup className="mt-14">
        <RevealItem>
          <div className="overflow-hidden">
            <img
              src={news1}
              alt={title}
              width={1920}
              height={1080}
              className="
                aspect-[16/8]
                w-full
                object-cover
              "
            />
          </div>
        </RevealItem>
      </RevealGroup>

    </div>
  </section>


  {/* ======================================================
      ARTICLE BODY
      ====================================================== */}

  <section className="pb-24 pt-16 lg:pb-32 lg:pt-24">
    <div className="shell">

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

        {/* ==================================================
            TABLE OF CONTENTS
            ================================================== */}

        <aside className="lg:col-span-3">

          {/* ----------------------------------------------
              DESKTOP TOC
              ---------------------------------------------- */}

          <div className="sticky top-28 hidden lg:block">

            <p className="eyebrow text-grey-500">
              Table of Contents
            </p>

            <nav className="mt-5 border-l border-grey-200">
              <ul>
                {TABLE_OF_CONTENTS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="
                        relative
                        block
                        border-l
                        border-transparent
                        py-2
                        pl-5
                        text-sm
                        leading-relaxed
                        text-grey-500
                        transition-all
                        duration-300
                        hover:border-gold
                        hover:text-navy-900
                      "
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

          </div>


          {/* ----------------------------------------------
              TABLET + MOBILE TOC
              ---------------------------------------------- */}

          <details
            className="
              group
              border-y
              border-grey-200
              lg:hidden
            "
          >
            <summary
              className="
                flex
                cursor-pointer
                list-none
                items-center
                justify-between
                gap-6
                py-5
                text-sm
                font-medium
                uppercase
                tracking-[0.08em]
                text-navy-900
              "
            >
              <span>
                Table of Contents
              </span>

              <span
                aria-hidden="true"
                className="
                  text-lg
                  leading-none
                  transition-transform
                  duration-300
                  group-open:rotate-45
                "
              >
                +
              </span>
            </summary>

            <nav className="pb-5">
              <ul className="space-y-1">
                {TABLE_OF_CONTENTS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="
                        block
                        py-2
                        text-sm
                        leading-relaxed
                        text-grey-500
                        transition-colors
                        duration-300
                        hover:text-navy-900
                      "
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>

        </aside>


        {/* ==================================================
            ARTICLE
            ================================================== */}

        <article
          className="
            lg:col-span-8
            lg:col-start-5
          "
        >

          {/* =================================================
              INTRO
              ================================================= */}

          <RevealGroup>

            <RevealItem>
              <p
                className="
                  text-lg
                  leading-[1.8]
                  text-navy-900
                  sm:text-xl
                "
              >
                Dongfeng continues to strengthen its presence
                in the UAE with a new generation of vehicles
                focused on intelligent technology, contemporary
                design and a more connected ownership experience.
              </p>
            </RevealItem>


            {/* =================================================
                SECTION 1
                ================================================= */}

            <RevealItem>
              <section
                id="intelligent-mobility"
                className="scroll-mt-28"
              >
                <h2 className="mt-12 text-2xl leading-tight text-navy-900 sm:text-3xl">
                  A new era of intelligent mobility
                </h2>

                <p className="mt-6 text-[16px] leading-[1.85] text-grey-500">
                  The latest Dongfeng range reflects a shift
                  towards vehicles that combine everyday
                  practicality with intelligent systems designed
                  to make journeys more comfortable and
                  connected.
                </p>

                <p className="mt-5 text-[16px] leading-[1.85] text-grey-500">
                  From advanced cabin technology to thoughtfully
                  integrated driver assistance features, the
                  focus is on creating an experience that feels
                  intuitive from the moment you get behind the
                  wheel.
                </p>
              </section>
            </RevealItem>


            {/* =================================================
                SECTION 2
                ================================================= */}

            <RevealItem>
              <section
                id="technology"
                className="scroll-mt-28"
              >
                <h2 className="mt-12 text-2xl leading-tight text-navy-900 sm:text-3xl">
                  Technology designed around you
                </h2>

                <p className="mt-6 text-[16px] leading-[1.85] text-grey-500">
                  Technology across the latest models is
                  designed to support the way people use their
                  vehicles every day. Connected interfaces,
                  intuitive controls and smart features bring
                  convenience into the cabin without
                  overwhelming the driving experience.
                </p>

                <p className="mt-5 text-[16px] leading-[1.85] text-grey-500">
                  This approach extends beyond individual
                  features. It is about creating a seamless
                  relationship between the vehicle, its
                  occupants and the road ahead.
                </p>
              </section>
            </RevealItem>


            {/* =================================================
                SECTION 3
                ================================================= */}

            <RevealItem>
              <section
                id="driving-experience"
                className="scroll-mt-28"
              >
                <h2 className="mt-12 text-2xl leading-tight text-navy-900 sm:text-3xl">
                  A refined driving experience
                </h2>

                <p className="mt-6 text-[16px] leading-[1.85] text-grey-500">
                  Alongside technology, the new generation
                  places equal emphasis on comfort, refinement
                  and everyday usability. Carefully considered
                  interiors, practical space and modern design
                  come together to create a more enjoyable
                  environment for both short journeys and longer
                  drives.
                </p>

                <p className="mt-5 text-[16px] leading-[1.85] text-grey-500">
                  The result is a vehicle range designed to fit
                  naturally into the diverse needs of UAE
                  motorists.
                </p>
              </section>
            </RevealItem>


            {/* =================================================
                SECTION 4
                ================================================= */}

            <RevealItem>
              <section
                id="available-in-uae"
                className="scroll-mt-28"
              >
                <h2 className="mt-12 text-2xl leading-tight text-navy-900 sm:text-3xl">
                  Available across the UAE
                </h2>

                <p className="mt-6 text-[16px] leading-[1.85] text-grey-500">
                  Through its growing network, Mahy Khoory
                  Automotive continues to bring Dongfeng
                  vehicles closer to customers across the
                  Emirates.
                </p>

                <p className="mt-5 text-[16px] leading-[1.85] text-grey-500">
                  Customers can explore the latest models
                  through MKA showrooms while also benefiting
                  from dedicated aftersales support, genuine
                  parts and warranty services throughout their
                  ownership journey.
                </p>
              </section>
            </RevealItem>

          </RevealGroup>


          {/* ==================================================
              ARTICLE FOOTER
              ================================================== */}

          <div className="mt-16 border-t border-grey-200 pt-8">

            <a
              href="/news_insights"
              className="
                group
                inline-flex
                items-center
                gap-3
                text-sm
                font-medium
                uppercase
                tracking-[0.06em]
                text-navy-900
              "
            >
              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              >
                ←
              </span>

              Back to News & Insights
            </a>

          </div>

        </article>

      </div>

    </div>
  </section>

</main>

<SiteFooter />
  </div>
}