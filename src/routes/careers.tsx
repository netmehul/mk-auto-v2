"use client";

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RevealGroup, RevealItem } from "@/components/mka/Reveal";
import { SiteHeader } from "@/components/mka/SiteHeader";
import { SiteFooter } from "@/components/mka/SiteFooter";
import { CareerHeaderBand } from "@/components/mka/careers/CareerHeaderBand";
import CareerImage from '@/assets/careers-life.webp';
import CareerBanner from '@/assets/career-page.webp';
import PurposeCareer from '@/assets/purpose_career.webp';
import PurposeOpportunity from '@/assets/purpose_opportunity.webp';
import PurposePeople from '@/assets/purpose_people.webp';
import BuildChapterImage from '@/assets/build_chapter_image.webp';
import { FormEvent } from "react";

export const Route = createFileRoute("/careers")({
  component: Careers,
});

const DEPARTMENTS = [
  "Sales",
  "Aftersales",
  "Service",
  "Parts",
  "Marketing & Communications",
  "Finance",
  "Human Resources",
  "Administration",
  "Other",
];

const WHY_WORK_WITH_US = [
  {
    number: "01",
    title: "Purpose",
    text: "Be part of a team helping shape the next chapter of automotive mobility in the UAE.",
    image: PurposeCareer,
  },
  {
    number: "02",
    title: "People",
    text: "Work alongside people who bring different experiences, perspectives and expertise to the journey.",
    image: PurposePeople,
  },
  {
    number: "03",
    title: "Opportunity",
    text: "Build your experience across a growing automotive business with opportunities to take on meaningful responsibilities.",
    image: PurposeOpportunity,
  },
];

function Careers() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-off-white text-navy-900">
      <SiteHeader />
      <CareerHeaderBand />

      {/* ======================================================
          WHY WORK WITH US
        ====================================================== */}

      <section
        aria-labelledby="why-work-with-us"
        className="section-y"
      >
        <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">

        
          <RevealGroup className="lg:col-span-6">
            <RevealItem>
              <h2
                id="why-work-with-us"
                className="h2-display uppercase mt-7 max-w-3xl text-navy-900"
              >
                Build your next chapter with a team that keeps moving forward.
              </h2>
            </RevealItem>

            <RevealItem>
              <p
                className="
                  mt-6
                  max-w-[62ch]
                  text-[17px]
                  leading-[1.75]
                  text-grey-500
                "
              >
                At Mahy Khooray Automotive, we believe progress starts
                with people. Our work brings together automotive brands,
                customer experiences and teams working towards a shared
                ambition for the future.
              </p>
            </RevealItem>
          </RevealGroup>
          <RevealGroup className="lg:col-span-6">
            <img src={BuildChapterImage} />
          </RevealGroup>
          </div>
          <RevealGroup
            className="
              mt-16
              grid
              gap-px
              border
              border-grey-200
              bg-grey-200
              md:grid-cols-3
            "
          >
            {WHY_WORK_WITH_US.map((item) => (
              <RevealItem key={item.number}>
                <div
                  className="
                    group
                    h-full
                    bg-off-white
                    p-7
                    transition-colors
                    duration-300
                    hover:bg-grey-50
                    lg:p-4
                    flex flex-col
                    gap-4
                  "
                >
                  <span className="text-xs tracking-[0.12em] text-gold">
                    {item.number}
                  </span>
                  <h3 className="text-2xl uppercase leading-tight text-navy-900">
                    {item.title}
                  </h3>
                  <img src={item.image} />
                  <p
                    className="
                      mt-4
                      text-[15px]
                      leading-[1.75]
                      text-grey-500
                    "
                  >
                    {item.text}
                  </p>
                  
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ======================================================
          LIFE AT MAHY KHOORAY AUTOMOTIVE
        ====================================================== */}

      <section
        aria-labelledby="life-at-mahy-khooray"
        className="section-y bg-navy-900"
      >
        <div className="shell">

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">

            <RevealGroup className="lg:col-span-6">
              <RevealItem>
                <div className="overflow-hidden">
                  <img
                    src={CareerImage}
                    alt="Team at Mahy Khooray Automotive"
                    width={1600}
                    height={1100}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </RevealItem>
            </RevealGroup>

            <RevealGroup className="lg:col-span-6">
              <RevealItem>
                <h2
                  id="life-at-mahy-khooray"
                  className="h2-display mt-7 uppercase text-off-white"
                >
                  Different roles. One direction.
                </h2>
              </RevealItem>

              <RevealItem>
                <p
                  className="
                    mt-6
                    text-[16px]
                    leading-[1.8]
                    text-off-white/65
                  "
                >
                  From the showroom floor to service operations,
                  customer support and corporate teams, every role
                  contributes to the experience we create for our
                  customers and partners.
                </p>
              </RevealItem>

              <RevealItem>
                <p
                  className="
                    mt-5
                    text-[16px]
                    leading-[1.8]
                    text-off-white/65
                  "
                >
                  We value people who bring curiosity, accountability
                  and a willingness to keep learning. Wherever your
                  role sits within the business, there is an opportunity
                  to make an impact.
                </p>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>

        <div className="shell">
          <RevealGroup className="w-full mt-24 mb-24">
            <img src={CareerBanner} />
          </RevealGroup>
        </div>

        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">

            <RevealGroup className="lg:col-span-5">
              <RevealItem>
                <h2
                  id="growth-development"
                  className="h2-display mt-7 uppercase text-off-white"
                >
                  Keep learning. Keep moving.
                </h2>
              </RevealItem>

              <RevealItem>
                <p
                  className="
                    mt-6
                    text-[16px]
                    leading-[1.8]
                    text-off-white/65
                  "
                >
                  A career is built one experience at a time. We
                  believe people grow when they are given opportunities
                  to learn, contribute and take on new challenges.
                </p>
              </RevealItem>
            </RevealGroup>

            <RevealGroup className="lg:col-span-6 lg:col-start-7">

              <RevealItem>
                <div className="border-t border-off-white/15 py-6">
                  <div className="flex gap-6">

                    <span className="shrink-0 text-xs tracking-[0.12em] text-gold">
                      01
                    </span>

                    <div>
                      <h3 className="text-xl text-off-white">
                        Learn through experience
                      </h3>

                      <p
                        className="
                          mt-3
                          text-[15px]
                          leading-[1.75]
                          text-off-white/60
                        "
                      >
                        Take on responsibilities that expand your
                        knowledge and give you the opportunity to
                        develop through real-world experience.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="border-t border-off-white/15 py-6">
                  <div className="flex gap-6">

                    <span className="shrink-0 text-xs tracking-[0.12em] text-gold">
                      02
                    </span>

                    <div>
                      <h3 className="text-xl text-off-white">
                        Take on new challenges
                      </h3>
                      <p
                        className="
                          mt-3
                          text-[15px]
                          leading-[1.75]
                          text-off-white/60
                        "
                      >
                        Growth often begins outside your comfort
                        zone. We value people who are ready to step
                        forward and embrace new opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="border-y border-off-white/15 py-6">
                  <div className="flex gap-6">

                    <span className="shrink-0 text-xs tracking-[0.12em] text-gold">
                      03
                    </span>

                    <div>
                      <h3 className="text-xl text-off-white">
                        Build what comes next
                      </h3>
                      <p
                        className="
                          mt-3
                          text-[15px]
                          leading-[1.75]
                          text-off-white/60
                        "
                      >
                        Bring your ideas, experience and ambition to
                        a business that is continuing to evolve with
                        the automotive landscape.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ======================================================
          APPLICATION FORM
        ====================================================== */}
      <section
        id="apply"
        aria-labelledby="application-title"
        className="section-y bg-off-white"
      >
        <div className="shell">

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">

            <RevealGroup className="lg:col-span-5">
              <RevealItem>
                <h2
                  id="application-title"
                  className="h2-display mt-7 uppercase text-navy-900"
                >
                  Want to join our team?
                </h2>
              </RevealItem>

              <RevealItem>
                <p
                  className="
                    mt-6
                    text-[16px]
                    leading-[1.8]
                    text-grey-500
                  "
                >
                  Tell us a little about yourself, your experience
                  and where you see yourself contributing at
                  Mahy Khooray Automotive.
                </p>
              </RevealItem>

              <RevealItem>
                <p
                  className="
                    mt-5
                    text-[16px]
                    leading-[1.8]
                    text-grey-500
                  "
                >
                  We are always interested in meeting people who
                  are passionate about what they do and ready to
                  move forward.
                </p>
              </RevealItem>
            </RevealGroup>

            <RevealGroup className="lg:col-span-7 lg:col-start-6">

              {submitted ? (
                <RevealItem>
                  <div
                    className="
                      border
                      border-grey-200
                      bg-white
                      p-8
                      sm:p-10
                    "
                  >
                    <h3 className="mt-5 text-2xl text-navy-900">
                      Thank you for your interest.
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-[55ch]
                        text-[15px]
                        leading-[1.75]
                        text-grey-500
                      "
                    >
                      Your application has been submitted for review.
                      Our team will be in touch if your experience
                      matches a suitable opportunity.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="
                        mt-8
                        border
                        border-navy-900
                        px-6
                        py-3
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.08em]
                        text-navy-900
                        transition-colors
                        duration-300
                        hover:border-gold
                        hover:text-gold
                      "
                    >
                      Submit Another Application
                    </button>
                  </div>
                </RevealItem>
              ) : (
                <RevealItem>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >

                    {/* NAME */}
                    <div>
                      <label
                        htmlFor="name"
                        className="
                          block
                          text-xs
                          font-medium
                          uppercase
                          tracking-[0.08em]
                          text-grey-500
                        "
                      >
                        Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="
                          mt-3
                          h-12
                          w-full
                          border-b
                          border-grey-200
                          bg-transparent
                          px-0
                          text-sm
                          text-navy-900
                          outline-none
                          placeholder:text-grey-400
                          transition-colors
                          duration-300
                          focus:border-gold
                        "
                      />
                    </div>

                    {/* EMAIL + PHONE */}
                    <div className="grid gap-8 sm:grid-cols-2">

                      <div>
                        <label
                          htmlFor="email"
                          className="
                            block
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            text-grey-500
                          "
                        >
                          Email
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="
                            mt-3
                            h-12
                            w-full
                            border-b
                            border-grey-200
                            bg-transparent
                            px-0
                            text-sm
                            text-navy-900
                            outline-none
                            placeholder:text-grey-400
                            transition-colors
                            duration-300
                            focus:border-gold
                          "
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="
                            block
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            text-grey-500
                          "
                        >
                          Phone
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+971"
                          className="
                            mt-3
                            h-12
                            w-full
                            border-b
                            border-grey-200
                            bg-transparent
                            px-0
                            text-sm
                            text-navy-900
                            outline-none
                            placeholder:text-grey-400
                            transition-colors
                            duration-300
                            focus:border-gold
                          "
                        />
                      </div>
                    </div>

                    {/* DEPARTMENT */}
                    <div>
                      <label
                        htmlFor="department"
                        className="
                          block
                          text-xs
                          font-medium
                          uppercase
                          tracking-[0.08em]
                          text-grey-500
                        "
                      >
                        Role / Department of Interest
                      </label>

                      <select
                        id="department"
                        name="department"
                        required
                        defaultValue=""
                        className="
                          mt-3
                          h-12
                          w-full
                          border-b
                          border-grey-200
                          bg-off-white
                          px-0
                          text-sm
                          text-navy-900
                          outline-none
                          transition-colors
                          duration-300
                          focus:border-gold
                        "
                      >
                        <option
                          value=""
                          disabled
                          className="bg-off-white text-grey-500"
                        >
                          Select an area
                        </option>

                        {DEPARTMENTS.map((department) => (
                          <option
                            key={department}
                            value={department}
                            className="bg-off-white text-navy-900"
                          >
                            {department}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* CV */}
                    <div>
                      <label
                        htmlFor="cv"
                        className="
                          block
                          text-xs
                          font-medium
                          uppercase
                          tracking-[0.08em]
                          text-grey-500
                        "
                      >
                        CV / Resume
                      </label>

                      <div
                        className="
                          mt-3
                          border
                          border-dashed
                          border-grey-200
                          p-6
                          transition-colors
                          duration-300
                          hover:border-grey-400
                        "
                      >
                        <input
                          id="cv"
                          name="cv"
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          className="
                            block
                            w-full
                            cursor-pointer
                            text-sm
                            text-grey-500
                            file:mr-4
                            file:border-0
                            file:bg-navy-900
                            file:px-4
                            file:py-2
                            file:text-xs
                            file:font-medium
                            file:uppercase
                            file:tracking-[0.06em]
                            file:text-off-white
                            file:transition-colors
                            hover:file:bg-gold
                          "
                        />

                        <p className="mt-3 text-xs text-grey-400">
                          PDF, DOC or DOCX
                        </p>
                      </div>
                    </div>

                    {/* COVER MESSAGE */}
                    <div>
                      <label
                        htmlFor="message"
                        className="
                          block
                          text-xs
                          font-medium
                          uppercase
                          tracking-[0.08em]
                          text-grey-500
                        "
                      >
                        Short Cover Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us briefly about yourself and what you could bring to the team."
                        className="
                          mt-3
                          w-full
                          resize-none
                          border-b
                          border-grey-200
                          bg-transparent
                          px-0
                          py-3
                          text-sm
                          leading-[1.7]
                          text-navy-900
                          outline-none
                          placeholder:text-grey-400
                          transition-colors
                          duration-300
                          focus:border-gold
                        "
                      />
                    </div>

                    {/* SUBMIT */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="
                          group
                          inline-flex
                          min-h-[48px]
                          items-center
                          justify-center
                          gap-3
                          border
                          border-navy-900
                          bg-navy-900
                          px-7
                          py-3.5
                          text-sm
                          font-medium
                          uppercase
                          tracking-[0.02em]
                          text-off-white
                          transition-colors
                          duration-300
                          ease-in-out
                          hover:border-navy-900
                          hover:bg-white
                          hover:text-navy-900
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-navy-900/20
                          focus-visible:ring-offset-2
                          focus-visible:ring-offset-off-white
                        "
                      >
                        <span>
                          Submit Application
                        </span>

                        <span
                          aria-hidden="true"
                          className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                          "
                        >
                          →
                        </span>
                      </button>
                    </div>
                  </form>
                </RevealItem>
              )}
            </RevealGroup>
          </div>
        </div>
      </section>

      <SiteFooter />

    </main>
  );
}