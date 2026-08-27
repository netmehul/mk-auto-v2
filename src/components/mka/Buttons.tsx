import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion-prefs";

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-[2px] px-8 py-4 font-display text-xs uppercase tracking-[0.16em] transition-colors duration-300";

export function PrimaryButton({
  children,
  href,
  onClick,
  type,
  target,
  rel,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  className?: string;
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      target={href ? target : undefined}
      rel={href ? rel : undefined}
      className={cn(base, "bg-navy-900 text-off-white hover:bg-navy-800", className)}
    >
      <span className="pointer-events-none absolute inset-0 border border-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </Tag>
  );
}

export function GhostButton({
  children,
  href,
  onClick,
  type,
  target,
  rel,
  tone = "light",
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      target={href ? target : undefined}
      rel={href ? rel : undefined}
      className={cn(
        base,
        "border",
        tone === "light"
          ? "border-off-white/50 text-off-white hover:border-gold hover:text-gold-soft"
          : "border-navy-900/30 text-navy-900 hover:border-gold hover:text-gold",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function MagneticButton({
  children,
  href,
  target,
  rel,
  className,
}: {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });

  function handleMove(e: MouseEvent) {
    if (prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(
        base,
        "border border-off-white/40 bg-off-white text-navy-900 hover:bg-off-white",
        className,
      )}
    >
      <span className="pointer-events-none absolute -inset-px border border-gold opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-100" />
      {children}
    </motion.a>
  );
}
