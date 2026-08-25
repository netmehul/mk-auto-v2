import logoAsset from "@/assets/logo.svg.asset.json";
import { RevealGroup, RevealItem } from "./Reveal";

const COLUMNS = [
  {
    title: "Company",
    links: ["About", "News & Insights", "Careers", "Contact"],
  },
  {
    title: "Brands",
    links: ["Dongfeng", "Omoda", "Jaecoo"],
  },
  {
    title: "Support",
    links: ["Service Booking", "Genuine Parts", "Warranty"],
  },
];

function SocialIcon({ label, d }: { label: string; d: string }) {
  return (
    <a
      href="#news"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border border-off-white/15 text-off-white/70 transition-colors hover:border-gold hover:text-gold-soft"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d={d} />
      </svg>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 pb-8 pt-20 lg:pt-28">
      <div className="shell">
        <RevealGroup className="grid gap-12 lg:grid-cols-12">
          <RevealItem className="lg:col-span-4">
            <img src={logoAsset.url} alt="Mahy Khoory Automotive" className="h-11 w-auto" />
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-off-white/60">
              Mahy Khoory Automotive LLC
              <br />
              Sheikh Zayed Road, Dubai, United Arab Emirates
            </p>
            <p className="mt-4 text-sm text-off-white/60">
              <a href="tel:+97140000000" className="hover:text-gold-soft">
                +971 4 000 0000
              </a>
              {" · "}
              <a href="mailto:info@mka.ae" className="hover:text-gold-soft">
                info@mka.ae
              </a>
            </p>
          </RevealItem>

          {COLUMNS.map((col) => (
            <RevealItem key={col.title} className="lg:col-span-2">
              <h3 className="eyebrow text-off-white/50">{col.title}</h3>
              <ul className="mt-6 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#news" className="text-sm text-off-white/75 transition-colors hover:text-gold-soft">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}

          <RevealItem className="lg:col-span-2">
            <h3 className="eyebrow text-off-white/50">Follow</h3>
            <div className="mt-6 flex gap-3">
              <SocialIcon label="LinkedIn" d="M4 9v11M4 4.5v.01M10 20V13a3 3 0 016 0v7M10 20v-7" />
              <SocialIcon label="Instagram" d="M3 8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5V8zm9 0a4 4 0 100 8 4 4 0 000-8zm5.5-1.5v.01" />
              <SocialIcon label="YouTube" d="M2.5 8.5A3 3 0 015.5 5.5h13a3 3 0 013 3v7a3 3 0 01-3 3h-13a3 3 0 01-3-3v-7zM10 9.5l5 2.5-5 2.5v-5z" />
            </div>
          </RevealItem>
        </RevealGroup>

        <div className="mt-16 border-t border-off-white/12 pt-6">
          <div className="flex flex-col gap-3 text-xs text-off-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Mahy Khoory Automotive. All rights reserved.</p>
            <p className="flex gap-6">
              <a href="#news" className="hover:text-gold-soft">
                Privacy Policy
              </a>
              <a href="#news" className="hover:text-gold-soft">
                Terms of Use
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
