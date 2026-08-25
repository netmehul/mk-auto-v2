import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import { Eyebrow, RevealGroup, RevealItem } from "./Reveal";

const STORIES = [
  {
    image: news1,
    category: "Brand",
    date: "12 August 2026",
    title: "Jaecoo expands its UAE line-up with a new flagship SUV",
    excerpt: "The latest addition arrives in MKA showrooms nationwide with a full aftersales programme.",
  },
  {
    image: news2,
    category: "Aftersales",
    date: "28 July 2026",
    title: "New service and parts facility opens in Dubai Industrial City",
    excerpt: "Additional bays and a dedicated parts hub cut turnaround times for customers across the Emirates.",
  },
  {
    image: news3,
    category: "Group",
    date: "9 June 2026",
    title: "MKA signs long-term distribution agreement for the UAE market",
    excerpt: "A multi-year commitment strengthening the group's position in the national automotive sector.",
  },
];

export function News() {
  return (
    <section id="news" aria-labelledby="news-title" className="section-y bg-off-white">
      <div className="shell">
        <RevealGroup className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>News &amp; Insights</Eyebrow>
            <RevealItem>
              <h2 id="news-title" className="h2-display mt-7 max-w-[20ch] text-navy-900">
                The latest from the group.
              </h2>
            </RevealItem>
          </div>
          <RevealItem>
            <a
              href="#news"
              className="group inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.16em] text-navy-900"
            >
              View all news
              <span className="block h-px w-8 bg-gold transition-all duration-300 group-hover:w-14" />
            </a>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3">
          {STORIES.map((story) => (
            <RevealItem key={story.title}>
              <a href="#news" className="group block">
                <div className="overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <span className="eyebrow text-gold">{story.category}</span>
                  <span className="h-px w-6 bg-grey-200" />
                  <span className="text-xs text-grey-500">{story.date}</span>
                </div>
                <h3 className="mt-4 text-xl leading-snug text-navy-900">{story.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-grey-500">{story.excerpt}</p>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
