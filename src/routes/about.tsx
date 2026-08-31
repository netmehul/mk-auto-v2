import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/mka/SiteFooter";
import { SiteHeader } from "@/components/mka/SiteHeader";
import { AboutHeaderBand } from "@/components/mka/about/AboutHeaderBand";
import { MissionVision } from "@/components/mka/about/MissionVission";
import { Excellence } from "@/components/mka/about/Excellence";
import { AboutGlance } from "@/components/mka/about/AboutGlance";
import { HeadOffice } from "@/components/mka/about/HeadOffice";
import { BrandLocations } from "@/components/mka/about/BrandLocations";
import { CareersSection } from "@/components/mka/Careers";
import { AboutCareersSection } from "@/components/mka/about/AboutCareer";
import ogImage from "@/assets/OG-image.png";

const title = "About MAHY Khooray Automotive | Mahy Khoory Automotive Group, UAE";

const description =
  "MAHY Khooray Automotive is a UAE automotive group distributing Dongfeng, Omoda and Jaecoo. Read our mission, strengths, scale and showroom network across the Emirates.";

export const Route = createFileRoute("/about")({
  component: About,

  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      { name: "twitter:image", content: ogImage },
    ],

    links: [
      {
        rel: "canonical",
        href: "/about",
      },
    ],
  }),
});

function About() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* About page content */}
        <AboutHeaderBand />
        <MissionVision />
        <Excellence />
        <AboutGlance />
        <BrandLocations />
        <HeadOffice />
        <AboutCareersSection />

      </main>

      <SiteFooter />
    </>
  );
}