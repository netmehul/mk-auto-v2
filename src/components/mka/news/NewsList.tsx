import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import { RevealGroup, RevealItem } from "../Reveal";

const STORIES = [
    {
        image: news1,
        category: "Brand",
        date: "22 May 2026",
        title: "Dongfeng introduces a new generation of intelligent mobility",
        excerpt: "Advanced technology, refined design and connected features arrive across the latest Dongfeng range in the UAE.",
      },
      
      {
        image: news2,
        category: "Group",
        date: "14 April 2026",
        title: "MKA strengthens its nationwide showroom network",
        excerpt: "New retail locations bring MKA's automotive portfolio and customer experience closer to communities across the Emirates.",
      },
      
      {
        image: news3,
        category: "Aftersales",
        date: "30 March 2026",
        title: "MKA expands customer care and service capabilities",
        excerpt: "Enhanced workshop capacity and trained specialists support a faster, more convenient ownership experience.",
      },
      
      {
        image: news1,
        category: "Omoda",
        date: "18 February 2026",
        title: "Omoda brings bold design and smart technology to UAE roads",
        excerpt: "The latest Omoda models combine distinctive styling, intelligent features and everyday versatility for modern urban mobility.",
      },
      
      {
        image: news2,
        category: "Jaecoo",
        date: "6 February 2026",
        title: "Jaecoo continues its premium SUV journey in the UAE",
        excerpt: "A growing range of capable SUVs combines refined interiors, advanced technology and confident performance.",
      },
      
      {
        image: news3,
        category: "Customer Experience",
        date: "21 January 2026",
        title: "Inside the MKA approach to a better ownership experience",
        excerpt: "From vehicle selection to servicing and genuine parts, every stage is designed around long-term customer confidence.",
      },
      
      {
        image: news1,
        category: "Aftersales",
        date: "8 January 2026",
        title: "Genuine parts programme expands across MKA service centres",
        excerpt: "Improved parts availability helps keep vehicles performing at their best with manufacturer-approved components.",
      },
      
      {
        image: news2,
        category: "Group",
        date: "19 December 2025",
        title: "MKA marks another year of growth across the UAE",
        excerpt: "Expanding operations, stronger customer support and a growing brand portfolio shape another milestone year for the group.",
      },
      
      {
        image: news3,
        category: "Mobility",
        date: "3 December 2025",
        title: "Technology takes centre stage across the latest MKA models",
        excerpt: "Connected features, intelligent driving systems and modern cabin technology redefine the everyday automotive experience.",
      },
      
      {
        image: news1,
        category: "Community",
        date: "17 November 2025",
        title: "MKA continues its commitment to the UAE automotive community",
        excerpt: "The group continues building stronger connections with customers, partners and communities throughout the Emirates.",
      },
];

export function NewsList() {
  return (
    <section id="news" aria-labelledby="news-title" className="section-y bg-off-white">
      <div className="shell">
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
