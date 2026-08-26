import { SiteFooter } from '@/components/mka/SiteFooter';
import { SiteHeader } from '@/components/mka/SiteHeader';
import { createFileRoute } from '@tanstack/react-router'
import { NewsHeaderBand } from '@/components/mka/news/NewsHeaderBand';
import { NewsList } from '@/components/mka/news/NewsList';

const title = "News & Insights | Mahy Khoory Automotive Group, UAE";

const description =
  "MAHY Khooray Automotive is a UAE automotive group distributing Dongfeng, Omoda and Jaecoo. Read our mission, strengths, scale and showroom network across the Emirates.";

export const Route = createFileRoute('/news_insights')({
  component: NewsInsights,
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
