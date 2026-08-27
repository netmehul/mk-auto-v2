import { useState, useEffect, ChangeEvent, FocusEvent, FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RevealGroup, RevealItem } from "@/components/mka/Reveal";
import { ContactUsHeaderBand } from "@/components/mka/contactus/ContactUsHeaderBands";
import { SiteHeader } from "@/components/mka/SiteHeader";
import { SiteFooter } from "@/components/mka/SiteFooter";
import { Loader2, AlertCircle } from "lucide-react";
import { PhoneInputField } from "@/components/mka/PhoneInputField";
import { validatePhoneNumber, formatFullPhoneNumber } from "@/lib/phoneValidation";
import {
  fetchContactSubjects,
  ContactSubject,
  FALLBACK_CONTACT_SUBJECTS,
} from "@/lib/contactSubjects";

export const Route = createFileRoute("/contactus")({
  component: Contact,
});

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

interface ContactFormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
}

type FieldName = keyof ContactFormData;
type ContactFormErrors = Partial<Record<FieldName, string>>;
type ContactFormTouched = Partial<Record<FieldName, boolean>>;

function Contact() {
  const [subjects, setSubjects] = useState<ContactSubject[]>(FALLBACK_CONTACT_SUBJECTS);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState<boolean>(true);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    countryCode: "+971",
    phone: "",
    subject: "",
    message: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<ContactFormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadSubjects() {
      try {
        setIsLoadingSubjects(true);
        const data = await fetchContactSubjects({ signal: abortController.signal });
        if (data && data.length > 0) {
          setSubjects(data);
        }
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError") {
          console.warn("Could not fetch contact subjects, using fallback list:", err);
        }
      } finally {
        setIsLoadingSubjects(false);
      }
    }

    loadSubjects();

    return () => {
      abortController.abort();
    };
  }, []);

  const validateField = (name: FieldName, value: string | boolean): string | undefined => {
    switch (name) {
      case "name":
        if (typeof value === "string") {
          if (!value.trim()) return "Full name is required";
          if (value.trim().length < 2) return "Name must be at least 2 characters";
        }
        return undefined;

      case "email":
        if (typeof value === "string") {
          if (!value.trim()) return "Email address is required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            return "Please enter a valid email address";
          }
        }
        return undefined;

      case "phone":
        if (typeof value === "string") {
          return validatePhoneNumber(value, formData.countryCode);
        }
        return undefined;

      case "countryCode":
        return undefined;

      case "subject":
        if (typeof value === "string") {
          if (!value.trim()) return "Please select a subject or enquiry type";
        }
        return undefined;

      case "message":
        if (typeof value === "string") {
          if (!value.trim()) return "Message is required";
          if (value.trim().length < 10) {
            return "Message must be at least 10 characters";
          }
        }
        return undefined;

      case "privacy":
        if (!value) {
          return "You must agree to the processing of your information";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: ContactFormErrors = {};

    const nameErr = validateField("name", formData.name);
    if (nameErr) newErrors["name"] = nameErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors["email"] = emailErr;

    const phoneErr = validatePhoneNumber(formData.phone, formData.countryCode);
    if (phoneErr) newErrors["phone"] = phoneErr;

    const subjectErr = validateField("subject", formData.subject);
    if (subjectErr) newErrors["subject"] = subjectErr;

    const msgErr = validateField("message", formData.message);
    if (msgErr) newErrors["message"] = msgErr;

    const privacyErr = validateField("privacy", formData.privacy);
    if (privacyErr) newErrors["privacy"] = privacyErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setFieldError = (field: FieldName, error: string | undefined) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleCountryCodeChange = (newCode: string) => {
    setFormData((prev) => ({ ...prev, countryCode: newCode }));
    if (touched["phone"] && formData.phone) {
      const err = validatePhoneNumber(formData.phone, newCode);
      setFieldError("phone", err);
    }
  };

  const handlePhoneChange = (newPhone: string) => {
    setFormData((prev) => ({ ...prev, phone: newPhone }));
    if (touched["phone"]) {
      const err = validatePhoneNumber(newPhone, formData.countryCode);
      setFieldError("phone", err);
    }
    if (formError) setFormError(null);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as FieldName;
    const value = e.target.type === "checkbox" 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setFieldError(name, error);
    }
    if (formError) setFormError(null);
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as FieldName;
    const value = e.target.type === "checkbox" 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFieldError(name, error);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
      privacy: true,
    });

    const isValid = validateAll();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const baseUrl = (import.meta.env["VITE_BACKEND_URL"] as string | undefined) || "http://192.168.1.161:8000/api";
      const endpoint = `${baseUrl.replace(/\/+$/, "")}/contact-leads`;

      const myHeaders = new Headers();
      const apiToken = import.meta.env["VITE_API_TOKEN"] as string | undefined;
      if (apiToken) {
        myHeaders.append("Authorization", apiToken);
      }

      const formdata = new FormData();
      formdata.append("name", formData.name.trim());
      formdata.append("email", formData.email.trim());
      formdata.append("phone", formatFullPhoneNumber(formData.countryCode, formData.phone));
      formdata.append("contact_subject_id", formData.subject.trim());
      formdata.append("message", formData.message.trim());

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(endpoint, requestOptions);

      if (!response.ok) {
        let errorDetail = `Server returned status ${response.status}`;
        try {
          const errJson = await response.json();
          errorDetail = errJson.message || errJson.error || errorDetail;
        } catch {
          const errText = await response.text();
          if (errText) errorDetail = errText;
        }
        throw new Error(errorDetail);
      }

      const result = await response.text();
      console.log("Contact lead submitted successfully:", result);

      setSubmitted(true);

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        countryCode: "+971",
        phone: "",
        subject: "",
        message: "",
        privacy: false,
      });
      setErrors({});
      setTouched({});
      setFormError(null);
    } catch (error: unknown) {
      console.error("Contact lead error:", error);
      const message = error instanceof Error ? error.message : "Failed to submit enquiry. Please check your connection and try again.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      countryCode: "+971",
      phone: "",
      subject: "",
      message: "",
      privacy: false,
    });
    setErrors({});
    setTouched({});
    setFormError(null);
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
                      onClick={handleReset}
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
                    noValidate
                    className="space-y-8"
                  >
                    {formError && (
                      <div className="flex items-start gap-3 border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-300">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        <div>
                          <p className="font-medium">Submission Failed</p>
                          <p className="mt-1 text-xs text-red-300/90">{formError}</p>
                        </div>
                      </div>
                    )}

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
                          Name <span className="text-red-400">*</span>
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Your full name"
                          className={`
                            mt-3
                            h-12
                            w-full
                            border-b
                            bg-transparent
                            px-0
                            text-sm
                            text-off-white
                            outline-none
                            placeholder:text-off-white/30
                            transition-colors
                            duration-300
                            ${
                              errors["name"] && touched["name"]
                                ? "border-red-400 focus:border-red-400"
                                : "border-off-white/20 focus:border-gold"
                            }
                          `}
                        />
                        {errors["name"] && touched["name"] && (
                          <p className="mt-1.5 text-xs text-red-400">{errors["name"]}</p>
                        )}

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
                          Email <span className="text-red-400">*</span>
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="you@example.com"
                          className={`
                            mt-3
                            h-12
                            w-full
                            border-b
                            bg-transparent
                            px-0
                            text-sm
                            text-off-white
                            outline-none
                            placeholder:text-off-white/30
                            transition-colors
                            duration-300
                            ${
                              errors["email"] && touched["email"]
                                ? "border-red-400 focus:border-red-400"
                                : "border-off-white/20 focus:border-gold"
                            }
                          `}
                        />
                        {errors["email"] && touched["email"] && (
                          <p className="mt-1.5 text-xs text-red-400">{errors["email"]}</p>
                        )}

                      </div>

                    </div>


                    {/* PHONE + ENQUIRY */}

                    <div className="grid gap-8 sm:grid-cols-2">

                        <PhoneInputField
                          id="phone"
                          name="phone"
                          countryCode={formData.countryCode}
                          phone={formData.phone}
                          onCountryCodeChange={handleCountryCodeChange}
                          onPhoneChange={handlePhoneChange}
                          onBlur={() => {
                            setTouched((prev) => ({ ...prev, phone: true }));
                            const err = validatePhoneNumber(formData.phone, formData.countryCode);
                            setFieldError("phone", err);
                          }}
                          error={errors["phone"]}
                          touched={touched["phone"]}
                          theme="dark"
                          required
                        />


                      <div>

                        <label
                          htmlFor="subject"
                          className="
                            block
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            text-off-white/65
                          "
                        >
                          Subject / Department <span className="text-red-400">*</span>
                        </label>

                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isLoadingSubjects && subjects.length === 0}
                          className={`
                            mt-3
                            h-12
                            w-full
                            border-b
                            bg-navy-900
                            px-0
                            text-sm
                            text-off-white
                            outline-none
                            transition-colors
                            duration-300
                            ${
                              errors["subject"] && touched["subject"]
                                ? "border-red-400 focus:border-red-400"
                                : "border-off-white/20 focus:border-gold"
                            }
                          `}
                        >

                          <option
                            value=""
                            disabled
                            className="bg-navy-900 text-off-white"
                          >
                            {isLoadingSubjects && subjects.length === 0
                              ? "Loading enquiry types..."
                              : "Select an enquiry type"}
                          </option>

                          {subjects.map((item) => {
                            const optionVal =
                              item.id !== undefined && item.id !== null
                                ? String(item.id)
                                : item.name;
                            return (
                              <option
                                key={optionVal}
                                value={optionVal}
                                className="bg-navy-900 text-off-white"
                              >
                                {item.name}
                              </option>
                            );
                          })}

                        </select>
                        {errors["subject"] && touched["subject"] && (
                          <p className="mt-1.5 text-xs text-red-400">{errors["subject"]}</p>
                        )}

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
                        Message <span className="text-red-400">*</span>
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={6}
                        placeholder="Tell us how we can help."
                        className={`
                          mt-3
                          w-full
                          resize-none
                          border-b
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
                          ${
                            errors["message"] && touched["message"]
                              ? "border-red-400 focus:border-red-400"
                              : "border-off-white/20 focus:border-gold"
                          }
                        `}
                      />
                      {errors["message"] && touched["message"] && (
                        <p className="mt-1.5 text-xs text-red-400">{errors["message"]}</p>
                      )}

                    </div>


                    {/* CONSENT */}

                    <div>
                      <div className="flex items-start gap-3">

                        <input
                          id="privacy"
                          name="privacy"
                          type="checkbox"
                          checked={formData.privacy}
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                      {errors["privacy"] && touched["privacy"] && (
                        <p className="mt-1.5 text-xs text-red-400">{errors["privacy"]}</p>
                      )}
                    </div>


                    {/* SUBMIT */}

                    <div className="pt-2">

                      <button
                        type="submit"
                        disabled={isSubmitting}
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
                          disabled:cursor-not-allowed
                          disabled:opacity-70
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-white/40
                          focus-visible:ring-offset-2
                          focus-visible:ring-offset-navy-900
                        "
                      >

                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}

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