import { RevealGroup, RevealItem } from "../Reveal";

type Tile = { title: string; copy: string; path: string };

const TILES: Tile[] = [
  {
    title: "Sales Excellence",
    copy: "Showroom teams trained on each marque, with a single handover standard across the network.",
    path: "M3 17l4-8 5 3 4-6 5 5M3 21h18",
  },
  {
    title: "After Sales & Service",
    copy: "Workshops staffed by certified technicians, with capacity planned around real service demand.",
    path: "M14.5 5.5a4 4 0 01-5.3 5.3L4 16v4h4l5.2-5.2a4 4 0 015.3-5.3l-2.8 2.8-2.4-2.4 2.8-2.8z",
  },
  {
    title: "Genuine Parts",
    copy: "Central parts holding in Dubai, distributed daily to every workshop we operate.",
    path: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v18M4 7.5l8 4.5 8-4.5",
  },
  {
    title: "Customer Experience",
    copy: "One record of ownership per customer, from first enquiry through warranty and resale.",
    path: "M12 20s-7-4.3-7-9a4 4 0 017-2.6A4 4 0 0119 11c0 4.7-7 9-7 9z",
  },
];

export function Excellence() {
  return (
    <section aria-labelledby="excel-title" className="section-y bg-off-white text-ink">
      <div className="shell">
        <RevealGroup className="max-w-3xl">
          <RevealItem>
            <h2 id="excel-title" className="h2-display mt-7 uppercase text-navy-900">
              Four disciplines the group is built around.
            </h2>
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-ink/65">
            Each one is run in house, so accountability sits with MKA rather than a third party.
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {TILES.map((tile) => (
            <RevealItem key={tile.title}>
              <div className="group h-full border border-grey-200 bg-white/60 p-8 transition-colors duration-300 hover:border-gold">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-navy-900 transition-colors duration-300 group-hover:text-gold"
                >
                  <path d={tile.path} />
                </svg>
                <h3 className="mt-8 font-display text-lg text-navy-900">{tile.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{tile.copy}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
