import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/mka/SiteHeader";
import { Hero } from "@/components/mka/Hero";
import { WhoWeAre } from "@/components/mka/WhoWeAre";
import { Brands } from "@/components/mka/Brands";
import { AtAGlance } from "@/components/mka/AtAGlance";
import { CareersSection } from "@/components/mka/Careers";
import { News } from "@/components/mka/News";
import { SiteFooter } from "@/components/mka/SiteFooter";
import { SiteLoader } from "@/components/mka/SiteLoader";
import { SmoothScroll } from "@/components/SmoothScroll";
import ogImage from "@/assets/OG-image.png";

const title = "MAHY Khoory Automotive";

const description =
  "MAHY Khoory Automotive is the official UAE distributor for Dongfeng, Omoda and Jaecoo — showrooms, service and genuine parts across the Emirates.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MAHY Khoory Automotive",
          alternateName: "MAHY Khooray Automotive",
          description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
          brand: ["Dongfeng", "Omoda", "Jaecoo"],
        }),
      },
    ],
  }),
});

function Home() {
  return (
    <>
    <SiteLoader />
    <SmoothScroll>

      <SiteHeader />

        <main>
          <Hero />
          <WhoWeAre />
          <Brands />
          <AtAGlance />
          <CareersSection />
          <News />
        </main>
        <SiteFooter />

    </SmoothScroll>

    </>
  );
}
