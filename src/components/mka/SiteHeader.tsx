import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "About Us", href: "/about" },
  { label: "News & Insights", href: "/news_insights" },
  { label: "Careers", href: "#careers" },
];

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const heroHeight = useRef(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => {
      heroHeight.current = window.innerHeight * 0.85;
      setSolid(window.scrollY > heroHeight.current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid ? "bg-navy-900/95 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-left bg-gold"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <div className="shell flex items-center justify-between py-5">
        <a href="/" aria-label="MKA — Mahy Khoory Automotive home">
          <img src={logo} alt="Mahy Khoory Automotive" className="h-12 w-auto lg:h-16" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative font-display text-[13px] uppercase tracking-[0.14em] text-off-white/85 transition-colors hover:text-off-white"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#careers"
            className="border border-off-white/40 px-5 py-2.5 font-display text-[12px] uppercase tracking-[0.16em] text-off-white transition-colors hover:border-gold hover:text-gold-soft"
          >
            Get In Touch
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={cn("block h-px w-6 bg-off-white transition-transform", open && "translate-y-[3px] rotate-45")} />
          <span className={cn("block h-px w-6 bg-off-white transition-transform", open && "-translate-y-[3px] -rotate-45")} />
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-off-white/10 bg-navy-900 lg:hidden">
          <ul className="shell flex flex-col py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-off-white/10 py-4 font-display text-sm uppercase tracking-[0.14em] text-off-white/85"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
