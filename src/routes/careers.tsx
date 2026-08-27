import { useState, useEffect, useRef, ChangeEvent, FocusEvent, FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RevealGroup, RevealItem } from "@/components/mka/Reveal";
import { SiteHeader } from "@/components/mka/SiteHeader";
import { SiteFooter } from "@/components/mka/SiteFooter";
import { CareerHeaderBand } from "@/components/mka/careers/CareerHeaderBand";
import PurposeCareer from '@/assets/purpose_career.webp';
import PurposeOpportunity from '@/assets/purpose_opportunity.webp';
import PurposePeople from '@/assets/purpose_people.webp';
import BuildChapterImage from '@/assets/build_chapter_image.webp';
import { Loader2, AlertCircle, CheckCircle2, FileText, X } from "lucide-react";
import { PhoneInputField } from "@/components/mka/PhoneInputField";
import { validatePhoneNumber, formatFullPhoneNumber } from "@/lib/phoneValidation";
import { fetchJobRoles, JobRole, FALLBACK_JOB_ROLES } from "@/lib/jobRoles";

export const Route = createFileRoute("/careers")({
  component: Careers,
});



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

interface CareerFormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  department: string;
  message: string;
}

type FieldName = keyof CareerFormData | "cv";

type CareerFormErrors = Partial<Record<FieldName, string>>;
type CareerFormTouched = Partial<Record<FieldName, boolean>>;

function Careers() {
  const [jobRoles, setJobRoles] = useState<JobRole[]>(FALLBACK_JOB_ROLES);
  const [isLoadingRoles, setIsLoadingRoles] = useState<boolean>(true);
  const [formData, setFormData] = useState<CareerFormData>({
    name: "",
    email: "",
    countryCode: "+971",
    phone: "",
    department: "",
    message: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<CareerFormErrors>({});
  const [touched, setTouched] = useState<CareerFormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadRoles() {
      try {
        setIsLoadingRoles(true);
        const data = await fetchJobRoles({ signal: abortController.signal });
        if (data && data.length > 0) {
          setJobRoles(data);
        }
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError") {
          console.warn("Could not fetch job roles, using fallback list:", err);
        }
      } finally {
        setIsLoadingRoles(false);
      }
    }

    loadRoles();

    return () => {
      abortController.abort();
    };
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateField = (name: FieldName, value: string, file: File | null = cvFile): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return undefined;

      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address";
        }
        return undefined;

      case "phone":
        return validatePhoneNumber(value, formData.countryCode);

      case "countryCode":
        return undefined;

      case "department":
        if (!value.trim()) return "Please select a role or department";
        return undefined;

      case "cv":
        if (!file) return "Please upload your CV / Resume";
        if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
          return "CV must be a PDF, DOC, or DOCX file";
        }
        if (file.size > 10 * 1024 * 1024) {
          return "File size must not exceed 10MB";
        }
        return undefined;

      case "message":
        if (!value.trim()) return "Cover message is required";
        if (value.trim().length < 10) {
          return "Cover message must be at least 10 characters";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: CareerFormErrors = {};

    const nameErr = validateField("name", formData.name);
    if (nameErr) newErrors["name"] = nameErr;

    const emailErr = validateField("email", formData.email);
    if (emailErr) newErrors["email"] = emailErr;

    const phoneErr = validatePhoneNumber(formData.phone, formData.countryCode);
    if (phoneErr) newErrors["phone"] = phoneErr;

    const deptErr = validateField("department", formData.department);
    if (deptErr) newErrors["department"] = deptErr;

    const cvErr = validateField("cv", "", cvFile);
    if (cvErr) newErrors["cv"] = cvErr;

    const msgErr = validateField("message", formData.message);
    if (msgErr) newErrors["message"] = msgErr;

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
    const name = e.target.name as keyof CareerFormData;
    const { value } = e.target;
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
    const name = e.target.name as keyof CareerFormData;
    const { value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFieldError(name, error);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCvFile(file);
    setTouched((prev) => ({ ...prev, cv: true }));
    const error = validateField("cv", "", file);
    setFieldError("cv", error);
    if (formError) setFormError(null);
  };

  const handleRemoveFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (touched["cv"]) {
      setFieldError("cv", "Please upload your CV / Resume");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      department: true,
      cv: true,
      message: true,
    });

    const isValid = validateAll();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const baseUrl = (import.meta.env["VITE_BACKEND_URL"] as string | undefined) || "http://192.168.1.161:8000/api";
      const endpoint = `${baseUrl.replace(/\/+$/, "")}/career-applications`;

      const myHeaders = new Headers();
      const apiToken = import.meta.env["VITE_API_TOKEN"] as string | undefined;
      if (apiToken) {
        myHeaders.append("Authorization", apiToken);
      }

      const formdata = new FormData();
      formdata.append("name", formData.name.trim());
      formdata.append("email", formData.email.trim());
      formdata.append("phone", formatFullPhoneNumber(formData.countryCode, formData.phone));
      formdata.append("job_role_id", formData.department.trim());
      formdata.append("cover_letter", formData.message.trim());
      if (cvFile) {
        formdata.append("cv", cvFile, cvFile.name);
      }

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
      console.log("Career application submitted successfully:", result);

      setSubmitted(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        countryCode: "+971",
        phone: "",
        department: "",
        message: "",
      });
      setCvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setErrors({});
      setTouched({});
      setFormError(null);
    } catch (error: unknown) {
      console.error("Career application error:", error);
      const message = error instanceof Error ? error.message : "Failed to submit application. Please check your connection and try again.";
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
      department: "",
      message: "",
    });
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setErrors({});
    setTouched({});
    setFormError(null);
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900/5 text-gold">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>

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
                      onClick={handleReset}
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
                    noValidate
                    className="space-y-8"
                  >
                    {/* Error Banner */}
                    {formError && (
                      <div className="flex items-start gap-3 rounded border border-red-200 bg-red-50/70 p-4 text-xs leading-relaxed text-red-700">
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                        <span>{formError}</span>
                      </div>
                    )}

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
                        Name <span className="text-red-500">*</span>
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
                          text-navy-900
                          outline-none
                          placeholder:text-grey-400
                          transition-colors
                          duration-300
                          ${
                            errors["name"] && touched["name"]
                              ? "border-red-500 focus:border-red-500"
                              : "border-grey-200 focus:border-gold"
                          }
                        `}
                      />
                      {errors["name"] && touched["name"] && (
                        <p className="mt-1.5 text-xs text-red-500">{errors["name"]}</p>
                      )}
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
                          Email <span className="text-red-500">*</span>
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
                            text-navy-900
                            outline-none
                            placeholder:text-grey-400
                            transition-colors
                            duration-300
                            ${
                              errors["email"] && touched["email"]
                                ? "border-red-500 focus:border-red-500"
                                : "border-grey-200 focus:border-gold"
                            }
                          `}
                        />
                        {errors["email"] && touched["email"] && (
                          <p className="mt-1.5 text-xs text-red-500">{errors["email"]}</p>
                        )}
                      </div>

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
                        theme="light"
                      />
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
                        Role / Department of Interest <span className="text-red-500">*</span>
                      </label>

                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoadingRoles && jobRoles.length === 0}
                        className={`
                          mt-3
                          h-12
                          w-full
                          border-b
                          bg-off-white
                          px-0
                          text-sm
                          text-navy-900
                          outline-none
                          transition-colors
                          duration-300
                          ${
                            errors["department"] && touched["department"]
                              ? "border-red-500 focus:border-red-500"
                              : "border-grey-200 focus:border-gold"
                          }
                        `}
                      >
                        <option
                          value=""
                          disabled
                          className="bg-off-white text-grey-500"
                        >
                          {isLoadingRoles && jobRoles.length === 0
                            ? "Loading roles..."
                            : "Select an area"}
                        </option>

                        {jobRoles.map((role) => {
                          const optionVal =
                            role.id !== undefined && role.id !== null
                              ? String(role.id)
                              : role.name;
                          return (
                            <option
                              key={optionVal}
                              value={optionVal}
                              className="bg-off-white text-navy-900"
                            >
                              {role.name}
                            </option>
                          );
                        })}
                      </select>
                      {errors["department"] && touched["department"] && (
                        <p className="mt-1.5 text-xs text-red-500">{errors["department"]}</p>
                      )}
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
                        CV / Resume <span className="text-red-500">*</span>
                      </label>

                      <div
                        className={`
                          mt-3
                          border
                          border-dashed
                          p-6
                          transition-colors
                          duration-300
                          ${
                            errors["cv"] && touched["cv"]
                              ? "border-red-500 bg-red-50/20"
                              : "border-grey-200 hover:border-grey-400"
                          }
                        `}
                      >
                        <input
                          ref={fileInputRef}
                          id="cv"
                          name="cv"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
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

                        {cvFile ? (
                          <div className="mt-3 flex items-center justify-between rounded bg-white p-2 text-xs text-navy-900 border border-grey-200">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="h-4 w-4 shrink-0 text-gold" />
                              <span className="truncate font-medium">{cvFile.name}</span>
                              <span className="shrink-0 text-grey-400">
                                ({(cvFile.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="ml-2 text-grey-400 hover:text-red-500 p-1"
                              title="Remove file"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <p className="mt-3 text-xs text-grey-400">
                            PDF, DOC or DOCX (Max 10MB)
                          </p>
                        )}
                      </div>
                      {errors["cv"] && touched["cv"] && (
                        <p className="mt-1.5 text-xs text-red-500">{errors["cv"]}</p>
                      )}
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
                        Short Cover Message <span className="text-red-500">*</span>
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        placeholder="Tell us briefly about yourself and what you could bring to the team."
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
                          text-navy-900
                          outline-none
                          placeholder:text-grey-400
                          transition-colors
                          duration-300
                          ${
                            errors["message"] && touched["message"]
                              ? "border-red-500 focus:border-red-500"
                              : "border-grey-200 focus:border-gold"
                          }
                        `}
                      />
                      {errors["message"] && touched["message"] && (
                        <p className="mt-1.5 text-xs text-red-500">{errors["message"]}</p>
                      )}
                    </div>

                    {/* SUBMIT */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
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
                          ${isSubmitting ? "cursor-not-allowed opacity-80" : ""}
                        `}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Submitting Application...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
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

      <SiteFooter />

    </main>
  );
}
