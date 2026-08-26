import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RevealGroup, RevealItem } from "@/components/mka/Reveal";
import { ContactUsHeaderBand } from "@/components/mka/contactus/ContactUsHeaderBands";
import { SiteHeader } from "@/components/mka/SiteHeader";
import { SiteFooter } from "@/components/mka/SiteFooter";

export const Route = createFileRoute("/contactus")({
  component: Contact,
});

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Vehicle Sales",
  "Service & Aftersales",
  "Genuine Parts",
  "Warranty",
  "Corporate Enquiry",
  "Careers",
  "Other",
];

const CONTACT_DETAILS = [
  {
    label: "Call",
    value: "+971 4 000 0000",
    href: "tel:+97140000000",
  },
  {
    label: "Email",
    value: "info@mahykoorayautomotive.com",
    href: "mailto:info@mahykoorayautomotive.com",
  },
];

function Contact() {
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
        <ContactUsHeaderBand />
      {/* ======================================================
          INTRO
          ====================================================== */}

      <section
        aria-labelledby="contact-title"
        className="section-y"
      >
        <div className="shell">

          <RevealGroup className="max-w-3xl">

            <RevealItem>
              <span className="eyebrow text-gold">
                Contact Us
              </span>
            </RevealItem>

            <RevealItem>
              <h1
                id="contact-title"
                className="h1-display mt-7 text-navy-900"
              >
                Let&apos;s start a conversation.
              </h1>
            </RevealItem>

            <RevealItem
              as="p"
              className="
                mt-6
                max-w-[62ch]
                text-[17px]
                leading-[1.75]
                text-grey-500
              "
            >
              Whether you are looking for a vehicle, need support
              with your ownership experience, or want to explore a
              business opportunity, our team is here to help.
            </RevealItem>

          </RevealGroup>


          {/* ====================================================
              CONTACT DETAILS
              ==================================================== */}

          <RevealGroup
            className="
              mt-16
              grid
              gap-px
              border
              border-grey-200
              bg-grey-200
              sm:grid-cols-2
              lg:max-w-4xl
            "
          >

            {CONTACT_DETAILS.map((item) => (
              <RevealItem key={item.label}>

                <a
                  href={item.href}
                  className="
                    group
                    block
                    bg-off-white
                    p-7
                    transition-colors
                    duration-300
                    hover:bg-grey-50
                    lg:p-9
                  "
                >

                  <span className="eyebrow text-gold">
                    {item.label}
                  </span>

                  <span
                    className="
                      mt-5
                      block
                      text-lg
                      text-navy-900
                      transition-colors
                      duration-300
                      group-hover:text-gold
                    "
                  >
                    {item.value}
                  </span>

                  <span
                    className="
                      mt-7
                      block
                      h-px
                      w-8
                      bg-gold
                      transition-all
                      duration-300
                      group-hover:w-14
                    "
                  />

                </a>

              </RevealItem>
            ))}

          </RevealGroup>

        </div>
      </section>


      {/* ======================================================
          ENQUIRY SECTION
          ====================================================== */}

      <section
        aria-labelledby="enquiry-title"
        className="section-y bg-navy-900"
      >
        <div className="shell">

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">

            {/* ------------------------------------------------
                LEFT CONTENT
                ------------------------------------------------ */}

            <RevealGroup className="lg:col-span-4">

              <RevealItem>
                <span className="eyebrow text-gold">
                  Get In Touch
                </span>
              </RevealItem>

              <RevealItem>
                <h2
                  id="enquiry-title"
                  className="h2-display mt-7 text-off-white"
                >
                  How can we help?
                </h2>
              </RevealItem>

              <RevealItem
                as="p"
                className="
                  mt-6
                  text-[16px]
                  leading-[1.8]
                  text-off-white/65
                "
              >
                Tell us what you are looking for and our team will
                make sure your enquiry reaches the right people.
              </RevealItem>

              <RevealItem>
                <div className="mt-10 border-t border-off-white/15 pt-6">

                  <span className="eyebrow text-off-white/45">
                    Address
                  </span>

                  <p
                    className="
                      mt-4
                      max-w-[35ch]
                      text-sm
                      leading-[1.8]
                      text-off-white/65
                    "
                  >
                    41, Near Abu Hail Metro Station,
                    <br />
                    Dubai, United Arab Emirates
                  </p>

                </div>
              </RevealItem>

              <RevealItem>
                <div className="mt-6 border-t border-off-white/15 pt-6">

                  <span className="eyebrow text-off-white/45">
                    Opening Hours
                  </span>

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-[1.8]
                      text-off-white/65
                    "
                  >
                    Monday – Saturday
                    <br />
                    8:00 AM – 6:00 PM
                  </p>

                </div>
              </RevealItem>

            </RevealGroup>


            {/* ------------------------------------------------
                FORM
                ------------------------------------------------ */}

            <RevealGroup className="lg:col-span-7 lg:col-start-6">

              {submitted ? (

                <RevealItem>

                  <div
                    className="
                      border
                      border-off-white/15
                      bg-off-white/[0.04]
                      p-8
                      sm:p-10
                    "
                  >

                    <span className="eyebrow text-gold">
                      Enquiry Received
                    </span>

                    <h3
                      className="
                        mt-5
                        text-2xl
                        text-off-white
                      "
                    >
                      Thank you for getting in touch.
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-[55ch]
                        text-[15px]
                        leading-[1.75]
                        text-off-white/60
                      "
                    >
                      Your enquiry has been received and will be
                      directed to the relevant team. Someone from
                      Mahy Khooray Automotive will get back to you
                      shortly.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="
                        mt-8
                        border
                        border-off-white/25
                        px-6
                        py-3
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.08em]
                        text-off-white
                        transition-colors
                        duration-300
                        hover:border-gold
                        hover:text-gold
                      "
                    >
                      Send Another Enquiry
                    </button>

                  </div>

                </RevealItem>

              ) : (

                <RevealItem>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >

                    {/* NAME + EMAIL */}

                    <div className="grid gap-8 sm:grid-cols-2">

                      <div>

                        <label
                          htmlFor="name"
                          className="
                            block
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            text-off-white/65
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
                            border-off-white/20
                            bg-transparent
                            px-0
                            text-sm
                            text-off-white
                            outline-none
                            placeholder:text-off-white/30
                            transition-colors
                            duration-300
                            focus:border-gold
                          "
                        />

                      </div>


                      <div>

                        <label
                          htmlFor="email"
                          className="
                            block
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            text-off-white/65
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
                            border-off-white/20
                            bg-transparent
                            px-0
                            text-sm
                            text-off-white
                            outline-none
                            placeholder:text-off-white/30
                            transition-colors
                            duration-300
                            focus:border-gold
                          "
                        />

                      </div>

                    </div>


                    {/* PHONE + ENQUIRY */}

                    <div className="grid gap-8 sm:grid-cols-2">

                      <div>

                        <label
                          htmlFor="phone"
                          className="
                            block
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            text-off-white/65
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
                            border-off-white/20
                            bg-transparent
                            px-0
                            text-sm
                            text-off-white
                            outline-none
                            placeholder:text-off-white/30
                            transition-colors
                            duration-300
                            focus:border-gold
                          "
                        />

                      </div>


                      <div>

                        <label
                          htmlFor="enquiry"
                          className="
                            block
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            text-off-white/65
                          "
                        >
                          Subject / Department
                        </label>

                        <select
                          id="enquiry"
                          name="enquiry"
                          required
                          defaultValue=""
                          className="
                            mt-3
                            h-12
                            w-full
                            border-b
                            border-off-white/20
                            bg-navy-900
                            px-0
                            text-sm
                            text-off-white
                            outline-none
                            transition-colors
                            duration-300
                            focus:border-gold
                          "
                        >

                          <option
                            value=""
                            disabled
                            className="bg-navy-900"
                          >
                            Select an enquiry type
                          </option>

                          {ENQUIRY_TYPES.map((type) => (
                            <option
                              key={type}
                              value={type}
                              className="bg-navy-900"
                            >
                              {type}
                            </option>
                          ))}

                        </select>

                      </div>

                    </div>


                    {/* MESSAGE */}

                    <div>

                      <label
                        htmlFor="message"
                        className="
                          block
                          text-xs
                          font-medium
                          uppercase
                          tracking-[0.08em]
                          text-off-white/65
                        "
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell us how we can help."
                        className="
                          mt-3
                          w-full
                          resize-none
                          border-b
                          border-off-white/20
                          bg-transparent
                          px-0
                          py-3
                          text-sm
                          leading-[1.7]
                          text-off-white
                          outline-none
                          placeholder:text-off-white/30
                          transition-colors
                          duration-300
                          focus:border-gold
                        "
                      />

                    </div>


                    {/* CONSENT */}

                    <div className="flex items-start gap-3">

                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        required
                        className="
                          mt-1
                          h-4
                          w-4
                          shrink-0
                          accent-gold
                        "
                      />

                      <label
                        htmlFor="privacy"
                        className="
                          text-xs
                          leading-[1.7]
                          text-off-white/45
                        "
                      >
                        I agree to the processing of my information
                        for the purpose of responding to this
                        enquiry.
                      </label>

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
                          border-white
                          bg-white
                          px-7
                          py-3.5
                          text-sm
                          font-medium
                          uppercase
                          tracking-[0.02em]
                          text-navy-900
                          transition-colors
                          duration-300
                          ease-in-out
                          hover:border-white
                          hover:bg-[#020229]
                          hover:text-white
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-white/40
                          focus-visible:ring-offset-2
                          focus-visible:ring-offset-navy-900
                        "
                      >

                        <span>
                          Submit
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


      {/* ======================================================
          LOCATION / FINAL CTA
          ====================================================== */}

      <section
        aria-labelledby="visit-title"
        className="section-y bg-off-white"
      >
        <div className="shell">

          <RevealGroup
            className="
              grid
              items-end
              gap-10
              lg:grid-cols-12
            "
          >

            <RevealItem className="lg:col-span-8">

              <span className="eyebrow text-gold">
                Visit Us
              </span>

              <h2
                id="visit-title"
                className="
                  h2-display
                  mt-7
                  max-w-3xl
                  text-navy-900
                "
              >
                Let&apos;s meet in Dubai.
              </h2>

              <p
                className="
                  mt-6
                  max-w-[55ch]
                  text-[16px]
                  leading-[1.8]
                  text-grey-500
                "
              >
                Our team is here to welcome you, answer your
                questions and help you find the right way forward.
              </p>

            </RevealItem>


            <RevealItem className="lg:col-span-4 lg:text-right">

              <a
                href="https://www.google.com/maps/search/?api=1&query=Abu+Hail+Dubai"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  border-b
                  border-navy-900
                  pb-2
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.06em]
                  text-navy-900
                  transition-colors
                  duration-300
                  hover:border-gold
                  hover:text-gold
                "
              >
                <span>
                  Get Directions
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
              </a>

            </RevealItem>

          </RevealGroup>

        </div>
      </section>
      <SiteFooter />
    </main>
  );
}