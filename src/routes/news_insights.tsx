import { SiteFooter } from '@/components/mka/SiteFooter';
import { SiteHeader } from '@/components/mka/SiteHeader';
import { createFileRoute } from '@tanstack/react-router'
import { NewsHeaderBand } from '@/components/mka/news/NewsHeaderBand';
import { NewsList } from '@/components/mka/news/NewsList';
import ogImage from "@/assets/OG-image.png";

const title = "News & Insights | Mahy Khoory Automotive Group, UAE";

const description =
  "MAHY Khooray Automotive is a UAE automotive group distributing Dongfeng, Omoda and Jaecoo. Read our mission, strengths, scale and showroom network across the Emirates.";

export const Route = createFileRoute('/news_insights')({
  component: NewsInsights,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: "/news_insights" }],
  }),
})

function NewsInsights() {
  return (
    <section>
        <SiteHeader />
        <main>
            <NewsHeaderBand />
            <NewsList />
        </main>
        <SiteFooter />
  </section>
  )

}
